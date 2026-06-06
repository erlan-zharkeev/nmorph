export const NmorphImageResolution = {
  jpeg: 'image/jpeg',
  jpg: 'image/jpg',
  png: 'image/png',
  gif: 'image/gif',
  'svg-xml': 'image/svg+xml',
  webp: 'image/webp',
} as const;

export type NmorphImageResolution = keyof typeof NmorphImageResolution;

export const NmorphVideoResolution = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  'video-ogg': 'video/ogg',
} as const;

export type NmorphVideoResolution = keyof typeof NmorphVideoResolution;

export const NmorphAudioResolution = {
  mpeg: 'audio/mpeg',
  'audio-ogg': 'audio/ogg',
  wav: 'audio/wav',
} as const;

export type NmorphAudioResolution = keyof typeof NmorphAudioResolution;

export const NmorphDocResolution = {
  pdf: 'application/pdf',
  msword: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  json: 'application/json',
  xml: 'application/xml',
} as const;

export type NmorphDocResolution = keyof typeof NmorphDocResolution;

export const NmorphArchiveResolution = {
  zip: 'application/zip',
  rar: 'application/x-rar-compressed',
  '7z': 'application/x-7z-compressed',
} as const;

export type NmorphArchiveResolution = keyof typeof NmorphArchiveResolution;

export const resolution = {
  ...NmorphImageResolution,
  ...NmorphVideoResolution,
  ...NmorphAudioResolution,
  ...NmorphDocResolution,
  ...NmorphArchiveResolution,
};

export type NmorphResolutionType = keyof typeof resolution;

export interface INmorphCustomFileData {
  data: File;
  previewUrl: string;
}

export interface INmorphFileUploadValidationError {
  file: File;
  errors: string[];
}

export interface INmorphFileUploadProps {
  id?: string;
  name?: string;
  autocomplete?: string;
  tabindex?: number;
  modelValue?: INmorphCustomFileData[];
  disabled?: boolean;
  multiple?: boolean;
  allowedTypes?: Array<NmorphResolutionType | string>;
  photoWithPreview?: boolean;
  buttonText?: string;
  compact?: boolean;
  layout?: 'list' | 'grid' | 'inline';
  fileNameWidth?: number | string;
}

export interface INmorphFileUploadEmit {
  (e: 'update:model-value', val: INmorphCustomFileData[]): void;
  (e: 'on-unsupported-file-type-error', val: string): void;
  (e: 'on-file-validation-error', val: INmorphFileUploadValidationError): void;
}
