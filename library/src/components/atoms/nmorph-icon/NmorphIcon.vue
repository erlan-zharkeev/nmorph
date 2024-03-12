<script setup lang="ts">
import { computed } from 'vue';
import { IconName, IconSize, NmorphIconList } from './NmorphIconList.enums';
import { NmorphIconsMap } from './NmorphIconsMap';
import { createModifiers } from './../../../utils';

interface IProps {
  name?: IconName;
  size?: keyof typeof IconSize;
  width?: string;
  height?: string;
  path?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  name: '',
  size: IconSize.small,
  width: '',
  height: '',
  path: '',
});

const modifiers = computed(() =>
  createModifiers('nmorph-icon', [props.size, props.width ? 'custom-width' : '', props.height ? 'custom-height' : ''])
);
</script>

<template>
  <div :class="modifiers">
    <div v-if="props.name" class="nmorph-icon__content">
      <component :is="NmorphIconsMap[props.name as keyof typeof NmorphIconList]" />
    </div>
    <div v-else-if="props.path" class="nmorph-icon__as-image">
      <img :src="props.path" />
    </div>
    <slot v-else />
  </div>
</template>

<style lang="scss">
.nmorph-icon {
  --color: var(--text-01);
  width: var(--width);
  height: var(--height);

  .nmorph-icon__content {
    @include flex-full-center;
  }

  svg {
    @include wh100;
    fill: var(--color);
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
  --width: v-bind(props.width);
}

.nmorph-icon--custom-height {
  --height: v-bind(props.height);
}
</style>
