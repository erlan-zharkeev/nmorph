<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch, type Component } from 'vue';
import {
  INmorphCustomFileData,
  NmorphArchiveResolution,
  NmorphAudioResolution,
  NmorphImageResolution,
  NmorphResolutionType,
  NmorphVideoResolution,
  resolution,
  NmorphButton,
  NmorphIcon,
  NmorphImagePreview,
  NmorphIconDoc,
  NmorphIconImage,
  NmorphIconAudio,
  NmorphIconVideo,
  NmorphIconArchive,
  NmorphIconCross,
} from '@/components';
import { useModifiers } from '@/utils';
import { NmorphDomElementType } from '@/types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface INmorphProps {
  modelValue?: INmorphCustomFileData[];
  disabled?: boolean;
  multiple?: boolean;
  allowedTypes?: Array<NmorphResolutionType | string>;
  photoWithPreview?: boolean;
  buttonText?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: () => [],
  disabled: false,
  multiple: false,
  allowedTypes: () => [],
  photoWithPreview: true,
  buttonText: '',
});

interface INmorphEmit {
  (e: 'update:model-value', val: INmorphCustomFileData[]): void;
  (e: 'on-unsupported-file-type-error', val: string): void;
}

const emit = defineEmits<INmorphEmit>();
const computedButtonText = computed(() => (props.buttonText ? props.buttonText : t('selectFile')));

const knownResolutionEntries = Object.entries(resolution) as Array<[NmorphResolutionType, string]>;
const extensionByResolution: Partial<Record<NmorphResolutionType, string>> = {
  'svg-xml': 'svg',
  'audio-ogg': 'ogg',
  'wideo-ogg': 'ogg',
};

const getPlainType = (mimeType: string) => mimeType.split('/')[1]?.toLowerCase() || '';

const getFileExtension = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension && extension !== fileName.toLowerCase() ? extension : '';
};

const getKnownResolutionByMime = (mimeType: string) =>
  knownResolutionEntries.find(([, knownMimeType]) => knownMimeType.toLowerCase() === mimeType.toLowerCase())?.[0] || '';

const getFileTypeCandidates = (file: File) =>
  Array.from(
    new Set(
      [
        file.type.toLowerCase(),
        getKnownResolutionByMime(file.type),
        getFileExtension(file.name),
        getPlainType(file.type),
      ]
        .filter(Boolean)
        .map((type) => type.toLowerCase())
    )
  );

const isKnownFileType = <T extends Record<string, string>>(fileType: string, fileTypeMap: T) =>
  Object.prototype.hasOwnProperty.call(fileTypeMap, fileType);

const isImageFile = (file: File) => {
  const candidates = getFileTypeCandidates(file);
  return (
    file.type.toLowerCase().startsWith('image/') ||
    candidates.some((type) => isKnownFileType(type, NmorphImageResolution))
  );
};

const isFileAllowed = (file: File) => {
  if (props.allowedTypes.length === 0) return true;

  const candidates = getFileTypeCandidates(file);
  return props.allowedTypes.some((allowedType) => candidates.includes(String(allowedType).toLowerCase()));
};

const inputAccept = computed(() => {
  if (props.allowedTypes.length === 0) return undefined;

  return Array.from(
    new Set(
      props.allowedTypes.flatMap((allowedType) => {
        const normalizedType = String(allowedType).toLowerCase();
        const knownMimeType = resolution[normalizedType as NmorphResolutionType];
        const extension = extensionByResolution[normalizedType as NmorphResolutionType] || normalizedType;

        if (normalizedType.includes('/')) return normalizedType;
        return knownMimeType ? [`.${extension}`, knownMimeType] : `.${extension}`;
      })
    )
  ).join(',');
});

const typeFileIconMap = (file: File): Component => {
  const candidates = getFileTypeCandidates(file);
  let result: Component = NmorphIconDoc;
  if (
    file.type.toLowerCase().startsWith('image/') ||
    candidates.some((type) => isKnownFileType(type, NmorphImageResolution))
  ) {
    result = NmorphIconImage;
  }
  if (
    file.type.toLowerCase().startsWith('audio/') ||
    candidates.some((type) => isKnownFileType(type, NmorphAudioResolution))
  ) {
    result = NmorphIconAudio;
  }
  if (
    file.type.toLowerCase().startsWith('video/') ||
    candidates.some((type) => isKnownFileType(type, NmorphVideoResolution))
  ) {
    result = NmorphIconVideo;
  }
  if (candidates.some((type) => isKnownFileType(type, NmorphArchiveResolution))) result = NmorphIconArchive;
  return result;
};

const inputDOMRef = ref<NmorphDomElementType>(null);
const files = ref<INmorphCustomFileData[]>([...props.modelValue]);
const createdPreviewUrls = new Set<string>();

const resetInputValue = () => {
  const input = inputDOMRef.value as HTMLInputElement | null;
  if (!input) return;
  input.value = '';
};

