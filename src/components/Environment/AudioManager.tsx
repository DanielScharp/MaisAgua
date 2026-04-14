import { useEffect, useRef } from 'react';
import { useProgress } from '../../hooks/useProgress';

export const AudioManager = () => {
  const { progress } = useProgress();
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainsRef = useRef<{ wind: GainNode; water: GainNode; birds: GainNode } | null>(null);

  useEffect(() => {
    // Audio context requires user interaction to start
    const handleInteraction = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        setupAudioNodes();
      } else if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, []);

  const setupAudioNodes = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    // Wind (White noise filtered)
    const windGain = ctx.createGain();
    windGain.gain.value = 0.1;
    windGain.connect(ctx.destination);

    // Filtered noise for wind
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    noiseSource.connect(filter);
    filter.connect(windGain);
    noiseSource.start();

    // Placeholder for water and birds (simple oscillators)
    const waterGain = ctx.createGain();
    waterGain.gain.value = 0;
    waterGain.connect(ctx.destination);

    const birdsGain = ctx.createGain();
    birdsGain.gain.value = 0;
    birdsGain.connect(ctx.destination);

    gainsRef.current = { wind: windGain, water: waterGain, birds: birdsGain };
  };

  useEffect(() => {
    if (!gainsRef.current) return;
    const { wind, water, birds } = gainsRef.current;

    // Crossfade based on progress
    // Zone 1: Wind
    // Zone 2: Water
    // Zone 3: Birds
    wind.gain.setTargetAtTime(Math.max(0, 0.2 * (1 - progress)), 0, 0.1);
    water.gain.setTargetAtTime(progress > 0.33 ? Math.min(0.1, (progress - 0.33) * 0.5) : 0, 0, 0.1);
    birds.gain.setTargetAtTime(progress > 0.66 ? Math.min(0.1, (progress - 0.66) * 0.5) : 0, 0, 0.1);
  }, [progress]);

  return null;
};
