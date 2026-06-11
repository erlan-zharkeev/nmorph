<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue';
import {
  INmorphCustomFileData,
  NmorphAudioPreview,
  NmorphButton,
  NmorphIconCross,
  NmorphIcon,
  NmorphFileCard,
  NmorphIconImage,
  NmorphImagePreview,
  NmorphVideoPreview,
} from '@/components';
import {
  createCssSizeVariables,
  getFileAcceptValue,
  getFileExtension,
  isAudioFile,
  isFileAllowedByTypes,
  isImageFile,
  isVideoFile,
  useModifiers,
} from '@/utils';
import { NmorphDomElementType } from '@/types';
import { useI18n } from 'vue-i18n';
import { NmorphFormValidationDataType } from '../nmorph-form/types';
import { useFormItemInput, useFormItemModel } from '../nmorph-form/use-form-item-input';
import type { INmorphFileUploadEmit, INmorphFileUploadProps } from './types';

const { t } = useI18n();

const props = withDefaults(defineProps<INmorphFileUploadProps>(), {
  modelValue: () => [],
  disabled: false,
  multiple: false,
  allowedTypes: () => [],
  photoWithPreview: true,
  buttonText: '',
  compact: false,
  layout: 'list',
  fileNameWidth: undefined,
});

const emit = defineEmits<INmorphFileUploadEmit>();
const computedButtonText = computed(() => (props.buttonText ? props.buttonText : t('selectFile')));
const { id, name, autocomplete, tabindex } = useFormItemInput(props);
const { modelValue, updateModelValue } = useFormItemModel<INmorphCustomFileData[]>(
  props,
  (value) => emit('update:model-value', value),
  []
);
const formData = inject<NmorphFormValidationDataType | undefined>('form-data', undefined);

const inputAccept = computed(() => getFileAcceptValue(props.allowedTypes));
const showImagePreview = (file: File) => props.photoWithPreview && isImageFile(file);

const inputDOMRef = ref<NmorphDomElementType>(null);
const files = ref<INmorphCustomFileData[]>([...modelValue.value]);
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
  updateModelValue(nextValue);
};

const getFormValidationResult = (candidateFiles: File[]) => {
  const fieldValidation = formData?.validateField(id.value, candidateFiles);

  return {
    valid: fieldValidation?.valid.value ?? true,
    errors: fieldValidation?.errors.value ?? [],
  };
};

const openFileSelector = () => {
  if (props.disabled || !inputDOMRef.value) return;
  inputDOMRef.value.click();
};

const handleFileUpload = (event: Event) => {
  if (props.disabled) return;
  const target = event.target as HTMLInputElement;
  const selectedFiles = Array.from(target.files || []);
  const filesToProcess = props.multiple ? selectedFiles : selectedFiles.slice(0, 1);
  const acceptedRawFiles: File[] = [];

  filesToProcess.forEach((file) => {
    if (!isFileAllowedByTypes(file, props.allowedTypes)) {
      emit('on-unsupported-file-type-error', file.type || getFileExtension(file.name) || file.name);
      return;
    }

    const candidateFiles = props.multiple
      ? [...files.value.map((uploadedFile) => uploadedFile.data), ...acceptedRawFiles, file]
      : [file];
    const validationResult = getFormValidationResult(candidateFiles);

    if (!validationResult.valid) {
      emit('on-file-validation-error', { file, errors: validationResult.errors });
      return;
    }

    acceptedRawFiles.push(file);
  });

  resetInputValue();

  if (acceptedRawFiles.length > 0) {
    const acceptedFiles = acceptedRawFiles.map((file) => {
      const previewUrl = URL.createObjectURL(file);
      createdPreviewUrls.add(previewUrl);
      return { data: file, previewUrl };
    });
    const nextFiles = props.multiple ? [...files.value, ...acceptedFiles] : acceptedFiles;

    revokeRemovedPreviewUrls(nextFiles);
    filesChanged(nextFiles);
    formData?.validateField(id.value, nextFiles);
  }
};

