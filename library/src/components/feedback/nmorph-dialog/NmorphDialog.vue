<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { title2, useModifiers } from '@/utils';
import { NmorphOverlay, NmorphIcon, NmorphIconCross } from '@/components';
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps {
  modelValue?: boolean;
  title?: string;
  width?: string;
  openDelay?: number;
  closeDelay?: number;
  closeOnClickModal?: boolean;
  showClose?: boolean;
  zIndex?: number;
  closeOnOverlay?: boolean;
}
const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: false,
  title: '',
  width: '330px',
  openDelay: 0,
  closeDelay: 0,
  closeOnClickModal: true,
  showClose: true,
  closeOnOverlay: true,
});

interface INmorphEmit {
  (e: 'on-close'): void;
  (e: 'update:model-value', value: boolean): void;
}
const emit = defineEmits<INmorphEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-dialog': [],
  })
);

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
    emit('update:model-value', false);
  }, props.closeDelay);
};

const clickOnOverlay = () => {
  if (!props.closeOnOverlay) return;
  closeHandler();
};

const commonCSS = css`
  width: var(--width);
  padding: var(--indentation-04);
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .nmorph-dialog__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;

    ${title2()}
  }

  .nmorph-dialog__close-icon {
    cursor: pointer;
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
  --width: ${props => props.dialogWidth};
`
</script>

<template>
  <NmorphOverlay :show="isVisible" :z-index="props.zIndex" @on-outside-click="clickOnOverlay">
    <StyledComponent :class="modifiers" :props="{ dialogWidth: props.width }">
      <div class="nmorph-dialog__header">
        <slot name="header">
          <div class="nmorph-dialog__title">{{ props.title }}</div>
          <div v-if="props.showClose" class="nmorph-dialog__close-icon" @click="closeHandler">
            <NmorphIcon>
              <NmorphIconCross />
            </NmorphIcon>
          </div>
        </slot>
      </div>
      <div class="nmorph-dialog__content">
        <slot />
      </div>
    </StyledComponent>
  </NmorphOverlay>
</template>
