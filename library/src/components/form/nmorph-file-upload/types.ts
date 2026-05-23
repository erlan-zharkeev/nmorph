export enum NmorphImageResolution {
  jpeg = 'image/jpeg',
  jpg = 'image/jpg',
  png = 'image/png',
  gif = 'image/gif',
  'svg-xml' = 'image/svg+xml',
  webp = 'image/webp',
}

export enum NmorphVideoResolution {
  mp4 = 'video/mp4',
  webm = 'video/webm',
  'wideo-ogg' = 'video/ogg',
}

export enum NmorphAudioResolution {
  mpeg = 'audio/mpeg',
  'audio-ogg' = 'audio/ogg',
  wav = 'audio/wav',
}

export enum NmorphDocResolution {
  pdf = 'application/pdf',
  msword = 'application/msword',
  docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  json = 'application/json',
  xml = 'application/xml',
}

export enum NmorphArchiveResolution {
  zip = 'application/zip',
  rar = 'application/x-rar-compressed',
  '7z' = 'application/x-7z-compressed',
}

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
