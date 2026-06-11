<script setup lang="ts">
import { generateUUID, useModifiers } from '@/utils';
import { computed, provide, ref, watch } from 'vue';
import { NmorphIcon, INmorphCarouselInjection, NmorphIconChevronLeft, NmorphIconChevronRight } from '@/components';
import type { INmorphCarouselEmit, INmorphCarouselProps } from './types';

const currentSlide = ref(0);

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
provide<INmorphCarouselInjection>('carousel-data', { data: carouselData, carouselId });

const slideCount = computed(() => carouselData.value.length);

const normalizeSlideIndex = (index: number) => {
  if (!slideCount.value) return 0;
  if (!props.loop) return Math.min(Math.max(index, 0), slideCount.value - 1);
  return (index + slideCount.value) % slideCount.value;
};

const goToSlide = (index: number) => {
  const nextSlide = normalizeSlideIndex(index);
  if (nextSlide === currentSlide.value) return;
  currentSlide.value = nextSlide;
};

const prevSlide = () => goToSlide(currentSlide.value - 1);
const nextSlide = () => goToSlide(currentSlide.value + 1);

const translateX = computed(() => {
  return `translateX(-${currentSlide.value * 100}%)`;
});

const isCurrentElementActive = (idx: number) => {
  return idx === currentSlide.value;
};

const elementIndicator = (idx: number) => {
  goToSlide(idx);
};

watch(slideCount, (count) => {
  if (currentSlide.value > count - 1) currentSlide.value = Math.max(count - 1, 0);
});

watch(currentSlide, () => {
  emit('change', currentSlide.value);
});
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-carousel__wrapper transition-enabled" :style="{ transform: translateX }">
      <div
        v-for="itemName in carouselData"
        :id="`nmorph-carousel-item-${carouselId}-${itemName}`"
        :key="itemName"
        class="nmorph-carousel__item"
      />
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
    <div class="nmorph-carousel__action-btn nmorph-carousel__prev" @click="nextSlide">
      <NmorphIcon>
        <NmorphIconChevronRight />
      </NmorphIcon>
    </div>
    <div class="nmorph-carousel__action-btn nmorph-carousel__next" @click="prevSlide">
      <NmorphIcon>
        <NmorphIconChevronLeft />
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
    right: var(--nmorph-private-carousel-action-offset);
  }

  .nmorph-carousel__next {
    left: var(--nmorph-private-carousel-action-offset);
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
