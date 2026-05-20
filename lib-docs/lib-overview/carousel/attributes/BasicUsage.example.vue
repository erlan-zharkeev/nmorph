<script setup lang="ts">
import { NmorphCarousel, NmorphCarouselItem } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <NmorphCarousel class="carousel-basic-usage-overview">
    <NmorphCarouselItem name="first">
      <div
        class="carousel-basic-usage-overview__slide carousel-basic-usage-overview__slide--first"
      >
        First slide
      </div>
    </NmorphCarouselItem>
    <NmorphCarouselItem name="second">
      <div
        class="carousel-basic-usage-overview__slide carousel-basic-usage-overview__slide--second"
      >
        Second slide
      </div>
    </NmorphCarouselItem>
    <NmorphCarouselItem name="third">
      <div
        class="carousel-basic-usage-overview__slide carousel-basic-usage-overview__slide--third"
      >
        Third slide
      </div>
    </NmorphCarouselItem>
  </NmorphCarousel>
</template>

<style lang="scss">
.carousel-basic-usage-overview {
  position: relative;
  width: 100%;
  max-width: 520px;
  height: 220px;
  overflow: hidden;
  border: 8px solid var(--nmorph-main-color);
  border-radius: 8px;
  box-shadow: var(--nmorph-shadow-outset);

  .nmorph-carousel__wrapper {
    display: flex;
    height: 100%;
  }

  .nmorph-carousel__wrapper.transition-enabled {
    transition: transform 0.4s ease;
  }

  .nmorph-carousel__item {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
  }

  .nmorph-carousel__elements-indicator {
    position: absolute;
    bottom: 14px;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .nmorph-carousel__element-indicator-wrapper {
    padding: 5px;
    cursor: pointer;
  }

  .nmorph-carousel__element-indicator {
    width: 28px;
    height: 3px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.45);
  }

  .nmorph-carousel__element-indicator--active {
    background: #fff;
  }

  .nmorph-carousel__action-btn {
    position: absolute;
    top: 50%;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.35);
    transform: translateY(-50%);
    cursor: pointer;
  }

  .nmorph-carousel__prev {
    right: 12px;
    rotate: -90deg;
  }

  .nmorph-carousel__next {
    left: 12px;
    rotate: 90deg;
  }

  .nmorph-carousel__action-btn .nmorph-icon {
    --color: #fff;
  }
}

.carousel-basic-usage-overview__slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
}

.carousel-basic-usage-overview__slide--first {
  background: linear-gradient(135deg, #2563eb, #22c55e);
}

.carousel-basic-usage-overview__slide--second {
  background: linear-gradient(135deg, #7c3aed, #f97316);
}

.carousel-basic-usage-overview__slide--third {
  background: linear-gradient(135deg, #0f766e, #eab308);
}
</style>
