<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed } from 'vue';
import { NmorphIcon } from '@/components';
import { NmorphComponentHeight } from '@/types';
import { INmorphTagItemProps } from './types';

interface INmorphProps extends INmorphTagItemProps {}

const props = withDefaults(defineProps<INmorphProps>(), {
  height: 'default',
  removable: true,
  design: 'nmorph',
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-tag-item': [`${props.design === 'nmorph' ? 'nmorph-design' : ''}`],
  })
);

interface INmorphEmit {
  (e: 'close', val: string): void;
}

const emit = defineEmits<INmorphEmit>();

const closeHandler = () => {
  emit('close', props.value);
};
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-tag-item__content">
      <span>{{ text }}</span>
      <NmorphIcon v-if="props.removable" class="nmorph-tag-item__close-icon" name="error" @click.stop="closeHandler" />
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
    margin-left: var(--indentation-02);
    cursor: pointer;
  }
}

.nmorph-tag-item--nmorph-design {
  @include nmorph-inset;

  border: none;
}

.nmorph-tag-item--thin {
  --height: var(--thin-component);

  span {
    @include body-3;
  }
}

.nmorph-tag-item--thick {
  --height: var(--thick-component);
}
</style>
