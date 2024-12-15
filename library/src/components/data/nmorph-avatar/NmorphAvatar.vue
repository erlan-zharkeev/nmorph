<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphImage, NmorphIcon, NmorphIconAvatar } from '@/components';
import { INmorphImage, AvatarShapeType } from '@/types';
import { styled, css } from '@vue-styled-components/core'
import { nmorphCombined } from '@/utils';

interface INmorphProps extends INmorphImage {
  size?: number;
  shape?: keyof typeof AvatarShapeType;
  frameBorder?: number;
  imagePadding?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  size: 48,
  shape: 'circle',
  frameBorder: 2,
  imagePadding: 4,
});

interface INmorphEmit {
  (e: 'error', event: Event): void;
  (e: 'load', event: Event): void;
}

const emit = defineEmits<INmorphEmit>();

const hasError = ref(false);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [`${props.frameBorder > 0 && 'shadow-combined'}`],
    'nmorph-avatar': [props.shape],
  })
);

const onImageError = (e: Event) => {
  emit('error', e);
  hasError.value = true;
};

const onImageLoad = (e: Event) => {
  emit('load', e);
  hasError.value = false;
};

const imagePadding = computed(() => `${props.imagePadding}px`);
const size = computed(() => ` ${props.size}px`);
const stubIconSize = computed(() => `${(props.size / 100) * 60}px`);
const radius = computed(() => (props.shape === 'circle' ? '50%' : '4px'));

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

  .nmorph-image {
    position: absolute;
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
  .nmorph-image {
    --width: ${props => props.size};
    --height: ${props => props.size};

    padding: ${props => props.imagePadding};
    border-radius: ${props => props.radius};
  }

  &.nmorph--shadow-combined {
    ${nmorphCombined(Number((props) => props.frameBorder), true)};
  }

  .nmorph-image > img {
    border-radius: ${props => props.radius};
  }
`
</script>

<template>
  <StyledComponent :class="modifiers" :style="{ width: size, height: size }"
    :props="{ size, imagePadding, radius, frameBorder }">
    <NmorphImage :fit="props.fit" :src="props.src" :src-set="props.srcSet" :alt="props.alt" :frame-border="0"
      @load="onImageLoad" @error="onImageError">
      <template #error>
        <NmorphIcon :width="stubIconSize">
          <NmorphIconAvatar />
        </NmorphIcon>
      </template>
    </NmorphImage>
  </StyledComponent>
</template>
