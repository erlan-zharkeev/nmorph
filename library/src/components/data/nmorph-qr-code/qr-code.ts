export type NmorphQRCodeErrorCorrectionLevel = 'low' | 'medium' | 'quartile' | 'high';

export interface INmorphQRCodeOptions {
  errorCorrectionLevel?: NmorphQRCodeErrorCorrectionLevel;
  minVersion?: number;
  maxVersion?: number;
}

export interface INmorphQRCodeData {
  modules: boolean[][];
  size: number;
  version: number;
}

const ECC_CODEWORDS_PER_BLOCK: Record<NmorphQRCodeErrorCorrectionLevel, number[]> = {
  low: [
    -1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30,
    30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
  ],
  medium: [
    -1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28,
    28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
  ],
  quartile: [
    -1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30,
    30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
  ],
  high: [
    -1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30,
    30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
  ],
};

const NUM_ERROR_CORRECTION_BLOCKS: Record<NmorphQRCodeErrorCorrectionLevel, number[]> = {
  low: [
    -1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19,
    19, 20, 21, 22, 24, 25,
  ],
  medium: [
    -1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31,
    33, 35, 37, 38, 40, 43, 45, 47, 49,
  ],
  quartile: [
    -1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43,
    45, 48, 51, 53, 56, 59, 62, 65, 68,
  ],
  high: [
    -1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48,
    51, 54, 57, 60, 63, 66, 70, 74, 77, 81,
  ],
};

const FORMAT_BITS: Record<NmorphQRCodeErrorCorrectionLevel, number> = {
  low: 1,
  medium: 0,
  quartile: 3,
  high: 2,
};

const clampVersion = (version: number) => Math.min(Math.max(Math.trunc(version), 1), 40);
const getBit = (value: number, index: number) => ((value >>> index) & 1) !== 0;
const appendBits = (buffer: boolean[], value: number, length: number) => {
  for (let index = length - 1; index >= 0; index--) buffer.push(getBit(value, index));
};

const getNumRawDataModules = (version: number) => {
  let result = (16 * version + 128) * version + 64;
  if (version >= 2) {
    const numAlign = Math.floor(version / 7) + 2;
    result -= (25 * numAlign - 10) * numAlign - 55;
    if (version >= 7) result -= 36;
  }
  return result;
};

const getNumDataCodewords = (version: number, level: NmorphQRCodeErrorCorrectionLevel) =>
  Math.floor(getNumRawDataModules(version) / 8) -
  ECC_CODEWORDS_PER_BLOCK[level][version] * NUM_ERROR_CORRECTION_BLOCKS[level][version];

const getByteCountBits = (version: number) => (version <= 9 ? 8 : 16);

const getRequiredBits = (byteLength: number, version: number) => 4 + getByteCountBits(version) + byteLength * 8;

const getAlignmentPatternPositions = (version: number) => {
  if (version === 1) return [];
  const size = version * 4 + 17;
  const numAlign = Math.floor(version / 7) + 2;
  const step = version === 32 ? 26 : Math.ceil((version * 4 + 4) / (numAlign * 2 - 2)) * 2;
  const result = [6];
  for (let position = size - 7; result.length < numAlign; position -= step) result.splice(1, 0, position);
  return result;
};

const reedSolomonMultiply = (x: number, y: number) => {
  let z = 0;
  for (let index = 7; index >= 0; index--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d);
    z ^= ((y >>> index) & 1) * x;
  }
  return z;
};

const reedSolomonComputeDivisor = (degree: number) => {
  const result = Array<number>(degree).fill(0);
  result[degree - 1] = 1;
  let root = 1;
  for (let index = 0; index < degree; index++) {
    for (let degreeIndex = 0; degreeIndex < degree; degreeIndex++) {
      result[degreeIndex] = reedSolomonMultiply(result[degreeIndex], root);
      if (degreeIndex + 1 < degree) result[degreeIndex] ^= result[degreeIndex + 1];
    }
    root = reedSolomonMultiply(root, 0x02);
  }
  return result;
};

