<script setup lang="ts">
import { NmorphComponentHeight } from '@/types';
import { useModifiers } from '@/utils';
import { computed } from 'vue';
import { NmorphIcon } from '@/components';

interface INmorphProps {
  value: string;
  text: string;
  removable?: boolean;
  height?: keyof typeof NmorphComponentHeight;
  transparent?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  height: 'default',
  removable: true,
  transparent: false,
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-tag': [`${props.transparent && 'transparent'}`],
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
    <div class="nmorph-tag__content">
      <span>{{ text }}</span>
      <NmorphIcon v-if="props.removable" class="nmorph-tag__close-icon" name="error" @click.stop="closeHandler" />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-tag {
  display: inline-flex;
  margin-right: var(--indentation-02);
  padding: var(--indentation-00) var(--indentation-03);
  border-radius: var(--default-border-radius);
  cursor: default;

  @include nmorph-inset;

  .nmorph-tag__content {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .nmorph-tag__close-icon {
    margin-left: var(--indentation-02);
    cursor: pointer;
  }
}

.nmorph-tag--thin {
  --height: var(--thin-component);

  span {
    @include body-3;
  }
}

.nmorph-tag--thick {
  --height: var(--thick-component);
}

.nmorph-tag--transparent {
  background: transparent;
  box-shadow: none;
}
</style>
