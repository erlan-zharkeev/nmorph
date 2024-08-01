<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphOverlay, NmorphIcon } from '@/components';

interface INmorphProps {
  modelValue?: boolean;
  title?: string;
  width?: string;
  openDelay?: number;
  closeDelay?: number;
  closeOnClickModal?: boolean;
  showClose?: boolean;
  zIndex?: number;
}
const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: false,
  title: '',
  width: '330px',
  openDelay: 0,
  closeDelay: 0,
  closeOnClickModal: true,
  showClose: true,
  zIndex: 999,
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

const dialogWidth = computed(() => props.width);
const zIndex = computed(() => props.zIndex);

const isVisible = ref(props.modelValue);

let openTimeout: ReturnType<typeof setTimeout> | null = null;
let closeTimeout: ReturnType<typeof setTimeout> | null = null;

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      if (closeTimeout) clearTimeout(closeTimeout);
      openTimeout = setTimeout(() => {
        isVisible.value = true;
      }, props.openDelay);
    } else {
      if (openTimeout) clearTimeout(openTimeout);
      closeTimeout = setTimeout(() => {
        isVisible.value = false;
      }, props.closeDelay);
    }
  },
  { immediate: true }
);

const closeHandler = () => {
  emit('on-close');
  if (openTimeout) clearTimeout(openTimeout);
  closeTimeout = setTimeout(() => {
    emit('update:modelValue', false);
  }, props.closeDelay);
};
</script>

<template>
  <NmorphOverlay :show="isVisible" @on-outside-click="closeHandler">
    <div :class="modifiers">
      <div class="nmorph-dialog__header">
        <slot name="header">
          <div class="nmorph-dialog__title">{{ props.title }}</div>
          <div v-if="props.showClose" class="nmorph-dialog__close-icon" @click="closeHandler">
            <NmorphIcon name="cross" />
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
  --width: v-bind(dialogWidth);

  z-index: v-bind(zIndex);
  width: var(--width);
  padding: var(--indentation-04);
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);

  @include absolute-center;

  .nmorph-dialog__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;

    @include title-2;
  }

  .nmorph-dialog__close-icon {
    cursor: pointer;
  }
}
</style>