const reedSolomonComputeRemainder = (data: number[], divisor: number[]) => {
  const result = Array<number>(divisor.length).fill(0);
  data.forEach((value) => {
    const factor = value ^ (result.shift() || 0);
    result.push(0);
    divisor.forEach((coefficient, index) => {
      result[index] ^= reedSolomonMultiply(coefficient, factor);
    });
  });
  return result;
};

const addEccAndInterleave = (data: number[], version: number, level: NmorphQRCodeErrorCorrectionLevel) => {
  const numBlocks = NUM_ERROR_CORRECTION_BLOCKS[level][version];
  const blockEccLength = ECC_CODEWORDS_PER_BLOCK[level][version];
  const rawCodewords = Math.floor(getNumRawDataModules(version) / 8);
  const numShortBlocks = numBlocks - (rawCodewords % numBlocks);
  const shortBlockLength = Math.floor(rawCodewords / numBlocks);
  const rsDivisor = reedSolomonComputeDivisor(blockEccLength);
  const blocks: number[][] = [];
  let offset = 0;

  for (let index = 0; index < numBlocks; index++) {
    const dataLength = shortBlockLength - blockEccLength + (index < numShortBlocks ? 0 : 1);
    const dataBlock = data.slice(offset, offset + dataLength);
    offset += dataLength;
    const eccBlock = reedSolomonComputeRemainder(dataBlock, rsDivisor);
    if (index < numShortBlocks) dataBlock.push(0);
    blocks.push([...dataBlock, ...eccBlock]);
  }

  const result: number[] = [];
  for (let index = 0; index < blocks[0].length; index++) {
    blocks.forEach((block, blockIndex) => {
      if (index !== shortBlockLength - blockEccLength || blockIndex >= numShortBlocks) result.push(block[index]);
    });
  }
  return result;
};

const makeDataCodewords = (bytes: number[], version: number, level: NmorphQRCodeErrorCorrectionLevel) => {
  const dataCapacityBits = getNumDataCodewords(version, level) * 8;
  const buffer: boolean[] = [];
  appendBits(buffer, 0x04, 4);
  appendBits(buffer, bytes.length, getByteCountBits(version));
  bytes.forEach((value) => appendBits(buffer, value, 8));
  appendBits(buffer, 0, Math.min(4, dataCapacityBits - buffer.length));
  while (buffer.length % 8 !== 0) buffer.push(false);

  const data = [];
  for (let index = 0; index < buffer.length; index += 8) {
    let value = 0;
    for (let bit = 0; bit < 8; bit++) value = (value << 1) | (buffer[index + bit] ? 1 : 0);
    data.push(value);
  }

  for (let padByte = 0xec; data.length < dataCapacityBits / 8; padByte ^= 0xec ^ 0x11) data.push(padByte);
  return data;
};

