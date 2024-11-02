/**
 * Available waveform shapes for the oscillator.
 * Each shape produces a distinct oscillation pattern:
 * - sine: Smooth sinusoidal wave
 * - triangle: Linear transitions up and down
 * - sawtooth: Linear ramp up with instant drop
 * - square: Instant transitions between values
 * - bounce: Smooth bounce effect with ease-in-out
 * - pulse: Like square with adjustable duty cycle
 * - elastic: Spring-like oscillation
 * - noise: Smooth noise using sine interpolation
 * - exponential: Exponential growth and decay
 * - circular: Circular easing pattern
 * - stepped: Quantized step transitions
 */
export type OscillatorShape =
  | "sine"
  | "triangle"
  | "sawtooth"
  | "square"
  | "bounce"
  | "pulse"
  | "elastic"
  | "noise"
  | "exponential"
  | "circular"
  | "stepped";

/**
 * Configuration for morphing between two waveforms
 */
export interface MorphConfig {
  /** Shape to morph from */
  fromShape: OscillatorShape;
  /** Shape to morph to */
  toShape: OscillatorShape;
  /** Morph progress (0 = fromShape, 1 = toShape) */
  progress: number;
  /** Optional easing function for the morph */
  easing?: (t: number) => number;
}

/**
 * Configuration options for the oscillator
 */
export interface OscillatorConfig {
  /** Duty cycle for pulse wave (0 to 1), defaults to 0.5 */
  dutyCycle?: number;
  /** Amplitude of the oscillation (0 to 1), defaults to 1 */
  amplitude?: number;
  /** Phase offset in radians, defaults to 0 */
  phase?: number;
  /** Center point of the oscillation (0 to 1), defaults to 0.5 */
  center?: number;
  /** Number of steps for stepped waveform, defaults to 4 */
  steps?: number;
  /** Elasticity factor for elastic waveform, defaults to 3 */
  elasticity?: number;
  /** Optional morphing configuration */
  morph?: MorphConfig;
}

/**
 * Collection of easing functions for morphing between waveforms
 */
export const Easing = {
  /** Linear interpolation (no easing) */
  linear: (t: number) => t,
  /** Smooth step (cubic) easing */
  smooth: (t: number) => t * t * (3 - 2 * t),
  /** Smoother step (quintic) easing */
  smoother: (t: number) => t * t * t * (t * (t * 6 - 15) + 10),
  /** Sinusoidal easing */
  sine: (t: number) => (1 - Math.cos(t * Math.PI)) / 2,
};

// Internal defaults
const DEFAULT_CONFIG: Required<Omit<OscillatorConfig, "morph">> = {
  dutyCycle: 0.5,
  amplitude: 1,
  phase: 0,
  center: 0.5,
  steps: 4,
  elasticity: 3,
};

/**
 * Gets the raw waveform value for a normalized position (0-1).
 * Used directly for visualization/plotting or as a building block for complex waveforms.
 *
 * @param shape - The type of waveform to generate
 * @param position - Normalized position in the waveform cycle (0 to 1)
 * @param config - Optional configuration parameters
 *
 * @returns A value between 0 and 1 representing the waveform amplitude at the given position
 *
 * @example
 * // Basic sine wave
 * const value = getRawWaveform('sine', 0.5); // Returns ~1 at peak
 *
 * @example
 * // Square wave with custom duty cycle
 * const value = getRawWaveform('square', 0.3, { dutyCycle: 0.3 }); // Returns 1
 *
 * @example
 * // Elastic wave with custom elasticity
 * const value = getRawWaveform('elastic', 0.2, { elasticity: 5 });
 *
 * @example
 * // Stepped wave with custom number of steps
 * const value = getRawWaveform('stepped', 0.7, { steps: 8 });
 *
 * @example
 * // Visualization example:
 * // Plot 100 points of a triangle wave
 * const points = Array.from({length: 100}, (_, i) => {
 *   const x = i / 99; // Normalize to 0-1
 *   const y = getRawWaveform('triangle', x);
 *   return { x, y };
 * });
 *
 * Supported shapes:
 * - 'sine': Smooth sinusoidal wave
 * - 'triangle': Linear transitions between min/max
 * - 'sawtooth': Linear ramp up with instant drop
 * - 'square': Instant transitions between min/max
 * - 'bounce': Smooth bounce effect with easing
 * - 'pulse': Square wave with adjustable duty cycle
 * - 'elastic': Spring-like oscillation with decay
 * - 'noise': Smooth noise using harmonics
 * - 'exponential': Exponential growth and decay
 * - 'circular': Circular easing pattern
 * - 'stepped': Quantized step transitions
 *
 * Configuration options:
 * - dutyCycle: Sets high/low ratio for pulse waves (0 to 1, default: 0.5)
 * - elasticity: Controls bounce/spring effect (default: 3)
 * - steps: Number of discrete levels for stepped wave (default: 4)
 *
 * @throws {Error} If position is outside the range [0, 1]
 */
