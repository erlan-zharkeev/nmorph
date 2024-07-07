<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphOverlay, NmorphIcon, NmorphButton } from '@/components';

interface INmorphProps {
  modelValue?: boolean;
  title?: string;
}
const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: false,
  title: '',
});

interface INmorphEmit {
  (e: 'on-close'): void;
  (e: 'update:modelValue', value: boolean): void;
}
const emit = defineEmits<INmorphEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-dialog': [],
  })
);

const closeHandler = () => {
  emit('on-close');
  emit('update:modelValue', !props.modelValue);
};
</script>

<template>
  <NmorphOverlay :show="props.modelValue" @on-outside-click="closeHandler">
    <div :class="modifiers">
      <div class="nmorph-dialog__header">
        <slot name="header">
          <div class="nmorph-dialog__title">{{ props.title }}</div>
          <div class="nmorph-dialog__close-icon" @click="closeHandler">
            <NmorphButton>
              <NmorphIcon name="cross" />
            </NmorphButton>
          </div>
        </slot>
      </div>
      <div class="nmorph-dialog__content">
        <slot />
      </div>
    </div>
  </NmorphOverlay>
</template>

<style lang="scss">
.nmorph-dialog {
  --width: 500px;

  width: var(--width);
  padding: var(--indentation-04);
  border-radius: var(--default-border-radius);

  @include nmorph-outset;
  @include absolute-center;

  .nmorph-dialog__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;

    @include title-2;
  }
}
</style>
