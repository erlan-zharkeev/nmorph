<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { NmorphIcon, NmorphIconDownload, NmorphIconLoader, NmorphIconOpen, NmorphIconVideo } from '@/components';
import { createCssSizeVariables, useModifiers } from '@/utils';
import type { INmorphVideoPreviewEmit, INmorphVideoPreviewProps } from './types';

const props = withDefaults(defineProps<INmorphVideoPreviewProps>(), {
  poster: '',
  name: '',
  width: undefined,
  height: undefined,
  durationMs: undefined,
  compact: false,
  controls: true,
  muted: false,
  playsinline: true,
  preload: 'metadata',
  fit: 'cover',
  downloadHref: '',
  loading: false,
  error: false,
  errorText: '',
  showDefaultActions: true,
});

const emit = defineEmits<INmorphVideoPreviewEmit>();
const slots = useSlots();

const formatDuration = (durationMs?: number) => {
  if (!durationMs || durationMs < 0) return '';

  const totalSeconds = Math.round(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const duration = computed(() => formatDuration(props.durationMs));
const hasActions = computed(
  () => Boolean(slots.actions) || (props.showDefaultActions && (props.src || props.downloadHref))
);
const modifiers = computed(() =>
  useModifiers({
    'nmorph-video-preview': [props.compact && 'compact', props.fit, props.loading && 'loading', props.error && 'error'],
  })
);
const styles = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--nmorph-video-preview-width': props.width,
    '--nmorph-video-preview-height': props.height,
  })
);

const openHandler = () => emit('open');
const downloadHandler = () => emit('download');
</script>

<template>
  <div :class="modifiers" :style="styles">
    <video
      v-if="!props.loading && !props.error"
      class="nmorph-video-preview__media"
      :src="props.src"
      :poster="props.poster || undefined"
      :controls="props.controls"
      :muted="props.muted"
      :playsinline="props.playsinline"
      :preload="props.preload"
      @play="emit('play', $event)"
      @pause="emit('pause', $event)"
      @error="emit('error', $event)"
    />
    <div v-else class="nmorph-video-preview__state">
      <NmorphIcon v-if="props.loading" size="large">
        <NmorphIconLoader />
      </NmorphIcon>
      <NmorphIcon v-else size="large">
        <NmorphIconVideo />
      </NmorphIcon>
      <span v-if="props.error && props.errorText" class="nmorph-video-preview__error">{{ props.errorText }}</span>
    </div>
    <div v-if="props.name || duration" class="nmorph-video-preview__meta">
      <span v-if="props.name" class="nmorph-video-preview__name">{{ props.name }}</span>
      <span v-if="duration" class="nmorph-video-preview__duration">{{ duration }}</span>
    </div>
    <div v-if="hasActions" class="nmorph-video-preview__actions">
      <slot name="actions">
        <a
          :href="props.src"
          target="_blank"
          rel="noopener noreferrer"
          class="nmorph-video-preview__action-link"
          :aria-label="`Open ${props.name || 'video'}`"
          @click="openHandler"
        >
          <NmorphIcon size="small">
            <NmorphIconOpen />
          </NmorphIcon>
        </a>
        <a
          v-if="props.downloadHref"
          :href="props.downloadHref"
          :download="props.name"
          class="nmorph-video-preview__action-link"
          :aria-label="`Download ${props.name || 'video'}`"
          @click="downloadHandler"
        >
          <NmorphIcon size="small">
            <NmorphIconDownload />
          </NmorphIcon>
        </a>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-video-preview {
  position: relative;
  display: flex;
  width: var(--nmorph-video-preview-width, 280px);
  min-width: 0;
  max-width: 100%;
  height: var(--nmorph-video-preview-height, 158px);
  overflow: hidden;
  color: var(--nmorph-white-color);
  background: color-mix(in srgb, var(--nmorph-black-color) 72%, var(--nmorph-main-color));
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-inset);

  .nmorph-video-preview__media,
  .nmorph-video-preview__state {
    width: 100%;
    height: 100%;
  }

  .nmorph-video-preview__media {
    display: block;
    object-fit: cover;
  }

  &.nmorph-video-preview--contain .nmorph-video-preview__media {
    object-fit: contain;
  }

  .nmorph-video-preview__state {
    display: flex;
    flex-direction: column;
    gap: var(--indentation-02);
    justify-content: center;
    align-items: center;
    padding: var(--indentation-03);
    text-align: center;
  }

  .nmorph-video-preview__error {
    max-width: 100%;
    overflow: hidden;
    color: var(--nmorph-error-text-color);
    font-size: var(--font-size-extra-small);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-video-preview__meta {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    gap: var(--indentation-02);
    justify-content: space-between;
    align-items: center;
    padding: 18px var(--indentation-03) var(--indentation-02);
    background: linear-gradient(transparent, color-mix(in srgb, var(--nmorph-black-color) 66%, transparent));
    pointer-events: none;
  }

  .nmorph-video-preview__name,
  .nmorph-video-preview__duration {
    min-width: 0;
    overflow: hidden;
    font-size: var(--font-size-extra-small);
    line-height: var(--line-height-regular);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-video-preview__name {
    flex: 1 1 auto;
  }

  .nmorph-video-preview__duration {
    flex: 0 0 auto;
    font-variant-numeric: tabular-nums;
  }

  .nmorph-video-preview__actions {
    position: absolute;
    top: var(--indentation-02);
    right: var(--indentation-02);
    display: flex;
    gap: var(--indentation-01);
    padding: 2px;
    background: color-mix(in srgb, var(--nmorph-main-color) 86%, transparent);
    border-radius: var(--default-border-radius);
  }

  .nmorph-video-preview__action-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    color: var(--nmorph-text-color);
    text-decoration: none;
    border-radius: var(--default-border-radius);

    &:hover {
      color: var(--nmorph-accent-color);
      background: color-mix(in srgb, var(--nmorph-accent-color) 10%, transparent);
    }

    .nmorph-icon {
      --color: currentColor;
    }
  }

  &.nmorph-video-preview--compact {
    width: var(--nmorph-video-preview-width, 180px);
    height: var(--nmorph-video-preview-height, 102px);
  }

  &.nmorph-video-preview--error {
    outline: 1px solid var(--nmorph-error-color);
  }
}
</style>
