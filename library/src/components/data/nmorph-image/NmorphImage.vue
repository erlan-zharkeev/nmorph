<script setup lang="ts">
import { NmorphIcon, NmorphIconLoader } from '@/components';
import { createCssSizeVariables, useModifiers } from '@/utils';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { INmorphImageEmit, INmorphImageProps } from './types';

const { t } = useI18n();

const props = withDefaults(defineProps<INmorphImageProps>(), {
  design: 'nmorph',
  fit: 'cover',
  alt: '',
  width: undefined,
  height: undefined,
  loadFailedText: '',
  srcSet: '',
  frameBorder: 2.67,
});

const computedLoadFailedText = computed(() => (props.loadFailedText ? props.loadFailedText : t('loadFailedText')));

const imageLoadFinished = ref(false);
const imageLoadError = ref(false);

const emit = defineEmits<INmorphImageEmit>();

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
const resolvedDesign = computed(() => props.design || 'nmorph');

const modifiers = computed(() =>
  useModifiers({
    nmorph: [resolvedDesign.value === 'nmorph' ? 'shadow-combined' : ''],
    'nmorph-image': [
      resolvedDesign.value,
      props.frameBorder > 0 && 'framed',
      (loadingFailed.value || !imageLoadFinished.value) && 'hide',
    ],
  })
);

const styles = computed(() => ({
  ...createCssSizeVariables({
    '--nmorph-private-image-width': props.width,
    '--nmorph-private-image-height': props.height,
  }),
  '--nmorph-private-image-fit': props.fit || 'cover',
  '--nmorph-private-image-frame-border': `${props.frameBorder}px`,
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
        <NmorphIcon size="medium">
          <NmorphIconLoader />
        </NmorphIcon>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-image {
  --nmorph-private-image-width: auto;
  --nmorph-private-image-height: 100%;
  --nmorph-private-image-radius: var(--default-border-radius);
  --nmorph-private-image-background: transparent;
  --nmorph-private-image-border: none;
  --nmorph-private-image-shadow: none;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: var(--nmorph-private-image-width);
  height: var(--nmorph-private-image-height);
  overflow: hidden;
  background: var(--nmorph-private-image-background);
  border: var(--nmorph-private-image-border);
  border-radius: var(--nmorph-private-image-radius);
  box-shadow: var(--nmorph-private-image-shadow);
}

.nmorph-image:not(.nmorph-image--plain) {
  --nmorph-private-image-background: var(--nmorph-main-color);
  --nmorph-private-image-shadow: var(--nmorph-shadow-combined);
}

.nmorph-image:not(.nmorph-image--plain).nmorph-image--framed {
  --nmorph-private-image-border: var(--nmorph-private-image-frame-border) solid var(--nmorph-main-color);
}

.nmorph-image--plain.nmorph-image--framed {
  --nmorph-private-image-background: var(--nmorph-main-color);
  --nmorph-private-image-border: var(--nmorph-plain-border);
  --nmorph-private-image-shadow: none;
}

.nmorph-image img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: var(--nmorph-private-image-fit);
}

.nmorph-image__loading,
.nmorph-image__load-failed {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1rem;
  text-align: center;
}

.nmorph-image--hide img {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
