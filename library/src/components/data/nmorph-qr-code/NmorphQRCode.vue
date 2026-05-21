<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { useModifiers } from '@/utils';
import { createNmorphQRCode, type NmorphQRCodeErrorCorrectionLevel } from './qr-code';

interface INmorphProps {
  value?: string | number;
  size?: number | string;
  margin?: number;
  color?: string;
  background?: string;
  level?: NmorphQRCodeErrorCorrectionLevel;
  minVersion?: number;
  maxVersion?: number;
  title?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  value: '',
  size: 160,
  margin: 4,
  color: 'var(--nmorph-text-color)',
  background: 'var(--nmorph-main-color)',
  level: 'medium',
  minVersion: 1,
  maxVersion: 40,
  title: '',
});

const errorMessage = computed(() => {
  try {
    createNmorphQRCode(String(props.value), {
      errorCorrectionLevel: props.level,
      minVersion: props.minVersion,
      maxVersion: props.maxVersion,
    });
    return '';
  } catch (error) {
    return error instanceof Error ? error.message : 'Unable to create QR code.';
  }
});

const qrCode = computed(() => {
  if (errorMessage.value) return null;
  return createNmorphQRCode(String(props.value), {
    errorCorrectionLevel: props.level,
    minVersion: props.minVersion,
    maxVersion: props.maxVersion,
  });
});

const viewBoxSize = computed(() => (qrCode.value ? qrCode.value.size + props.margin * 2 : 1));
const path = computed(() => {
  if (!qrCode.value) return '';
  return qrCode.value.modules
    .flatMap((row, y) =>
      row.map((isDark, x) => (isDark ? `M${x + props.margin} ${y + props.margin}h1v1h-1z` : '')).filter(Boolean)
    )
    .join('');
});

const getCssSize = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const styles = computed<CSSProperties>(() => ({
  '--nmorph-qr-code-size': getCssSize(props.size),
  '--nmorph-qr-code-color': props.color,
  '--nmorph-qr-code-background': props.background,
}));

const modifiers = computed(() =>
  useModifiers({
    'nmorph-qr-code': [`${errorMessage.value && 'error'}`],
  })
);
</script>

<template>
  <div :class="modifiers" :style="styles">
    <svg
      v-if="qrCode"
      class="nmorph-qr-code__svg"
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
      role="img"
      shape-rendering="crispEdges"
    >
      <title v-if="props.title">{{ props.title }}</title>
      <rect width="100%" height="100%" :fill="props.background" />
      <path :d="path" :fill="props.color" />
    </svg>
    <div v-else class="nmorph-qr-code__error">
      <slot name="error" :message="errorMessage">
        {{ errorMessage }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-qr-code {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: var(--nmorph-qr-code-size);
  height: var(--nmorph-qr-code-size);
  padding: var(--indentation-02);
  color: var(--nmorph-text-color);
  background: var(--nmorph-qr-code-background);
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-outset);

  .nmorph-qr-code__svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .nmorph-qr-code__error {
    box-sizing: border-box;
    max-width: 100%;
    padding: var(--indentation-02);
    overflow: hidden;
    color: var(--nmorph-error-text-color);
    font-size: var(--font-size-extra-small);
    line-height: var(--line-height-regular);
    text-align: center;
    text-overflow: ellipsis;
  }
}
</style>
