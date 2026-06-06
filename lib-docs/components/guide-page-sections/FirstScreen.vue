<script setup lang="ts">
import {
  NmorphButton,
  NmorphDivider,
} from "@nmorph/nmorph-ui-kit";
import { LightBg, DarkBg } from "~/assets/images";

const router = useRouter();
const localePath = useLocalePath();
</script>

<template>
  <section id="main" class="info-section main-section">
    <img
      :src="LightBg"
      class="main-section__bg main-section__bg--light"
      alt=""
      aria-hidden="true"
    />
    <img
      :src="DarkBg"
      class="main-section__bg main-section__bg--dark"
      alt=""
      aria-hidden="true"
    />
    <div class="main-section__content nmorph--shadow-inset">
      <div class="main-section__first-info">
        <h1>NMORPH</h1>
        <NmorphDivider />
        <div v-html="$t('guide-page.explained')"></div>
        <div v-html="$t('guide-page.main-content')"></div>
        <NmorphButton :text="$t('guide-page.get-started-btn')" thickness="thick" class="main-section__get-started-btn"
          @click="router.push(localePath('/guide'))" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
$image-size: 450px;

.main-section {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .main-section__bg {
    position: absolute;
    opacity: 0;
    rotate: -45deg;
    height: 150%;
    object-fit: cover;
    scale: 1.5;
    transition: opacity 0.2s ease;
  }

  :root[nmorph-data-theme='light'] & .main-section__bg--light,
  :root[nmorph-data-theme='dark'] & .main-section__bg--dark {
    opacity: 0.5;
  }

  .nmorph-divider {
    margin-bottom: 16px;
  }

  .nmorph-radio-group__content {
    flex-wrap: nowrap;
  }

  .nmorph-button {
    margin-top: 8px;
  }

  .nmorph-radio-group,
  .nmorph-radio,
  .nmorph-button {
    width: 100%;
  }

  .main-section__get-started-btn {
    margin-top: 24px;
  }

  .main-section__get-started-btn span {
    font-weight: 600;
    font-size: 18px;
  }

  .main-section__content {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 440px;
    z-index: 0;
    border-radius: 8px;
  }

  .main-section__image-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $image-size;
    height: $image-size;
  }

  .main-section__image {
    z-index: 1;
    object-fit: cover;
    scale: 0.98;
  }

  .main-section__subtitle {
    font-size: 20px;
  }

  .main-section__first-explained-content {
    margin-top: 8px;
    font-size: 20px;
  }

  .fake-btn {
    width: 80%;
    height: 80%;
    border-radius: 16px;
  }

  .main-section__image,
  .fake-btn {
    position: absolute;
  }

  .main-section__first-info {
    padding: 16px;
    border-radius: 8px;
    text-align: center;

    h1 {
      font-size: 56px;
      background: -webkit-linear-gradient(120deg, rgb(255, 0, 150) 30%, rgb(0, 204, 255));
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
    }
  }

  .color-picker {
    margin-left: 8px;
  }

  .nmorph-text-input {
    width: 100%;
  }
}

@include max-width-query(768) {
  .main-section {
    .main-section__bg {
      scale: 3;
    }
  }
}
</style>
