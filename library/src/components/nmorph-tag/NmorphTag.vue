<script setup lang="ts">
import { ControlComponentHeight } from '@/types/common.enums';
import { createModifiers } from '@/utils';
import { computed } from 'vue';
import { NmorphIcon } from '@/components';

interface IProps {
  value: string;
  text: string;
  removable?: boolean;
  height?: keyof typeof ControlComponentHeight;
  transparent?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  height: 'default',
  removable: true,
  transparent: false,
});

const modifiers = computed(() => createModifiers('nmorph-tag', [props.height, props.transparent ? 'transparent' : '']));

interface IEmit {
  (e: 'close', value: string): void;
}

const emit = defineEmits<IEmit>();

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
  --height: var(--default-thickness-component);
  height: var(--height);
  cursor: default;
  display: inline-flex;
  padding: 0 8px;
  border-radius: var(--default-border-radius);
  margin-right: 4px;
  @include nmorph-inset;

  .nmorph-tag__content {
    height: 100%;
    display: flex;
    align-items: center;
  }

  span {
    @include body-1(var(--text-01));
  }

  .nmorph-tag__close-icon {
    margin-left: 4px;
    cursor: pointer;
  }
}

.nmorph-tag--thin {
  --height: var(--thin-components);
  span {
    @include caption-1(var(--text-01));
  }
}

.nmorph-tag--thick {
  --height: var(--thick-component);
  span {
    @include body-2(var(--text-01));
  }
}

.nmorph-tag--transparent {
  box-shadow: none;
  background: transparent;
}
</style>