const getMaskBit = (mask: number, x: number, y: number) => {
  switch (mask) {
    case 0:
      return (x + y) % 2 === 0;
    case 1:
      return y % 2 === 0;
    case 2:
      return x % 3 === 0;
    case 3:
      return (x + y) % 3 === 0;
    case 4:
      return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0;
    case 5:
      return ((x * y) % 2) + ((x * y) % 3) === 0;
    case 6:
      return (((x * y) % 2) + ((x * y) % 3)) % 2 === 0;
    default:
      return (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
  }
};

class QrCodeMatrix {
  readonly size: number;

  readonly modules: boolean[][];

  private readonly isFunction: boolean[][];

  constructor(
    readonly version: number,
    private readonly level: NmorphQRCodeErrorCorrectionLevel
  ) {
    this.size = version * 4 + 17;
    this.modules = Array.from({ length: this.size }, () => Array<boolean>(this.size).fill(false));
    this.isFunction = Array.from({ length: this.size }, () => Array<boolean>(this.size).fill(false));
  }

  drawFunctionPatterns() {
    for (let index = 0; index < this.size; index++) {
      this.setFunctionModule(6, index, index % 2 === 0);
      this.setFunctionModule(index, 6, index % 2 === 0);
    }

    this.drawFinderPattern(3, 3);
    this.drawFinderPattern(this.size - 4, 3);
    this.drawFinderPattern(3, this.size - 4);

    const positions = getAlignmentPatternPositions(this.version);
    positions.forEach((x, xIndex) => {
      positions.forEach((y, yIndex) => {
        const isFinderCorner =
          (xIndex === 0 && yIndex === 0) ||
          (xIndex === 0 && yIndex === positions.length - 1) ||
          (xIndex === positions.length - 1 && yIndex === 0);
        if (!isFinderCorner) this.drawAlignmentPattern(x, y);
      });
    });

    this.drawFormatBits(0);
    this.drawVersion();
  }

  drawCodewords(data: number[]) {
    let bitIndex = 0;
    for (let right = this.size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < this.size; vert++) {
        for (let column = 0; column < 2; column++) {
          const x = right - column;
          const upward = ((right + 1) & 2) === 0;
          const y = upward ? this.size - 1 - vert : vert;
          if (!this.isFunction[y][x] && bitIndex < data.length * 8) {
            this.modules[y][x] = getBit(data[bitIndex >>> 3], 7 - (bitIndex & 7));
            bitIndex++;
          }
        }
      }
    }
  }

  applyMask(mask: number) {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (!this.isFunction[y][x] && getMaskBit(mask, x, y)) this.modules[y][x] = !this.modules[y][x];
      }
    }
  }

  drawFormatBits(mask: number) {
    const data = (FORMAT_BITS[this.level] << 3) | mask;
    let remainder = data;
    for (let index = 0; index < 10; index++) remainder = (remainder << 1) ^ ((remainder >>> 9) * 0x537);
    const bits = ((data << 10) | remainder) ^ 0x5412;

    for (let index = 0; index <= 5; index++) this.setFunctionModule(8, index, getBit(bits, index));
    this.setFunctionModule(8, 7, getBit(bits, 6));
    this.setFunctionModule(8, 8, getBit(bits, 7));
    this.setFunctionModule(7, 8, getBit(bits, 8));
    for (let index = 9; index < 15; index++) this.setFunctionModule(14 - index, 8, getBit(bits, index));

    for (let index = 0; index < 8; index++) this.setFunctionModule(this.size - 1 - index, 8, getBit(bits, index));
    for (let index = 8; index < 15; index++) this.setFunctionModule(8, this.size - 15 + index, getBit(bits, index));
    this.setFunctionModule(8, this.size - 8, true);
  }

  getPenaltyScore() {
    let result = 0;
    for (let y = 0; y < this.size; y++) result += this.getRunPenalty(this.modules[y]);
    for (let x = 0; x < this.size; x++) result += this.getRunPenalty(this.modules.map((row) => row[x]));

    for (let y = 0; y < this.size - 1; y++) {
      for (let x = 0; x < this.size - 1; x++) {
        const color = this.modules[y][x];
        if (
          color === this.modules[y][x + 1] &&
          color === this.modules[y + 1][x] &&
          color === this.modules[y + 1][x + 1]
        ) {
          result += 3;
        }
      }
    }

    result += this.getFinderPenalty();
    const darkModules = this.modules.flat().filter(Boolean).length;
    let balancePenalty = 0;
    const totalModules = this.size * this.size;
    while (
      darkModules * 20 < (9 - balancePenalty) * totalModules ||
      darkModules * 20 > (11 + balancePenalty) * totalModules
    ) {
      balancePenalty++;
    }
    return result + balancePenalty * 10;
  }

  private drawFinderPattern(x: number, y: number) {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const xx = x + dx;
        const yy = y + dy;
        if (xx < 0 || xx >= this.size || yy < 0 || yy >= this.size) continue;
        const distance = Math.max(Math.abs(dx), Math.abs(dy));
        this.setFunctionModule(xx, yy, distance !== 2 && distance !== 4);
      }
    }
  }

  private drawAlignmentPattern(x: number, y: number) {
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
      }
    }
  }

  private drawVersion() {
    if (this.version < 7) return;
    let remainder = this.version;
    for (let index = 0; index < 12; index++) remainder = (remainder << 1) ^ ((remainder >>> 11) * 0x1f25);
    const bits = (this.version << 12) | remainder;
    for (let index = 0; index < 18; index++) {
      const color = getBit(bits, index);
      const a = this.size - 11 + (index % 3);
      const b = Math.floor(index / 3);
      this.setFunctionModule(a, b, color);
      this.setFunctionModule(b, a, color);
    }
  }

  private setFunctionModule(x: number, y: number, isDark: boolean) {
    this.modules[y][x] = isDark;
    this.isFunction[y][x] = true;
  }

  private getRunPenalty(line: boolean[]) {
    let result = 0;
    let runColor = line[0];
    let runLength = 1;
    for (let index = 1; index < line.length; index++) {
      if (line[index] === runColor) {
        runLength++;
      } else {
        if (runLength >= 5) result += 3 + runLength - 5;
        runColor = line[index];
        runLength = 1;
      }
    }
    if (runLength >= 5) result += 3 + runLength - 5;
    return result;
  }

  private getFinderPenalty() {
    let result = 0;
    for (let y = 0; y < this.size; y++) result += this.getFinderPenaltyForLine(this.modules[y]);
    for (let x = 0; x < this.size; x++) result += this.getFinderPenaltyForLine(this.modules.map((row) => row[x]));
    return result;
  }

  private getFinderPenaltyForLine(line: boolean[]) {
    let result = 0;
    for (let index = 0; index <= line.length - 7; index++) {
      const hasPattern =
        line[index] &&
        !line[index + 1] &&
        line[index + 2] &&
        line[index + 3] &&
        line[index + 4] &&
        !line[index + 5] &&
        line[index + 6];
      if (!hasPattern) continue;
      const hasLightBefore = index >= 4 && line.slice(index - 4, index).every((value) => !value);
      const hasLightAfter = index + 11 <= line.length && line.slice(index + 7, index + 11).every((value) => !value);
      if (hasLightBefore || hasLightAfter) result += 40;
    }
    return result;
  }
}

