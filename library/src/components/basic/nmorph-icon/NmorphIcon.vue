<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphIconsMap, NmorphIconSize } from '@/components';
import { NmorphIconList } from '@/types';

interface INmorphProps {
  name?: keyof typeof NmorphIconList;
  size?: keyof typeof NmorphIconSize;
  width?: string;
  height?: string;
  color?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  name: undefined,
  size: 'small',
  width: undefined,
  height: undefined,
  color: 'var(--nmorph-text-color)',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-icon': [
      `${!props.width && !props.height && props.size}`,
      `${props.width ? 'custom-width' : ''}`,
      `${props.height ? 'custom-height' : ''}`,
    ],
  })
);

const customStyles = computed(() => {
  const styles: { [key: string]: string } = {};
  if (props.width) styles['--width'] = props.width;
  if (props.height) styles['--height'] = props.height;
  return styles;
});

const color = computed(() => props.color);
</script>

<template>
  <div :class="modifiers" :style="customStyles">
    <div v-if="props.name" class="nmorph-icon__content">
      <component :is="NmorphIconsMap[props.name as keyof typeof NmorphIconList]" />
    </div>
    <slot v-else />
  </div>
</template>

<style lang="scss">
.nmorph-icon {
  --color: v-bind(color);

  display: flex;
  align-items: center;
  width: var(--width);
  min-width: var(--width);
  height: var(--height);
  min-height: var(--height);

  .nmorph-icon__content {
    @include flex-full-center;
  }

  svg {
    @include wh100;

    fill: var(--color);
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
</style>
