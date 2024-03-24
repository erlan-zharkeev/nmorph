export enum ImageResolution {
  jpeg = 'image/jpeg',
  jpg = 'image/jpg',
  png = 'image/png',
  gif = 'image/gif',
  'svg-xml' = 'image/svg+xml',
  webp = 'image/webp',
}

export enum VideoResolution {
  mp4 = 'video/mp4',
  webm = 'video/webm',
  'wideo-ogg' = 'video/ogg',
}

export enum AudioResolution {
  mpeg = 'audio/mpeg',
  'audio-ogg' = 'audio/ogg',
  wav = 'audio/wav',
}

export enum DocResolution {
  pdf = 'application/pdf',
  msword = 'application/msword',
  docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  json = 'application/json',
  xml = 'application/xml',
}

export enum ArchiveResolution {
  zip = 'application/zip',
  rar = 'application/x-rar-compressed',
  '7z' = 'application/x-7z-compressed',
}

export const resolution = {
  ...ImageResolution,
  ...VideoResolution,
  ...AudioResolution,
  ...DocResolution,
  ...ArchiveResolution,
};

export type Resolution = keyof typeof resolution;
