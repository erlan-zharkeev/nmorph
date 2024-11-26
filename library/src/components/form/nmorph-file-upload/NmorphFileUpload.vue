<script setup lang="ts">
import { computed, DefineComponent, reactive, ref } from 'vue';
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

const typeFileIconMap = (resolution: string): DefineComponent<{}, {}, unknown> => {
  const plainResolutionName = getPlainType(resolution);
  let result: DefineComponent<{}, {}, unknown> = NmorphIconDoc;
  if (plainResolutionName in NmorphImageResolution) result = NmorphIconImage;
  if (plainResolutionName in NmorphAudioResolution) result = NmorphIconAudio;
  if (plainResolutionName in NmorphVideoResolution) result = NmorphIconVideo;
  if (plainResolutionName in NmorphArchiveResolution) result = NmorphIconArchive;
  return result;
};

let files = reactive<INmorphCustomFileData[]>(props.modelValue);

const inputDOMRef = ref<NmorphDomElementType>(null);

const openFileSelector = () => {
  if (inputDOMRef.value) {
    inputDOMRef.value.click();
  }
};

const handleFileUpload = (event: Event) => {
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
  emit(
    'update:model-value',
    files.map((file) => file.data)
  );
};

const removeFile = (fileName: string) => {
  const index = files.findIndex((file) => file.data.name === fileName);
  if (index !== -1) {
    URL.revokeObjectURL(files[index].previewUrl);
    files.splice(index, 1);
    filesChanged();
  }
};

interface INmorphEmit {
  (e: 'update:model-value', val: File[]): void;
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
        class="nmorph-native-input"
        @change="handleFileUpload"
      />
      <slot name="trigger">
        <NmorphButton :text="computedButtonText" fill @click="openFileSelector" :disabled="props.disabled" />
      </slot>
    </div>
    <div class="nmorph-file-upload__list" v-if="files.length > 0">
      <transition-group name="list" tag="div">
        <div v-for="{ data, previewUrl } in files" :key="data.name" class="nmorph-file-upload__file">
          <NmorphImagePreview :src="previewUrl" />
          <div class="nmorph-file-upload__file-info">
            <NmorphIcon :name="typeFileIconMap(data.type)" width="14px" height="17px" />
            <span class="nmorph-file-upload__file-name">{{ data.name }}</span>
          </div>
          <div class="nmorph-file-upload__remove-file">
            <NmorphButton height="thin" style-type="transparent" @click="removeFile(data.name)">
              <NmorphIcon name="error" />
            </NmorphButton>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-file-upload {
  .nmorph-file-upload__trigger {
    position: relative;
  }

  input {
    display: none;
  }

  .nmorph-file-upload__list {
    margin-top: var(--indentation-03);
  }

  .nmorph-file-upload__file {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--indentation-02);
    padding: var(--indentation-02) var(--indentation-03);
    border-radius: var(--default-border-radius);

    @include nmorph-outset;
  }

  .nmorph-file-upload__file-info {
    display: flex;
    align-items: center;
    width: 50%;
    margin-left: var(--indentation-02);
  }

  .nmorph-file-upload__file-name {
    margin-left: var(--indentation-02);
    @include ellipsis;
  }

  .nmorph-file-upload__remove-file {
    margin-left: var(--indentation-03);
  }
}
</style>
