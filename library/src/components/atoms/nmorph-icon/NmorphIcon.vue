<script setup lang="ts">
import { computed } from 'vue';
import { IconSize, NmorphIconList } from './NmorphIconList.enums';
import { NmorphIconsMap } from './NmorphIconsMap';

interface IIconDimensions {
  width: number;
  height: number;
}

interface IProps {
  name?: keyof typeof NmorphIconList | '';
  size?: keyof typeof IconSize;
  width?: number | null;
  height?: number | null;
  path?: string;
}

const IconSizeMap: Record<IconSize, IIconDimensions> = {
  [IconSize.small]: {
    width: 14,
    height: 14,
  },
  [IconSize.medium]: {
    width: 20,
    height: 20,
  },
  [IconSize.large]: {
    width: 32,
    height: 32,
  },
};

const props = withDefaults(defineProps<IProps>(), {
  name: '',
  size: IconSize.small,
  width: null,
  height: null,
  path: '',
});

const size = computed(() => {
  return {
    width: `${props.width ?? IconSizeMap[props.size as IconSize].width}px`,
    height: `${props.height ?? IconSizeMap[props.size as IconSize].height}px`,
  };
});
</script>

<template>
  <div
    class="nmorph-icon"
    :style="{
      width: size.width,
      height: size.height,
    }"
  >
    <div v-if="props.name" class="nmorph-icon__content">
      <component :is="NmorphIconsMap[props.name as keyof typeof NmorphIconList]" />
    </div>
    <div v-else-if="props.path" class="nmorph-icon__as-image">
      <img
        :src="props.path"
        :style="{
          width: size.width,
          height: size.height,
        }"
      />
    </div>
    <slot v-else />
  </div>
</template>

<style lang="scss">
.nmorph-icon {
  --color: var(--text-01);
}
.nmorph-icon svg {
  width: 100%;
  height: 100%;
  fill: var(--color);
}
.nmorph-icon__content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