const getBytes = (value: string) => Array.from(new TextEncoder().encode(value));

export const createNmorphQRCode = (value: string, options: INmorphQRCodeOptions = {}): INmorphQRCodeData => {
  const level = options.errorCorrectionLevel ?? 'medium';
  const minVersion = clampVersion(options.minVersion ?? 1);
  const maxVersion = clampVersion(options.maxVersion ?? 40);
  const bytes = getBytes(value);
  const version = Array.from({ length: maxVersion - minVersion + 1 }, (_, index) => minVersion + index).find(
    (candidate) =>
      bytes.length < 1 << getByteCountBits(candidate) &&
      getRequiredBits(bytes.length, candidate) <= getNumDataCodewords(candidate, level) * 8
  );

  if (!version) throw new Error('The QR code value is too large for the selected version range.');

  const dataCodewords = makeDataCodewords(bytes, version, level);
  const codewords = addEccAndInterleave(dataCodewords, version, level);
  const matrix = new QrCodeMatrix(version, level);
  matrix.drawFunctionPatterns();
  matrix.drawCodewords(codewords);

  let bestMask = 0;
  let bestPenalty = Infinity;
  for (let mask = 0; mask < 8; mask++) {
    matrix.applyMask(mask);
    matrix.drawFormatBits(mask);
    const penalty = matrix.getPenaltyScore();
    if (penalty < bestPenalty) {
      bestMask = mask;
      bestPenalty = penalty;
    }
    matrix.applyMask(mask);
  }

  matrix.applyMask(bestMask);
  matrix.drawFormatBits(bestMask);
  return {
    modules: matrix.modules.map((row) => [...row]),
    size: matrix.size,
    version,
  };
};
