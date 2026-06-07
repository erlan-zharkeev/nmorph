const writeAscii = (view: DataView, offset: number, value: string) => {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
};

export const createSoftPingAudioSrc = (durationMs = 350) => {
  const sampleRate = 8000;
  const sampleCount = Math.floor(sampleRate * (durationMs / 1000));
  const bytes = new Uint8Array(44 + sampleCount);
  const view = new DataView(bytes.buffer);

  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + sampleCount, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate, true);
  view.setUint16(32, 1, true);
  view.setUint16(34, 8, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, sampleCount, true);

  for (let index = 0; index < sampleCount; index += 1) {
    const progress = index / sampleCount;
    const seconds = index / sampleRate;
    const envelope = Math.sin(Math.PI * progress);
    const frequency = progress < 0.55 ? 660 : 880;
    const sample = Math.sin(2 * Math.PI * frequency * seconds) * envelope;

    bytes[44 + index] = 128 + Math.round(sample * 72);
  }

  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");

  return `data:audio/wav;base64,${btoa(binary)}`;
};
