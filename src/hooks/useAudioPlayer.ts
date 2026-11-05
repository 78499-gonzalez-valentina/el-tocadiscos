"use client";

import { useCallback, useRef } from "react";
import type { Vinilo } from "@/data/vinilos";

const NEEDLE_DROP_SRC = "/audio/needle-drop.wav";
const CRACKLE_SRC = "/audio/crackle.wav";

const TRACK_FADE_IN = 0.4;
const CRACKLE_TARGET_GAIN = 0.12;
const TRACK_TARGET_GAIN = 0.85;

export function useAudioPlayer() {
  const ctxRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<Map<string, AudioBuffer>>(new Map());
  const loadingRef = useRef<Map<string, Promise<AudioBuffer>>>(new Map());

  const trackSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const trackGainRef = useRef<GainNode | null>(null);
  const crackleSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const crackleGainRef = useRef<GainNode | null>(null);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    if (ctxRef.current.state === "suspended") {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const loadBuffer = useCallback(
    async (src: string) => {
      const cached = buffersRef.current.get(src);
      if (cached) return cached;

      const pending = loadingRef.current.get(src);
      if (pending) return pending;

      const ctx = getContext();
      const promise = fetch(src)
        .then((res) => res.arrayBuffer())
        .then((data) => ctx.decodeAudioData(data))
        .then((buffer) => {
          buffersRef.current.set(src, buffer);
          loadingRef.current.delete(src);
          return buffer;
        });

      loadingRef.current.set(src, promise);
      return promise;
    },
    [getContext]
  );

  const preload = useCallback(
    (vinilo: Vinilo) => {
      void loadBuffer(vinilo.audioSrc);
      void loadBuffer(CRACKLE_SRC);
      void loadBuffer(NEEDLE_DROP_SRC);
    },
    [loadBuffer]
  );

  const playNeedleDrop = useCallback(async () => {
    const ctx = getContext();
    const buffer = await loadBuffer(NEEDLE_DROP_SRC);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = 0.7;
    source.connect(gain).connect(ctx.destination);
    source.start();
  }, [getContext, loadBuffer]);

  const stopAll = useCallback(
    (fadeOutSec = 0.35) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      const now = ctx.currentTime;

      [trackGainRef.current, crackleGainRef.current].forEach((gainNode) => {
        if (!gainNode) return;
        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0, now + fadeOutSec);
      });

      const track = trackSourceRef.current;
      const crackle = crackleSourceRef.current;
      trackSourceRef.current = null;
      crackleSourceRef.current = null;
      trackGainRef.current = null;
      crackleGainRef.current = null;

      if (track) {
        try {
          track.stop(now + fadeOutSec + 0.05);
        } catch {
          /* already stopped */
        }
      }
      if (crackle) {
        try {
          crackle.stop(now + fadeOutSec + 0.05);
        } catch {
          /* already stopped */
        }
      }
    },
    []
  );

  const playTrack = useCallback(
    async (vinilo: Vinilo) => {
      const ctx = getContext();
      const [trackBuffer, crackleBuffer] = await Promise.all([
        loadBuffer(vinilo.audioSrc),
        loadBuffer(CRACKLE_SRC),
      ]);

      stopAll(0.15);

      const now = ctx.currentTime + 0.02;

      const trackGain = ctx.createGain();
      trackGain.gain.setValueAtTime(0, now);
      trackGain.gain.linearRampToValueAtTime(TRACK_TARGET_GAIN, now + TRACK_FADE_IN);
      const trackSource = ctx.createBufferSource();
      trackSource.buffer = trackBuffer;
      trackSource.loop = true;
      trackSource.connect(trackGain).connect(ctx.destination);
      trackSource.start(now);

      const crackleGain = ctx.createGain();
      crackleGain.gain.setValueAtTime(0, now);
      crackleGain.gain.linearRampToValueAtTime(
        CRACKLE_TARGET_GAIN,
        now + TRACK_FADE_IN
      );
      const crackleSource = ctx.createBufferSource();
      crackleSource.buffer = crackleBuffer;
      crackleSource.loop = true;
      crackleSource.connect(crackleGain).connect(ctx.destination);
      crackleSource.start(now);

      trackSourceRef.current = trackSource;
      trackGainRef.current = trackGain;
      crackleSourceRef.current = crackleSource;
      crackleGainRef.current = crackleGain;
    },
    [getContext, loadBuffer, stopAll]
  );

  return { preload, playNeedleDrop, playTrack, stopAll };
}
