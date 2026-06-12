<script setup lang="ts">
import { generateUUID, useModifiers } from '@/utils';
import { computed, nextTick, provide, ref, watch } from 'vue';
import { NmorphIcon, INmorphCarouselInjection, NmorphIconChevronLeft, NmorphIconChevronRight } from '@/components';
import type { INmorphCarouselEmit, INmorphCarouselProps } from './types';

const currentSlide = ref(0);
const trackIndex = ref(0);
const transitionEnabled = ref(true);
const loopResetTrackIndex = ref<number | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);

const props = withDefaults(defineProps<INmorphCarouselProps>(), {
  design: 'nmorph',
  loop: true,
});

const emit = defineEmits<INmorphCarouselEmit>();

const modifiers = computed(() =>
  useModifiers({
    nmorph: [props.design === 'nmorph' ? 'shadow-outset' : ''],
    'nmorph-carousel': [props.design],
  })
);

const carouselData = ref<string[]>([]);
const carouselId = generateUUID();
const slideCount = computed(() => carouselData.value.length);
const hasLoopClones = computed(() => props.loop && slideCount.value > 1);
provide<INmorphCarouselInjection>('carousel-data', { data: carouselData, carouselId, hasLoopClones });

const getCarouselItemId = (itemName: string, clone?: 'before' | 'after') =>
  `nmorph-carousel-item-${carouselId}-${itemName}${clone ? `-${clone}` : ''}`;

const normalizeSlideIndex = (index: number) => {
  if (!slideCount.value) return 0;
  if (!props.loop) return Math.min(Math.max(index, 0), slideCount.value - 1);
  return (index + slideCount.value) % slideCount.value;
};

const getRealTrackIndex = (slideIndex: number) => (hasLoopClones.value ? slideIndex + 1 : slideIndex);

const enableTransitionAfterJump = async () => {
  await nextTick();
  void wrapperRef.value?.offsetWidth;

  const schedule =
    typeof requestAnimationFrame === 'function'
      ? requestAnimationFrame
      : (callback: FrameRequestCallback) => setTimeout(() => callback(Date.now()), 0);

  schedule(() => {
    schedule(() => {
      transitionEnabled.value = true;
    });
  });
};

const jumpToTrackIndex = (index: number) => {
  transitionEnabled.value = false;
  trackIndex.value = index;
  void enableTransitionAfterJump();
};

const goToSlide = (index: number) => {
  const nextSlide = normalizeSlideIndex(index);
  if (nextSlide === currentSlide.value) return;
  currentSlide.value = nextSlide;
  loopResetTrackIndex.value = null;
  transitionEnabled.value = true;
  trackIndex.value = getRealTrackIndex(nextSlide);
};

const moveSlide = (direction: -1 | 1) => {
  if (!slideCount.value) return;

  if (!props.loop || !hasLoopClones.value) {
    goToSlide(currentSlide.value + direction);
    return;
  }

  const previousSlide = currentSlide.value;
  const nextSlideIndex = normalizeSlideIndex(previousSlide + direction);

  if (nextSlideIndex === previousSlide) return;

  currentSlide.value = nextSlideIndex;
  transitionEnabled.value = true;

  if (direction > 0 && previousSlide === slideCount.value - 1) {
    trackIndex.value = slideCount.value + 1;
    loopResetTrackIndex.value = 1;
    return;
  }

  if (direction < 0 && previousSlide === 0) {
    trackIndex.value = 0;
    loopResetTrackIndex.value = slideCount.value;
    return;
  }

  loopResetTrackIndex.value = null;
  trackIndex.value = getRealTrackIndex(nextSlideIndex);
};

const prevSlide = () => moveSlide(-1);
const nextSlide = () => moveSlide(1);

const translateX = computed(() => {
  return `translateX(-${trackIndex.value * 100}%)`;
});

const renderedCarouselItems = computed(() => {
  const items = carouselData.value.map((itemName) => ({
    id: getCarouselItemId(itemName),
    key: itemName,
  }));

  if (!hasLoopClones.value || !items.length) return items;

  const firstItemName = carouselData.value[0];
  const lastItemName = carouselData.value[carouselData.value.length - 1];

  return [
    {
      id: getCarouselItemId(lastItemName, 'before'),
      key: `${lastItemName}-loop-before`,
    },
    ...items,
    {
      id: getCarouselItemId(firstItemName, 'after'),
      key: `${firstItemName}-loop-after`,
    },
  ];
});

const isCurrentElementActive = (idx: number) => {
  return idx === currentSlide.value;
};

