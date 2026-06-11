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
