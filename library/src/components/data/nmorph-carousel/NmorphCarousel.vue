<script setup lang="ts">
import { generateUUID, useModifiers } from '@/utils';
import { computed, onMounted, provide, reactive, ref, watch, nextTick } from 'vue';
import { NmorphIcon, INmorphCarouselInjection } from '@/components';
import { NmorphDomElementType } from '@/types/common';

const currentSlide = ref(0);

const prevSlide = () => {
  currentSlide.value = currentSlide.value + 1;
};

const nextSlide = () => {
  currentSlide.value = currentSlide.value - 1;
};

interface INmorphProps {
  loop?: boolean;
}
const props = withDefaults(defineProps<INmorphProps>(), {
  loop: true,
});

interface INmorphEmit {
  (e: 'change', value: number): void;
}
const emit = defineEmits<INmorphEmit>();

const modifiers = computed(() =>
  useModifiers({
    'nmorph-carousel': [],
  })
);

const carouselData = ref<string[]>([]);
const carouselId = generateUUID();
provide<INmorphCarouselInjection>('carousel-data', { data: carouselData, carouselId });

const carouselWrapper = ref<NmorphDomElementType>(null);
const slidesRefs = reactive<Record<number, NmorphDomElementType>>({});

const addInitialCloneSlides = () => {
  const prevSlide = slidesRefs[Object.keys(slidesRefs).length - 1]?.cloneNode(true) as Node;
  const nextSlide = slidesRefs[0]?.cloneNode(true) as Node;
  carouselWrapper.value?.prepend(prevSlide);
  carouselWrapper.value?.append(nextSlide);
  currentSlide.value += 1;
};

const transitionEndHandler = () => {
  if (currentSlide.value === 0) {
    currentSlide.value = Object.keys(slidesRefs).length;
    transitionEnabled.value = false;
  }
  if (currentSlide.value > Object.keys(slidesRefs).length) {
    currentSlide.value = 1;
    transitionEnabled.value = false;
  }
};

onMounted(() => {
  if (props.loop && currentSlide.value === 0) {
    nextTick(() => addInitialCloneSlides());
    carouselWrapper.value?.addEventListener('transitionend', transitionEndHandler);
  }
});

watch(currentSlide, (newValue) => {
  emit('change', currentSlide.value);

  if (newValue === 1 || newValue === Object.keys(slidesRefs).length) {
    setTimeout(() => {
      transitionEnabled.value = true;
    });
  }
});

const setItemRef = (el: unknown, idx: number) => {
  const element = el as NmorphDomElementType;
  slidesRefs[idx] = element;
};

const translateX = computed(() => {
  return `translateX(-${currentSlide.value * 100}%)`;
});

const transitionEnabled = ref(true);

const isCurrentElementActive = (idx: number) => {
  return idx === currentSlide.value - 1;
};

const elementIndicator = (idx: number) => {
  currentSlide.value = idx + 1;
};
</script>

<template>
  <div :class="modifiers">
    <div
      ref="carouselWrapper"
      class="nmorph-carousel__wrapper"
      :style="{ transform: translateX }"
      :class="{ 'transition-enabled': transitionEnabled }"
    >
      <div
        v-for="(itemName, idx) in carouselData"
        :id="`nmorph-carousel-item-${carouselId}-${itemName}`"
        :key="itemName"
        :ref="(el) => setItemRef(el, idx)"
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
    <div class="nmorph-carousel__action-btn nmorph-carousel__prev" @click="prevSlide">
      <NmorphIcon name="chevron-down" />
    </div>
    <div class="nmorph-carousel__action-btn nmorph-carousel__next" @click="nextSlide">
      <NmorphIcon name="chevron-down" />
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
.nmorph-carousel {
  --height: 500px;

  overflow: hidden;
  height: var(--height);
  position: relative;
  border: 10px solid var(--main-bg-color);
  border-radius: var(--default-border-radius);
  @include nmorph-outset;

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
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 16px;
  }

  .nmorph-carousel__element-indicator {
    width: 30px;
    height: 2px;
    background: var(--info-color-02);
    margin-right: var(--indentation-02);
  }

  .nmorph-carousel__element-indicator--active {
    background: var(--text-color-00);
  }

  .nmorph-carousel__action-btn {
    position: absolute;
    background: var(--info-color-01);
    padding: var(--indentation-03);
    border-radius: var(--default-border-radius);
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
      background: var(--info-color-00);
    }

    .nmorph-icon {
      --color: var(--text-color-00);
    }
  }

  .nmorph-carousel__prev {
    right: var(--indentation-02);
    rotate: -90deg;
  }

  .nmorph-carousel__next {
    left: var(--indentation-02);
    rotate: 90deg;
  }

  .nmorph-carousel__item {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
  }
}
</style>
