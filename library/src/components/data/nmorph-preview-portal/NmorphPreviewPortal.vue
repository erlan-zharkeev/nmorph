<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed } from 'vue';
import { createCssSizeVariables } from '@/utils';
import { NmorphButton, NmorphIcon, NmorphIconChevronDown, NmorphOverlay } from '@/components';

const props = withDefaults(
  defineProps<{
    show: boolean;
    zIndex?: number;
    rootClass?: string;
    stateClass?: string;
    contentClass?: string;
    leftClass?: string;
    rightClass?: string;
    actionsClass?: string;
    navigationButtonMargin?: number | string;
    showNavigation?: boolean;
    showActionBar?: boolean;
  }>(),
  {
    zIndex: undefined,
    rootClass: '',
    stateClass: '',
    contentClass: '',
    leftClass: '',
    rightClass: '',
    actionsClass: '',
    navigationButtonMargin: undefined,
    showNavigation: false,
    showActionBar: false,
  }
);

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'previous'): void;
  (e: 'next'): void;
}>();

const rootClasses = computed(() => [
  'nmorph-preview-portal',
  props.rootClass,
  props.stateClass,
  props.show && 'nmorph-preview-portal--opened',
]);
const portalStyle = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--nmorph-preview-portal-btn-margin': props.navigationButtonMargin,
  })
);
</script>

<template>
  <Teleport v-if="props.show" to="body">
    <div :class="rootClasses" :style="portalStyle">
      <NmorphOverlay
        :show="props.show"
        :z-index="props.zIndex"
        disabled-teleport
        @on-outside-click="emit('close')"
        @on-escape-keydown="emit('close')"
      >
        <div class="nmorph-preview-portal__content" :class="props.contentClass">
          <slot />
        </div>
        <div v-if="props.showNavigation" class="nmorph-preview-portal__left" :class="props.leftClass">
          <NmorphButton @click="emit('previous')">
            <NmorphIcon>
              <NmorphIconChevronDown />
            </NmorphIcon>
          </NmorphButton>
        </div>
        <div v-if="props.showNavigation" class="nmorph-preview-portal__right" :class="props.rightClass">
          <NmorphButton @click="emit('next')">
            <NmorphIcon>
              <NmorphIconChevronDown />
            </NmorphIcon>
          </NmorphButton>
        </div>
        <div v-if="props.showActionBar" class="nmorph-preview-portal__actions" :class="props.actionsClass">
          <slot name="actions" />
        </div>
      </NmorphOverlay>
    </div>
  </Teleport>
</template>

<style lang="scss">
.nmorph-preview-portal {
  display: contents;

  .nmorph-preview-portal__content {
    --nmorph-preview-portal-content-width: min(calc(100vw - 96px), 960px);
    --nmorph-preview-portal-content-height: min(calc(100vh - 180px), 720px);

    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--nmorph-preview-portal-content-width);
    height: var(--nmorph-preview-portal-content-height);
    transform: translate(-50%, -50%);
    transition: var(--transition-04) opacity ease-in-out;
    pointer-events: none;
  }

  .nmorph-preview-portal__actions {
    position: absolute;
    bottom: -50px;
    left: 50%;
    z-index: 2;
    display: flex;
    height: 0;
    transform: translateX(-50%);
    transition: ease-in-out bottom var(--transition-03);
  }

  .nmorph-button__content {
    box-shadow: none;
  }

  .nmorph-preview-portal__left,
  .nmorph-preview-portal__right {
    z-index: 2;
  }

  .nmorph-preview-portal__left {
    position: absolute;
    top: 50%;
    left: -100%;
    transform: rotate(90deg) translateX(-50%);
    transition: ease-in-out left var(--transition-03);
  }

  .nmorph-preview-portal__right {
    position: absolute;
    top: 50%;
    right: -100%;
    transform: rotate(270deg) translateX(50%);
    transition: ease-in-out right var(--transition-03);
  }

  &.nmorph-preview-portal--opened {
    .nmorph-preview-portal__actions {
      bottom: 50px;
    }

    --nmorph-preview-portal-btn-margin: 20px;

    .nmorph-preview-portal__left {
      left: var(--nmorph-preview-portal-btn-margin);
    }

    .nmorph-preview-portal__right {
      right: var(--nmorph-preview-portal-btn-margin);
    }
  }
}
</style>
