declare module '@logue/sf2synth' {
  export class Parser {
    constructor(data: Uint8Array);
    parse(): void;
    sampleHeader: Array<{
      sampleName: string;
      sampleRate: number;
      start: number;
      end: number;
      startLoop: number;
      endLoop: number;
      sampleType: number;
      originalPitch: number;
      pitchCorrection: number;
      sampleLink: number;
      sampleType: number;
    }>;
    sample: Array<Int16Array>;
    info: {
      ifil: { major: number; minor: number };
      isng: string;
      INAM: string;
      irom?: string;
      iver?: { major: number; minor: number };
      ICRD?: string;
      IENG?: string;
      IPRD?: string;
      ICOP?: string;
      ICMT?: string;
      ISFT?: string;
    };
    presetHeader: Array<{
      presetName: string;
      preset: number;
      bank: number;
      presetBagIndex: number;
      library: number;
      genre: number;
      morphology: number;
    }>;
    presetZone: Array<{
      generatorIndex: number;
      modulatorIndex: number;
    }>;
    presetGenerator: Array<{
      generatorType: number;
      generatorAmount: number;
    }>;
    instrument: Array<{
      instrumentName: string;
      instrumentBagIndex: number;
    }>;
    instrumentZone: Array<{
      generatorIndex: number;
      modulatorIndex: number;
    }>;
    instrumentGenerator: Array<{
      generatorType: number;
      generatorAmount: number;
    }>;
  }

  export class Synth {
    constructor(sampleRate?: number, polyphony?: number);
    loadSF2(sf2: Parser): void;
    noteOn(channel: number, key: number, velocity: number): void;
    noteOff(channel: number, key: number): void;
    render(outL: Float32Array, outR: Float32Array): void;
    setProgram(channel: number, program: number): void;
    setBankProgram(channel: number, bank: number, program: number): void;
    setDrumMode(channel: number, isDrum: boolean): void;
    allSoundOff(): void;
    resetAllControllers(): void;
    setModulationDepth(channel: number, depth: number): void;
    setPitchBend(channel: number, value: number): void;
    setVolume(channel: number, volume: number): void;
    setPan(channel: number, pan: number): void;
    setExpression(channel: number, expression: number): void;
    setReverb(channel: number, reverb: number): void;
    setChorus(channel: number, chorus: number): void;
  }
}
