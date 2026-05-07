<script setup lang="ts">
import { computed, ref, type Component } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphImage, NmorphImagePreview, NmorphIcon, NmorphIconAvatar } from '@/components';
import { INmorphImage, AvatarShapeType } from '@/types';
import { styled, css } from '@vue-styled-components/core';
import { nmorphCombined } from '@/utils';

interface INmorphProps extends Omit<INmorphImage, 'src'> {
  src?: string | string[];
  size?: number;
  shape?: keyof typeof AvatarShapeType;
  frameBorder?: number;
  imagePadding?: number;
  name?: string;
  fallback?: Component;
  preview?: boolean;
  previewSrc?: string | string[];
  previewInitialIndex?: number;
  previewScaleStep?: number;
  previewMinScaleLevel?: number;
  previewMaxScaleLevel?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  size: 48,
  shape: 'circle',
  frameBorder: 2,
  imagePadding: 4,
  name: '',
  fallback: () => NmorphIconAvatar,
  preview: false,
  previewSrc: undefined,
  previewInitialIndex: 0,
  previewScaleStep: 0.2,
  previewMinScaleLevel: 0.2,
  previewMaxScaleLevel: 4,
});

interface INmorphStyledProps {
  size: string;
  imagePadding: string;
  radius: string;
  frameBorder: number;
}

interface INmorphEmit {
  (e: 'error', event: Event): void;
  (e: 'load', event: Event): void;
}

const emit = defineEmits<INmorphEmit>();

const onImageError = (e: Event) => {
  emit('error', e);
};

const onImageLoad = (e: Event) => {
  emit('load', e);
};

const previewOpen = ref(false);

const getSourceByIndex = (source: string | string[] | undefined, index = 0) => {
  if (Array.isArray(source)) return source[index];
  return source;
};

const imagePadding = computed(() => `${props.imagePadding}px`);
const size = computed(() => ` ${props.size}px`);
const imageSrc = computed(() => getSourceByIndex(props.src));
const previewSource = computed(() => props.previewSrc || props.src);
const hasPreviewSource = computed(() => {
  const source = previewSource.value;
  if (Array.isArray(source)) return source.length > 0;
  return !!source;
});
const imagePreviewSrc = computed<string | string[]>(() => {
  const source = previewSource.value;
  if (Array.isArray(source)) return source;
  return source || '';
});
const previewAvailable = computed(() => props.preview && hasPreviewSource.value);
const modifiers = computed(() =>
  useModifiers({
    nmorph: [`${props.frameBorder > 0 && 'shadow-combined'}`],
    'nmorph-avatar': [props.shape, `${previewAvailable.value && 'preview'}`],
  })
);
const stubIconSize = computed(() => `${(props.size / 100) * 60}px`);
const initialsFontSize = computed(() => `${Math.max(12, props.size * 0.38)}px`);
const radius = computed(() => (props.shape === 'circle' ? '50%' : '4px'));
const fallback = computed(() => props.fallback || NmorphIconAvatar);
const initials = computed(() => {
  const name = props.name.trim();
  if (!name) return '';

  const parts = name.split(/\s+/);
  const value = parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : parts[0].slice(0, 2);

  return value.toUpperCase();
});

const openPreview = () => {
  if (previewAvailable.value) previewOpen.value = true;
};

const commonCSS = css`
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &.nmorph-avatar--circle {
    border-radius: var(--border-radius-circular);
  }

  &.nmorph-avatar--square {
    border-radius: var(--default-border-radius);
  }

  > .nmorph-image {
    position: absolute;
  }

  .nmorph-avatar__initials {
    color: var(--nmorph-accent-color);
    font-weight: 600;
    line-height: 1;
  }

  &.nmorph-avatar--preview {
    cursor: pointer;
  }

  .nmorph-avatar__preview {
    position: absolute;
    width: 0;
    height: 0;
    overflow: visible;
  }

  .nmorph-avatar__preview .nmorph-image-preview__trigger {
    display: none;
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}
  > .nmorph-image {
    --width: ${(props: INmorphStyledProps) => props.size};
    --height: ${(props: INmorphStyledProps) => props.size};

    padding: ${(props: INmorphStyledProps) => props.imagePadding};
    border-radius: ${(props: INmorphStyledProps) => props.radius};
  }

  &.nmorph--shadow-combined {
    ${(props: INmorphStyledProps) => nmorphCombined(Number(props.frameBorder), true)};
  }

  > .nmorph-image > img {
    border-radius: ${(props: INmorphStyledProps) => props.radius};
  }
`;
</script>

<template>
  <StyledComponent
    :class="modifiers"
    :style="{ width: size, height: size }"
    :props="{ size, imagePadding, radius, frameBorder }"
    @click="openPreview"
  >
    <NmorphImage
      :fit="props.fit"
      :src="imageSrc"
      :src-set="props.srcSet"
      :alt="props.alt"
      :frame-border="0"
      @load="onImageLoad"
      @error="onImageError"
    >
      <template #error>
        <slot name="error">
          <span v-if="initials" class="nmorph-avatar__initials" :style="{ fontSize: initialsFontSize }">
            {{ initials }}
          </span>
          <NmorphIcon v-else :width="stubIconSize">
            <component :is="fallback" />
          </NmorphIcon>
        </slot>
      </template>
    </NmorphImage>
    <slot v-if="!imageSrc" name="error">
      <span v-if="initials" class="nmorph-avatar__initials" :style="{ fontSize: initialsFontSize }">
        {{ initials }}
      </span>
      <NmorphIcon v-else :width="stubIconSize">
        <component :is="fallback" />
      </NmorphIcon>
    </slot>
    <NmorphImagePreview
      v-if="previewAvailable"
      class="nmorph-avatar__preview"
      :model-value="previewOpen"
      :src="imagePreviewSrc"
      :alt="props.alt"
      :initial-index="props.previewInitialIndex"
      :scale-step="props.previewScaleStep"
      :min-scale-level="props.previewMinScaleLevel"
      :max-scale-level="props.previewMaxScaleLevel"
      @update:model-value="previewOpen = $event"
    />
  </StyledComponent>
</template>