const elementIndicator = (idx: number) => {
  goToSlide(idx);
};

const wrapperTransitionEndHandler = (event: TransitionEvent) => {
  if (event.target !== event.currentTarget || loopResetTrackIndex.value === null) return;

  const nextTrackIndex = loopResetTrackIndex.value;
  loopResetTrackIndex.value = null;
  jumpToTrackIndex(nextTrackIndex);
};

watch([slideCount, () => props.loop], ([count]) => {
  if (currentSlide.value > count - 1) currentSlide.value = Math.max(count - 1, 0);
  loopResetTrackIndex.value = null;
  jumpToTrackIndex(getRealTrackIndex(currentSlide.value));
});

watch(currentSlide, () => {
  emit('change', currentSlide.value);
});
</script>

<template>
  <div :class="modifiers">
    <div
      ref="wrapperRef"
      class="nmorph-carousel__wrapper"
      :class="{ 'transition-enabled': transitionEnabled }"
      :style="{ transform: translateX }"
      @transitionend="wrapperTransitionEndHandler"
    >
      <div v-for="item in renderedCarouselItems" :id="item.id" :key="item.key" class="nmorph-carousel__item" />
    </div>
    <div class="nmorph-carousel__elements-indicator">
      <div
        v-for="(_, idx) in carouselData"
        :key="idx"
        class="nmorph-carousel__element-indicator-wrapper"
        @click="elementIndicator(idx)"
      >
        <div
          class="nmorph-carousel__element-indicator"
          :class="{ 'nmorph-carousel__element-indicator--active': isCurrentElementActive(idx) }"
        />
      </div>
    </div>
    <div class="nmorph-carousel__action-btn nmorph-carousel__prev" @click="prevSlide">
      <NmorphIcon>
        <NmorphIconChevronLeft />
      </NmorphIcon>
    </div>
    <div class="nmorph-carousel__action-btn nmorph-carousel__next" @click="nextSlide">
      <NmorphIcon>
        <NmorphIconChevronRight />
      </NmorphIcon>
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
.nmorph-carousel {
  --nmorph-private-carousel-height: 500px;
  --nmorph-private-carousel-frame-border: 10px;
  --nmorph-private-carousel-action-size: 36px;
  --nmorph-private-carousel-action-offset: var(--indentation-02);

  position: relative;
  box-sizing: border-box;
  height: var(--nmorph-private-carousel-height);
  overflow: hidden;
  border-radius: var(--default-border-radius);

  .nmorph-carousel__wrapper {
    display: flex;
    height: 100%;
  }

  .transition-enabled {
    transition: transform 0.4s ease;
  }

  .nmorph-carousel__element-indicator-wrapper {
    padding: 4px;
    cursor: pointer;
  }

  .nmorph-carousel__elements-indicator {
    position: absolute;
    bottom: 16px;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .nmorph-carousel__element-indicator {
    width: 30px;
    height: 2px;
    margin-right: var(--indentation-02);
    background: var(--nmorph-gray-color);
  }

  .nmorph-carousel__element-indicator--active {
    background: var(--nmorph-white-color);
  }

  .nmorph-carousel__action-btn {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: var(--nmorph-private-carousel-action-size);
    height: var(--nmorph-private-carousel-action-size);
    padding: 0;
    background: var(--nmorph-info-color);
    border-radius: var(--default-border-radius);
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
      background: var(--nmorph-info-color);
    }

    .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-white-color);
    }
  }

  .nmorph-carousel__prev {
    left: var(--nmorph-private-carousel-action-offset);
  }

  .nmorph-carousel__next {
    right: var(--nmorph-private-carousel-action-offset);
  }

  .nmorph-carousel__item {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
  }
}

.nmorph-carousel--nmorph {
  background: var(--nmorph-main-color);
  border: var(--nmorph-private-carousel-frame-border) solid var(--nmorph-main-color);
}

.nmorph-carousel--plain {
  background: var(--nmorph-main-color);
  border: var(--nmorph-plain-border);
  box-shadow: none;

  .nmorph-carousel__action-btn {
    color: var(--nmorph-text-color);
    background: var(--nmorph-main-color);
    border: var(--nmorph-plain-border);
    box-shadow: none;

    .nmorph-icon {
      --nmorph-private-icon-color: currentColor;
    }

    &:hover {
      color: var(--nmorph-accent-color);
      background: var(--nmorph-main-color);
      border-color: var(--nmorph-accent-color);
    }
  }
}
</style>