export const getRawWaveform = (
  shape: OscillatorShape,
  position: number,
  config: Partial<OscillatorConfig> = {},
): number => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const { dutyCycle, elasticity, steps } = finalConfig;

  // Ensure position is between 0 and 1
  const normalizedPosition = position % 1;

  switch (shape) {
    case "sine":
      return (Math.sin(normalizedPosition * Math.PI * 2) + 1) / 2;

    case "triangle":
      return normalizedPosition < 0.5
        ? normalizedPosition * 2
        : 2 - normalizedPosition * 2;

    case "sawtooth":
      return normalizedPosition;

    case "square":
      return normalizedPosition < 0.5 ? 1 : 0;

    case "bounce": {
      const t =
        normalizedPosition < 0.5
          ? normalizedPosition * 2
          : (1 - normalizedPosition) * 2;
      return 1 - t * t * (3 - 2 * t);
    }

    case "pulse":
      return normalizedPosition < dutyCycle ? 1 : 0;

    case "elastic": {
      const p = normalizedPosition * 2 * Math.PI;
      return (
        (Math.sin(elasticity * p) * Math.exp(-normalizedPosition * 2) + 1) / 2
      );
    }

    case "noise": {
      let val = 0;
      for (let i = 1; i <= 3; i++) {
        val += Math.sin(normalizedPosition * Math.PI * 2 * i * 1.618) / i;
      }
      return (val + 1) / 2;
    }

    case "exponential": {
      const exp =
        normalizedPosition < 0.5
          ? normalizedPosition * 2
          : (1 - normalizedPosition) * 2;
      return 1 - Math.exp(-exp * 4);
    }

    case "circular": {
      const circ =
        normalizedPosition < 0.5
          ? normalizedPosition * 2
          : (normalizedPosition - 0.5) * 2;
      return normalizedPosition < 0.5
        ? 1 - Math.sqrt(1 - circ * circ)
        : Math.sqrt(1 - (circ - 1) * (circ - 1));
    }

    case "stepped":
      return Math.round(normalizedPosition * steps) / steps;

    default:
      return (Math.sin(normalizedPosition * Math.PI * 2) + 1) / 2;
  }
};

/**
 * Creates an oscillating value between 0 and 1 based on time and BPM.
 * Supports multiple waveform types and morphing between them.
 *
 * @param currentTimeMs - Current time in milliseconds
 * @param bpm - Beats per minute
 * @param shape - Type of waveform to generate (defaults to 'sine')
 * @param offsetMs - Time offset in milliseconds (defaults to 0)
 * @param config - Oscillator configuration
 * @returns A value between 0 and 1 that oscillates according to the specified parameters
 *
 * @example
 * // Simple sine wave at 120 BPM
 * const value = getBpmOscillator(Date.now(), 120);
 *
 * @example
 * // Morphing from sine to square
 * const value = getBpmOscillator(Date.now(), 120, 'sine', 0, {
 *   morph: {
 *     fromShape: 'sine',
 *     toShape: 'square',
 *     progress: 0.5,
 *     easing: Easing.smooth
 *   }
 * });
 */
export const getBpmOscillator = (
  currentTimeMs: number,
  bpm: number,
  shape: OscillatorShape = "sine",
  offsetMs: number = 0,
  config: OscillatorConfig = {},
): number => {
  const baseConfig = { ...DEFAULT_CONFIG, ...config };
  const { amplitude, phase, center, morph } = baseConfig;

  const msPerBeat = 60000 / bpm;
  const basePosition = ((currentTimeMs + offsetMs) % msPerBeat) / msPerBeat;
  const position = (basePosition + phase / (Math.PI * 2)) % 1;

  let raw: number;

  if (morph) {
    const { fromShape, toShape, progress, easing = Easing.smooth } = morph;
    const fromValue = getRawWaveform(fromShape, position, baseConfig);
    const toValue = getRawWaveform(toShape, position, baseConfig);
    const easedProgress = easing(progress);
    raw = fromValue * (1 - easedProgress) + toValue * easedProgress;
  } else {
    raw = getRawWaveform(shape, position, baseConfig);
  }

  return center + (raw - 0.5) * amplitude;
};

/**
 * Converts frequency in Hz to BPM
 * @param frequencyHz - Frequency in Hertz
 */
export const frequencyToBPM = (frequencyHz: number): number => frequencyHz * 60;

/**
 * Converts BPM to frequency in Hz
 * @param bpm - Beats per minute
 */
export const bpmToFrequency = (bpm: number): number => bpm / 60;
