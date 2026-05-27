import { resolution, type NmorphResolutionType } from '@/components/form/nmorph-file-upload/types';

const knownResolutionEntries = Object.entries(resolution) as Array<[NmorphResolutionType, string]>;

const extensionByResolution: Partial<Record<NmorphResolutionType, string>> = {
  'svg-xml': 'svg',
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

export const getFileTypeCandidates = (file: File) =>
  Array.from(
    new Set(
      [
        file.type.toLowerCase(),
        getKnownResolutionByMime(file.type),
        getFileExtension(file.name),
        getPlainFileType(file.type),
      ]
        .filter(Boolean)
        .map((type) => type.toLowerCase())
    )
  );

export const isKnownFileType = <T extends Record<string, string>>(fileType: string, fileTypeMap: T) =>
  Object.prototype.hasOwnProperty.call(fileTypeMap, fileType);

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
