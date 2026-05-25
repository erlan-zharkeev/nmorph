<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed } from 'vue';
import { NmorphIcon, NmorphIconError } from '@/components';
import { NmorphComponentHeight } from '@/types';
import type { INmorphTagItemComponentProps, INmorphTagItemEmit } from './types';

const props = withDefaults(defineProps<INmorphTagItemComponentProps>(), {
  height: 'basic',
  removable: true,
  design: 'nmorph',
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-tag-item': [`${props.design === 'nmorph' ? 'nmorph-design' : ''}`],
  })
);

const emit = defineEmits<INmorphTagItemEmit>();

const closeHandler = () => {
  emit('close', props.value);
};
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-tag-item__content">
      <span>{{ text }}</span>
      <NmorphIcon v-if="props.removable" class="nmorph-tag-item__close-icon" @click.stop="closeHandler">
        <NmorphIconError />
      </NmorphIcon>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-tag-item {
  display: inline-flex;
  margin-right: var(--indentation-02);
  padding: var(--indentation-00) var(--indentation-03);
  border: solid 2px var(--nmorph-text-color);
  border-radius: var(--default-border-radius);
  cursor: default;

  .nmorph-tag-item__content {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .nmorph-tag-item__close-icon {
    margin-left: 4px;
    cursor: pointer;
  }

  &.nmorph-tag-item--nmorph-design {
    background: var(--nmorph-main-color);
    border: none;
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  &.nmorph-tag-item--thin {
    --height: var(--thin-component);

    span {
      font-weight: 400;
      font-size: var(--font-size-extra-small);
      line-height: var(--line-height-regular);
    }
  }

  &.nmorph-tag-item--thick {
    --height: var(--thick-component);
  }
}
</style>
