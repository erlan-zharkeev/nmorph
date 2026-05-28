import {
  NmorphArchiveResolution,
  NmorphAudioResolution,
  NmorphDocResolution,
  NmorphImageResolution,
  NmorphVideoResolution,
  resolution,
  type NmorphResolutionType,
} from '@/components/form/nmorph-file-upload/types';

const knownResolutionEntries = Object.entries(resolution) as Array<[NmorphResolutionType, string]>;

const extensionByResolution: Partial<Record<NmorphResolutionType, string>> = {
  'svg-xml': 'svg',
  msword: 'doc',
  mpeg: 'mp3',
  'audio-ogg': 'ogg',
  'video-ogg': 'ogg',
  'wideo-ogg': 'ogg',
};

export const getPlainFileType = (mimeType: string) => mimeType.split('/')[1]?.toLowerCase() || '';

export const getFileExtension = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension && extension !== fileName.toLowerCase() ? extension : '';
};

export const getKnownResolutionByMime = (mimeType: string) =>
  knownResolutionEntries.find(([, knownMimeType]) => knownMimeType.toLowerCase() === mimeType.toLowerCase())?.[0] || '';

export const getTypeCandidates = (mimeType: string, fileName = '') =>
  Array.from(
    new Set(
      [
        mimeType.toLowerCase(),
        getKnownResolutionByMime(mimeType),
        getFileExtension(fileName),
        getPlainFileType(mimeType),
      ]
        .filter(Boolean)
        .map((type) => type.toLowerCase())
    )
  );

export const getFileTypeCandidates = (file: File) => getTypeCandidates(file.type, file.name);

export const isKnownFileType = <T extends Record<string, string>>(fileType: string, fileTypeMap: T) =>
  Object.prototype.hasOwnProperty.call(fileTypeMap, fileType);

export const fileMatchesKnownTypes = <T extends Record<string, string>>(file: File, fileTypeMap: T) => {
  const candidates = getFileTypeCandidates(file);

  return candidates.some((type) => isKnownFileType(type, fileTypeMap));
};

export const isImageFile = (file: File) =>
  file.type.toLowerCase().startsWith('image/') || fileMatchesKnownTypes(file, NmorphImageResolution);

export const isAudioFile = (file: File) =>
  file.type.toLowerCase().startsWith('audio/') || fileMatchesKnownTypes(file, NmorphAudioResolution);

export const isVideoFile = (file: File) =>
  file.type.toLowerCase().startsWith('video/') || fileMatchesKnownTypes(file, NmorphVideoResolution);

export const isArchiveFile = (file: File) => fileMatchesKnownTypes(file, NmorphArchiveResolution);

export const isDocumentFile = (file: File) => fileMatchesKnownTypes(file, NmorphDocResolution);

export const isFileAllowedByTypes = (file: File, allowedTypes: Array<NmorphResolutionType | string>) => {
  if (allowedTypes.length === 0) return true;

  const candidates = getFileTypeCandidates(file);
  return allowedTypes.some((allowedType) => candidates.includes(String(allowedType).toLowerCase()));
};

export const getFileAcceptValue = (allowedTypes: Array<NmorphResolutionType | string>) => {
  if (allowedTypes.length === 0) return undefined;

  return Array.from(
    new Set(
      allowedTypes.flatMap((allowedType) => {
        const normalizedType = String(allowedType).toLowerCase();
        const knownMimeType = resolution[normalizedType as NmorphResolutionType];
        const extension = extensionByResolution[normalizedType as NmorphResolutionType] || normalizedType;

        if (normalizedType.includes('/')) return normalizedType;
        return knownMimeType ? [`.${extension}`, knownMimeType] : `.${extension}`;
      })
    )
  ).join(',');
};
