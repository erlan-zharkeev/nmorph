<script setup lang="ts">
import { getModifiers } from '@/utils';
import { computed, ref } from 'vue';

enum ImageFit {
  fill = 'fill',
  contain = 'contain',
  cover = 'cover',
  none = 'none',
  'scale-down' = 'scale-down',
}

interface IProps {
  src: string;
  fit?: keyof typeof ImageFit;
  alt?: string;
  loadingText?: string;
  loadFailedText?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  fit: 'cover',
  closeOnOutsideClick: true,
  alt: '',
  loadingText: 'Loading ...',
  loadFailedText: 'Image loading failed',
});

const imageLoadFinished = ref(false);
const imageLoadError = ref(false);

const onImageLoad = () => {
  imageLoadFinished.value = true;
};
const onImageError = () => {
  imageLoadFinished.value = true;
  imageLoadError.value = true;
};

const modifiers = computed(() =>
  getModifiers({
    'nmorph-image': [],
  })
);

const objectFit = computed(() => props.fit);
</script>

<template>
  <div :class="modifiers">
    <img :src="props.src" :alt="props.alt" @load="onImageLoad" @error="onImageError" />
    <div v-if="!imageLoadFinished" class="nmorph-image__loading">
      <slot name="loading"> {{ props.loadingText }} </slot>
    </div>
    <div v-if="imageLoadFinished && imageLoadError" class="nmorph-image__load-failed">
      <slot name="error">
        {{ props.loadFailedText }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-image {
  @include wh100;
  --width: auto;
  --height: auto;

  width: var(--width);
  height: var(--height);

  img {
    @include wh100;
    object-fit: v-bind(objectFit);
  }
}
</style>
