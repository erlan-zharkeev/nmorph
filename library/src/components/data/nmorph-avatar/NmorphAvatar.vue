<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphAvatarType } from '@/components';
import { NmorphImageFit } from '@/types';

interface INmorphProps {
  size?: number;
  shape?: NmorphAvatarType;
  src?: string;
  srcSet?: string;
  alt?: string;
  fit?: keyof typeof NmorphImageFit;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  size: 40,
  shape: 'circle',
  src: '',
  srcSet: '',
  alt: '',
  fit: 'cover',
});

interface INmorphEmit {
  (e: 'error'): void;
}

const emit = defineEmits<INmorphEmit>();

const hasError = ref(false);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-avatar': [props.shape],
  })
);

const imgModifiers = computed(() =>
  useModifiers({
    'nmorph-avatar__image': [`${hasError.value && 'hide'}`],
  })
);

const onImageError = () => {
  emit('error');
  hasError.value = true;
};

const onImageLoad = () => {
  hasError.value = false;
};

const size = computed(() => ` ${props.size}px`);
</script>
<template>
  <div :class="modifiers">
    <img
      :src="props.src"
      :srcset="props.srcSet"
      :alt="props.alt"
      :class="imgModifiers"
      @load="onImageLoad"
      @error="onImageError"
    />
    <div v-show="hasError" class="nmorph-avatar__fallback">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-avatar {
  width: v-bind(size);
  height: v-bind(size);
  overflow: hidden;

  .nmorph-avatar__image,
  .nmorph-avatar__fallback {
    width: 100%;
    height: 100%;
  }

  img {
    @include wh100;

    object-fit: v-bind(fit);
  }

  .nmorph-avatar__image--hide {
    display: none;
    width: 0;
    height: 0;
    opacity: 0;
  }
}

.nmorph-avatar--circle {
  border-radius: var(--border-radius-circular);
}

.nmorph-avatar--square {
  border-radius: var(--default-border-radius);
}
</style>
