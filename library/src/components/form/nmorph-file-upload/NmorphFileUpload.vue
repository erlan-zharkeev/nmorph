<script setup lang="ts">
import { computed, reactive, ref, type Component } from 'vue';
import {
  INmorphCustomFileData,
  NmorphArchiveResolution,
  NmorphAudioResolution,
  NmorphImageResolution,
  NmorphResolutionType,
  NmorphVideoResolution,
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
  allowedTypes?: NmorphResolutionType[];
  photoWithPreview?: boolean;
  buttonText?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: () => [],
  disabled: false,
  multiple: false,
  allowedTypes: () => ['jpg', 'jpeg', 'png'],
  photoWithPreview: true,
  buttonText: '',
});

const computedButtonText = computed(() => (props.buttonText ? props.buttonText : t('selectFile')));

const getPlainType = (resolution: string) => resolution.split('/')[1];

const typeFileIconMap = (resolution: string): Component => {
  const plainResolutionName = getPlainType(resolution);
  let result: Component = NmorphIconDoc;
  if (plainResolutionName in NmorphImageResolution) result = NmorphIconImage;
  if (plainResolutionName in NmorphAudioResolution) result = NmorphIconAudio;
  if (plainResolutionName in NmorphVideoResolution) result = NmorphIconVideo;
  if (plainResolutionName in NmorphArchiveResolution) result = NmorphIconArchive;
  return result;
};

let files = reactive<INmorphCustomFileData[]>(props.modelValue);

const inputDOMRef = ref<NmorphDomElementType>(null);

const openFileSelector = () => {
  if (props.disabled || !inputDOMRef.value) return;
  inputDOMRef.value.click();
};

const handleFileUpload = (event: Event) => {
  if (props.disabled) return;
  const target = event.target as HTMLInputElement;
  if (target.files) {
    Array.from(target.files).forEach((file) => {
      const resolution = getPlainType(file.type) as NmorphResolutionType;
      if (!props.allowedTypes.includes(resolution)) {
        return emit('on-unsupported-file-type-error', file.type);
      }
      const previewUrl = URL.createObjectURL(file);
      const result = { data: file, previewUrl };
      files.push(result);
    });
    if (files.length === 0) return;
    filesChanged();
  }
};

const filesChanged = () => {
  emit('update:model-value', files);
};

const removeFile = (fileName: string) => {
  if (props.disabled) return;
  const index = files.findIndex((file) => file.data.name === fileName);
  if (index !== -1) {
    URL.revokeObjectURL(files[index].previewUrl);
    files.splice(index, 1);
    filesChanged();
  }
};

interface INmorphEmit {
  (e: 'update:model-value', val: INmorphCustomFileData[]): void;
  (e: 'on-unsupported-file-type-error', val: string): void;
}

defineExpose({ inputDOMRef });
const emit = defineEmits<INmorphEmit>();

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
          <NmorphImagePreview :src="previewUrl" />
          <div class="nmorph-file-upload__file-info">
            <NmorphIcon width="14px" height="17px">
              <component :is="typeFileIconMap(data.type)" />
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
