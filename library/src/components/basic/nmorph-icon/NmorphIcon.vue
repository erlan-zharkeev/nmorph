<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphIconsMap, NmorphIconSize } from '@/components';
import { NmorphIconList } from '@/types/common';

interface INmorphProps {
  name?: keyof typeof NmorphIconList;
  size?: keyof typeof NmorphIconSize;
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  name: undefined,
  size: 'small',
  width: undefined,
  height: undefined,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-icon': [
      `${!props.width && !props.height && props.size}`,
      `${props.width && 'custom-width'}`,
      `${props.height && 'custom-height'}`,
    ],
  })
);
const iconDimension = computed(() => {
  return { width: props.width, height: props.height };
});
</script>

<template>
  <div :class="modifiers">
    <div v-if="props.name" class="nmorph-icon__content">
      <component :is="NmorphIconsMap[props.name as keyof typeof NmorphIconList]" />
    </div>
    <slot v-else />
  </div>
</template>

<style lang="scss">
.nmorph-icon {
  --color: var(--text-color-01);

  width: var(--width);
  height: var(--height);
  min-width: var(--width);
  min-height: var(--height);
  display: flex;
  align-items: center;

  .nmorph-icon__content {
    @include flex-full-center;
  }

  svg {
    @include wh100;

    fill: var(--color);
  }

  .nmorph-icon__as-image {
    display: flex;
  }

  .nmorph-icon__as-image img {
    width: var(--width);
    height: var(--height);
  }
}

.nmorph-icon--small {
  --width: 14px;
  --height: 14px;
}

.nmorph-icon--medium {
  --width: 20px;
  --height: 20px;
}

.nmorph-icon--large {
  --width: 32px;
  --height: 32px;
}

.nmorph-icon--custom-width {
  --width: v-bind(iconDimension.width);
}

.nmorph-icon--custom-height {
  --height: v-bind(iconDimension.height);
}
</style>
