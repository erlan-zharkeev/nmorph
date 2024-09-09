<script setup lang="ts">
import { INmorphImage } from '@/types';
import { useModifiers } from '@/utils';
import { computed, ref } from 'vue';

interface INmorphProps extends INmorphImage {
  loadingText?: string;
  loadFailedText?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  fit: 'cover',
  closeOnOutsideClick: true,
  alt: '',
  loadingText: 'Loading ...',
  loadFailedText: 'Image loading failed',
  srcSet: '',
});

const imageLoadFinished = ref(false);
const imageLoadError = ref(false);

interface INmorphEmit {
  (e: 'error', event: Event): void;
  (e: 'load', event: Event): void;
}
const emit = defineEmits<INmorphEmit>();

const onImageLoad = (e: Event) => {
  imageLoadFinished.value = true;
  imageLoadError.value = false;
  emit('load', e);
};

const onImageError = (e: Event) => {
  imageLoadFinished.value = true;
  imageLoadError.value = true;
  emit('error', e);
};

const hide = computed(() => imageLoadFinished.value && imageLoadError.value);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-image': [`${hide.value && 'hide'}`],
  })
);

const objectFit = computed(() => props.fit);
</script>

<template>
  <div :class="modifiers">
    <img :src="props.src" :alt="props.alt" :srcset="props.srcSet" @load="onImageLoad" @error="onImageError" />
    <div v-if="hide" class="nmorph-image__load-failed">
      <slot name="error">
        {{ props.loadFailedText }}
      </slot>
    </div>
    <div v-else-if="!imageLoadFinished" class="nmorph-image__loading">
      <slot name="loading"> {{ props.loadingText }} </slot>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-image {
  --width: auto;
  --height: 100%;

  width: var(--width);
  height: var(--height);
  @include flex-full-center;

  img {
    @include wh100;
    overflow: hidden;
    object-fit: v-bind(objectFit);
  }

  &--hide {
    img {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
}
</style>