const removeFile = (fileName: string) => {
  if (props.disabled) return;
  const index = files.value.findIndex((file) => file.data.name === fileName);
  if (index !== -1) {
    const removedFile = files.value[index];
    revokePreviewUrl(removedFile.previewUrl);
    resetInputValue();
    const nextFiles = files.value.filter((_, fileIndex) => fileIndex !== index);
    filesChanged(nextFiles);
    formData?.validateField(id.value, nextFiles);
  }
};

watch(
  modelValue,
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
    'nmorph-file-upload': [props.disabled && 'disabled', props.compact && 'compact', `layout-${props.layout}`],
  })
);
const styles = computed(() =>
  createCssSizeVariables({
    '--nmorph-private-file-upload-name-width': props.fileNameWidth,
  })
);
</script>

<template>
  <div :class="modifiers" :style="styles">
    <div class="nmorph-file-upload__trigger">
      <input
        :id="id"
        ref="inputDOMRef"
        :name="name"
        :autocomplete="autocomplete"
        :tabindex="tabindex"
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
          <template v-if="showImagePreview(data)">
            <NmorphImagePreview :src="previewUrl" />
            <div class="nmorph-file-upload__file-info">
              <NmorphIcon width="14px" height="17px">
                <NmorphIconImage />
              </NmorphIcon>
              <span class="nmorph-file-upload__file-name">{{ data.name }}</span>
            </div>
          </template>
          <template v-else-if="isImageFile(data)">
            <div class="nmorph-file-upload__file-info">
              <NmorphIcon width="14px" height="17px">
                <NmorphIconImage />
              </NmorphIcon>
              <span class="nmorph-file-upload__file-name">{{ data.name }}</span>
            </div>
          </template>
          <NmorphVideoPreview
            v-else-if="isVideoFile(data)"
            :src="previewUrl"
            :name="data.name"
            :download-href="previewUrl"
            compact
            controls
          />
          <NmorphAudioPreview
            v-else-if="isAudioFile(data)"
            :src="previewUrl"
            :name="data.name"
            :download-href="previewUrl"
            compact
          />
          <NmorphFileCard
            v-else
            :name="data.name"
            :mime-type="data.type"
            :size="data.size"
            :extension="getFileExtension(data.name)"
            :preview-src="previewUrl"
            :download-href="previewUrl"
            compact
          />
          <div class="nmorph-file-upload__remove-file">
            <NmorphButton design="plain" thickness="thin" @click="removeFile(data.name)">
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
    width: 100%;
    min-width: 0;
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
    display: grid;
    gap: var(--indentation-02);
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
    margin-bottom: 0;
    padding: var(--indentation-02) var(--indentation-03);
    overflow: hidden;
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  &.nmorph-file-upload--compact .nmorph-file-upload__file {
    padding: var(--indentation-01) var(--indentation-02);
  }

  &.nmorph-file-upload--layout-grid .nmorph-file-upload__list > div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--indentation-02);
  }

  &.nmorph-file-upload--layout-grid .nmorph-file-upload__file {
    margin-bottom: 0;
  }

  &.nmorph-file-upload--layout-inline .nmorph-file-upload__list > div {
    display: flex;
    flex-wrap: wrap;
    gap: var(--indentation-02);
  }

  &.nmorph-file-upload--layout-inline .nmorph-file-upload__file {
    width: auto;
    margin-bottom: 0;
  }

  .nmorph-file-upload__file > .nmorph-image-preview {
    flex: 0 0 auto;
  }

  .nmorph-file-upload__file > .nmorph-video-preview,
  .nmorph-file-upload__file > .nmorph-audio-preview,
  .nmorph-file-upload__file > .nmorph-file-card {
    flex: 1 1 0;
    min-width: 0;
  }

  .nmorph-file-upload__file-info {
    display: flex;
    flex: 1 1 0;
    gap: var(--indentation-02);
    align-items: center;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
  }

  .nmorph-file-upload__file-info > .nmorph-icon {
    flex: 0 0 auto;
  }

  .nmorph-file-upload__file-name {
    display: block;
    flex: 1 1 0;
    width: var(--nmorph-private-file-upload-name-width, auto);
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
