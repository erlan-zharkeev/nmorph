<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphImage, NmorphIcon } from '@/components';
import { INmorphImage, AvatarShapeType } from '@/types';
// import { styled } from '@vue-styled-components/core'

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
const frameBorder = computed(() => `${props.frameBorder}px`);

// const StyledComponent = styled.div`
//   position: relative;
//   overflow: hidden;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   .nmorph-avatar--circle {
//     border-radius: var(--border-radius-circular);
//   }

//   .nmorph-avatar--square {
//     border-radius: var(--default-border-radius);
//   }
// `;

</script>

<template>
  <div :class="modifiers" :style="{ width: size, height: size }">
    <NmorphImage :fit="props.fit" :src="props.src" :src-set="props.srcSet" :alt="props.alt" :frame-border="0"
      @load="onImageLoad" @error="onImageError">
      <template #error>
        <NmorphIcon name="avatar" :width="stubIconSize" />
      </template>
    </NmorphImage>
  </div>

</template>

<style lang="scss" scoped>
.nmorph--shadow-combined {
  @include nmorph-combined(v-bind(frameBorder), true);
}

.nmorph-image {
  --width: v-bind(size);
  --height: v-bind(size);

  position: absolute;

  padding: v-bind(imagePadding);
  border-radius: v-bind(radius);

  img {
    border-radius: v-bind(radius);
  }
}
</style>
