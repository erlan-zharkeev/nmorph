<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { createModifiers } from './../../../../utils';
import { ArchiveResolution, AudioResolution, ImageResolution, Resolution, VideoResolution } from './types';
import NmorphButton from './../../nmorph-button/NmorphButton.vue';
import NmorphIcon from './../../nmorph-icon/NmorphIcon.vue';
import { NmorphIconList } from '../../nmorph-icon/NmorphIconList.enums';

interface IProps {
  disabled?: boolean;
  multiple?: boolean;
  allowedTypes?: Resolution[];
  photoWithPreview?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  multiple: false,
  allowedTypes: () => ['jpg', 'jpeg', 'png'],
  photoWithPreview: true,
});

const getPlainType = (resolution: string) => resolution.split('/')[1];

const typeFileIconMap = (resolution: string): keyof typeof NmorphIconList => {
  const plainResolutionName = getPlainType(resolution);
  let result: keyof typeof NmorphIconList = 'doc';
  if (plainResolutionName in ImageResolution) result = 'image';
  if (plainResolutionName in AudioResolution) result = 'audio';
  if (plainResolutionName in VideoResolution) result = 'video';
  if (plainResolutionName in ArchiveResolution) result = 'archive';
  return result;
};

interface CustomFileData {
  data: File;
  previewUrl: string;
}

let files = reactive<CustomFileData[]>([]);

const fileInput = ref<HTMLElement | null>(null);

const openFileSelector = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    Array.from(target.files).forEach((file) => {
      const resolution = getPlainType(file.type) as Resolution;
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
    'on-files-changed',
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

export interface IEmit {
  (e: 'on-files-changed', val: File[]): void;
  (e: 'on-unsupported-file-type-error', val: string): void;
}

const emit = defineEmits<IEmit>();

const modifiers = computed(() => createModifiers('nmorph-file-upload', [props.disabled ? 'disabled' : '']));
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-file-upload__trigger">
      <input ref="fileInput" type="file" :multiple="props.multiple" @change="handleFileUpload" />
      <slot name="trigger">
        <NmorphButton text="select file" @click="openFileSelector" />
      </slot>
    </div>
    <div class="nmorph-file-upload__list">
      <transition-group name="list" tag="div">
        <div v-for="{ data, previewUrl } in files" :key="data.name" class="nmorph-file-upload__file">
          <!-- <img :src="previewUrl" /> -->
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
    margin-top: 8px;
  }
  .nmorph-file-upload__file {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 8px;
    border-radius: var(--default-border-radius);
    margin-bottom: 4px;
    @include nmorph-outset;
  }
  .nmorph-file-upload__file-info {
    display: flex;
    align-items: center;
  }
  .nmorph-file-upload__file-name {
    margin-left: 4px;
    line-height: 0;
  }
  .nmorph-file-upload__remove-file {
    margin-left: 8px;
  }
}
</style>
