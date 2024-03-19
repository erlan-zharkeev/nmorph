<script setup lang="ts">
import { computed } from 'vue';
import { createModifiers } from './../../../utils';
import { ControlComponentHeight } from './../../common-component.enums';
import NmorphIcon from './../nmorph-icon/NmorphIcon.vue';

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
  --height: #{$default-input-height};
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
  --height: #{$thin-input-height};
  span {
    @include caption-1(var(--text-01));
  }
}

.nmorph-tag--thick {
  --height: #{$thick-input-height};
  span {
    @include body-2(var(--text-01));
  }
}

.nmorph-tag--transparent {
  box-shadow: none;
  background: transparent;
}
</style>
