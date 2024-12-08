<script setup lang="ts">
import { INmorphImage } from '@/types';
import { useModifiers, nmorphBorder } from '@/utils';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { styled, css } from '@vue-styled-components/core';

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
    nmorph: [`${props.frameBorder > 0 && 'shadow-combined'}`],
    'nmorph-image': [`${(loadingFailed.value || !imageLoadFinished.value) && 'hide'}`],
  })
);

const commonCSS = css`
  --width: auto;
  --height: 100%;

  width: var(--width);
  height: var(--height);

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }

  .nmorph-image__loading,
  .nmorph-image__load-failed {
    padding: 1rem;
  }

  img {
    object-fit: ${props.fit};
  }

  &.nmorph-image--hide {
    img {
      width: 0;
      height: 0;
      opacity: 0;
    }
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}

  .nmorph {
    ${nmorphBorder(Number(props => props.frameBorder))};
  }
`;
</script>

<template>
  <StyledComponent v-if="props.src" :class="modifiers" :props="{ frameBorder: props.frameBorder }">
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
  </StyledComponent>
</template>
