<script setup lang="ts">
import { createCssVariables, useModifiers } from '@/utils';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { NmorphIcon, NmorphIconError } from '@/components';
import { NmorphComponentThickness, type NmorphCSSProperties } from '@/types';
import type { INmorphTagItemComponentProps, INmorphTagItemEmit, INmorphTagItemSlots } from './types';

const DEFAULT_PLAIN_BACKGROUND_COLOR = 'var(--nmorph-gray-color)';
const DARK_CONTRAST_COLOR = 'var(--nmorph-black-color)';
const LIGHT_CONTRAST_COLOR = 'var(--nmorph-white-color)';
const DEFAULT_RGB_COLOR = { r: 201, g: 210, b: 222 };

const props = withDefaults(defineProps<INmorphTagItemComponentProps>(), {
  text: '',
  thickness: 'basic',
  removable: true,
  design: 'nmorph',
  color: DEFAULT_PLAIN_BACKGROUND_COLOR,
});

defineSlots<INmorphTagItemSlots>();

const tagRef = ref<HTMLElement | null>(null);
const plainContentColor = ref(DARK_CONTRAST_COLOR);
let themeObserver: MutationObserver | null = null;

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentThickness[props.thickness]],
    'nmorph-tag-item': [props.design],
  })
);

const isPlainDesign = computed(() => props.design === 'plain');
const closeIconColor = computed(() =>
  isPlainDesign.value ? plainContentColor.value : 'var(--nmorph-contrast-text-color)'
);

const styles = computed<NmorphCSSProperties>(() => {
  if (!isPlainDesign.value) return {};

  return createCssVariables({
    '--nmorph-private-tag-item-background-color': props.color,
    '--nmorph-private-tag-item-content-color': plainContentColor.value,
  });
});

const emit = defineEmits<INmorphTagItemEmit>();

const closeHandler = () => {
  emit('close', props.value);
};

const clickHandler = () => {
  emit('click', props.value);
};

const parseHexColor = (value: string) => {
  const raw = value.trim().replace('#', '');

  if (![3, 4, 6, 8].includes(raw.length)) return null;

  const normalized =
    raw.length <= 4
      ? raw
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : raw;

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
};

const parseRgbColor = (value: string) => {
  const match = value.match(/^rgba?\((.+)\)$/);

  if (!match) return null;

  const channelPart = match[1].split('/')[0];
  const channels = channelPart.includes(',') ? channelPart.split(',') : channelPart.trim().split(/\s+/);
  const [r, g, b] = channels.map((channel) => Number.parseFloat(channel));

  if ([r, g, b].some((channel) => Number.isNaN(channel))) return null;

  return { r, g, b };
};

const resolveCssVariable = (value: string, element: HTMLElement) => {
  const variableMatch = value.trim().match(/^var\(\s*(--[A-Za-z0-9-_]+)(?:\s*,\s*(.+))?\)$/);

  if (!variableMatch) return value;

  const [, variableName, fallback] = variableMatch;
  const ownerDocument = element.ownerDocument;
  const elementValue = getComputedStyle(element).getPropertyValue(variableName).trim();
  const rootValue = getComputedStyle(ownerDocument.documentElement).getPropertyValue(variableName).trim();

  return elementValue || rootValue || fallback || value;
};

const resolveColor = (value: string, element: HTMLElement) => {
  let resolvedValue = value;

  for (let i = 0; i < 4; i += 1) {
    const nextValue = resolveCssVariable(resolvedValue, element);

    if (nextValue === resolvedValue) break;
    resolvedValue = nextValue;
  }

  return parseHexColor(resolvedValue) || parseRgbColor(resolvedValue) || DEFAULT_RGB_COLOR;
};

const getLuminance = ({ r, g, b }: typeof DEFAULT_RGB_COLOR) => {
  const [red, green, blue] = [r, g, b].map((channel) => {
    const normalizedChannel = channel / 255;

    return normalizedChannel <= 0.03928 ? normalizedChannel / 12.92 : ((normalizedChannel + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const getContrastRatio = (firstLuminance: number, secondLuminance: number) => {
  const [lighter, darker] = [firstLuminance, secondLuminance].sort((a, b) => b - a);

  return (lighter + 0.05) / (darker + 0.05);
};

const getReadableContentColor = (backgroundColor: typeof DEFAULT_RGB_COLOR) => {
  const backgroundLuminance = getLuminance(backgroundColor);
  const whiteContrast = getContrastRatio(backgroundLuminance, 1);
  const blackContrast = getContrastRatio(backgroundLuminance, 0);

  return whiteContrast > blackContrast ? LIGHT_CONTRAST_COLOR : DARK_CONTRAST_COLOR;
};

const updatePlainContentColor = async () => {
  await nextTick();
  if (!isPlainDesign.value || !tagRef.value) return;

  plainContentColor.value = getReadableContentColor(resolveColor(props.color, tagRef.value));
};

onMounted(() => {
  updatePlainContentColor();

  if (typeof MutationObserver === 'undefined' || !tagRef.value) return;

  themeObserver = new MutationObserver(() => updatePlainContentColor());
  themeObserver.observe(tagRef.value.ownerDocument.documentElement, {
    attributes: true,
    attributeFilter: ['nmorph-data-theme', 'class', 'style'],
  });
});

onBeforeUnmount(() => {
  themeObserver?.disconnect();
});

watch(() => [props.color, props.design], updatePlainContentColor, { flush: 'post' });
</script>

<template>
  <div ref="tagRef" :class="modifiers" :style="styles" @click="clickHandler">
    <div class="nmorph-tag-item__content">
      <slot v-if="$slots.default" />
      <span v-else>{{ text }}</span>
      <NmorphIcon
        v-if="props.removable"
        class="nmorph-tag-item__close-icon"
        :color="closeIconColor"
        @click.stop="closeHandler"
      >
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
  color: var(--nmorph-text-color);
  border-radius: var(--default-border-radius);
  cursor: default;

  .nmorph-tag-item__content {
    display: flex;
    gap: 4px;
    align-items: center;
    height: 100%;
    color: inherit;
  }

  span {
    display: inline-block;
    color: inherit;
    transform: translateY(var(--nmorph-private-control-text-offset-y));
  }

  .nmorph-tag-item__close-icon {
    cursor: pointer;

    --nmorph-private-icon-color: currentColor;
  }

  &.nmorph-tag-item--nmorph {
    background: var(--nmorph-main-color);
    border: none;
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  &.nmorph-tag-item--plain {
    color: var(--nmorph-private-tag-item-content-color);
    background: var(--nmorph-private-tag-item-background-color);
    border: none;
    box-shadow: none;
  }
}
</style>
