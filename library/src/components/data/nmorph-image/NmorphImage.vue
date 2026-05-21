<script setup lang="ts">
import { INmorphImage } from '@/types';
import { useModifiers } from '@/utils';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface INmorphProps extends INmorphImage {
  loadingText?: string;
  loadFailedText?: string;
  frameBorder?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  fit: 'cover',
  alt: '',
  loadingText: '',
  loadFailedText: '',
  srcSet: '',
  frameBorder: 4,
});

const computedLoadingText = computed(() => (props.loadingText ? props.loadingText : t('loadingText')));
const computedLoadFailedText = computed(() => (props.loadFailedText ? props.loadFailedText : t('loadFailedText')));

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

const loadingFailed = computed(() => imageLoadFinished.value && imageLoadError.value);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [props.frameBorder > 0 && 'shadow-combined'],
    'nmorph-image': [(loadingFailed.value || !imageLoadFinished.value) && 'hide'],
  })
);

const styles = computed(() => ({
  '--nmorph-image-fit': props.fit || 'cover',
  '--nmorph-image-frame-border': `${props.frameBorder}px`,
}));
</script>

<template>
  <div v-if="props.src" :class="modifiers" :style="styles">
    <img :src="props.src" :alt="props.alt" :srcset="props.srcSet" @load="onImageLoad" @error="onImageError" />
    <div v-if="loadingFailed" class="nmorph-image__load-failed">
      <slot name="error">
        {{ computedLoadFailedText }}
      </slot>
    </div>
    <div v-else-if="!imageLoadFinished" class="nmorph-image__loading">
      <slot name="loading">
        {{ computedLoadingText }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-image {
  --width: auto;
  --height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--width);
  height: var(--height);
}

.nmorph-image.nmorph--shadow-combined {
  border: var(--nmorph-image-frame-border) solid var(--nmorph-main-color);
}

.nmorph-image img {
  width: 100%;
  height: 100%;
  object-fit: var(--nmorph-image-fit);
}

.nmorph-image__loading,
.nmorph-image__load-failed {
  padding: 1rem;
}

.nmorph-image--hide img {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