const revokePreviewUrl = (previewUrl: string) => {
  if (!createdPreviewUrls.has(previewUrl)) return;
  URL.revokeObjectURL(previewUrl);
  createdPreviewUrls.delete(previewUrl);
};

const revokeRemovedPreviewUrls = (nextFiles: INmorphCustomFileData[]) => {
  const nextPreviewUrls = new Set(nextFiles.map((file) => file.previewUrl));
  Array.from(createdPreviewUrls).forEach((previewUrl) => {
    if (!nextPreviewUrls.has(previewUrl)) revokePreviewUrl(previewUrl);
  });
};

const filesChanged = (nextFiles: INmorphCustomFileData[]) => {
  const nextValue = [...nextFiles];
  files.value = nextValue;
  emit('update:model-value', nextValue);
};

const openFileSelector = () => {
  if (props.disabled || !inputDOMRef.value) return;
  inputDOMRef.value.click();
};

const handleFileUpload = (event: Event) => {
  if (props.disabled) return;
  const target = event.target as HTMLInputElement;
  const selectedFiles = Array.from(target.files || []);
  const acceptedFiles: INmorphCustomFileData[] = [];

  selectedFiles.forEach((file) => {
    if (!isFileAllowed(file)) {
      emit('on-unsupported-file-type-error', file.type || getFileExtension(file.name) || file.name);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    createdPreviewUrls.add(previewUrl);
    acceptedFiles.push({ data: file, previewUrl });
  });

  resetInputValue();

  if (acceptedFiles.length > 0) {
    filesChanged([...files.value, ...acceptedFiles]);
  }
};

const removeFile = (fileName: string) => {
  if (props.disabled) return;
  const index = files.value.findIndex((file) => file.data.name === fileName);
  if (index !== -1) {
    const removedFile = files.value[index];
    revokePreviewUrl(removedFile.previewUrl);
    resetInputValue();
    filesChanged(files.value.filter((_, fileIndex) => fileIndex !== index));
  }
};

watch(
  () => props.modelValue,
  (nextFiles) => {
    const nextValue = [...nextFiles];
    revokeRemovedPreviewUrls(nextValue);
    files.value = nextValue;
    if (nextValue.length === 0) resetInputValue();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  Array.from(createdPreviewUrls).forEach((previewUrl) => revokePreviewUrl(previewUrl));
});

defineExpose({ inputDOMRef });

const modifiers = computed(() =>
  useModifiers({
    'nmorph-file-upload': [`${props.disabled && 'disabled'}`],
  })
);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-file-upload__trigger">
      <input
        ref="inputDOMRef"
        type="file"
        :multiple="props.multiple"
        :disabled="props.disabled"
        :accept="inputAccept"
        class="nmorph-native-input"
        @change="handleFileUpload"
      />
      <slot name="trigger">
        <NmorphButton :text="computedButtonText" fill :disabled="props.disabled" @click="openFileSelector" />
      </slot>
    </div>
    <div v-if="files.length > 0" class="nmorph-file-upload__list">
      <transition-group name="list" tag="div">
        <div v-for="{ data, previewUrl } in files" :key="data.name" class="nmorph-file-upload__file">
          <NmorphImagePreview v-if="props.photoWithPreview && isImageFile(data)" :src="previewUrl" />
          <div class="nmorph-file-upload__file-info">
            <NmorphIcon width="14px" height="17px">
              <component :is="typeFileIconMap(data)" />
            </NmorphIcon>
            <span class="nmorph-file-upload__file-name">{{ data.name }}</span>
          </div>
          <div class="nmorph-file-upload__remove-file">
            <NmorphButton height="thin" style-type="transparent" @click="removeFile(data.name)">
              <template #icon-only>
                <NmorphIconCross />
              </template>
            </NmorphButton>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-file-upload {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;

  .nmorph-file-upload__trigger {
    position: relative;
  }

  input {
    display: none;
  }

  .nmorph-file-upload__list {
    width: 100%;
    min-width: 0;
    margin-top: var(--indentation-03);
  }

  .nmorph-file-upload__list > div {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
  }

  .nmorph-file-upload__file {
    display: flex;
    gap: var(--indentation-02);
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    margin-bottom: var(--indentation-02);
    padding: var(--indentation-02) var(--indentation-03);
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-file-upload__file > .nmorph-image-preview {
    flex: 0 0 auto;
  }

  .nmorph-file-upload__file-info {
    display: flex;
    flex: 1 1 auto;
    gap: var(--indentation-02);
    align-items: center;
    min-width: 0;
    overflow: hidden;
  }

  .nmorph-file-upload__file-info > .nmorph-icon {
    flex: 0 0 auto;
  }

  .nmorph-file-upload__file-name {
    display: block;
    flex: 1 1 auto;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-file-upload__remove-file {
    flex: 0 0 auto;
  }
}
</style>
