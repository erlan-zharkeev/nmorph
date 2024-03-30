<template>
  <div class="carousel">
    <button @click="prevSlide">Предыдущий</button>
    <div class="slides-container" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="(slide, index) in slides" :key="index" class="slide">
        <img :src="slide" :alt="'Слайд ' + (index + 1)" />
      </div>
    </div>
    <button @click="nextSlide">Следующий</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const slides = ref([
  'https://images.pexels.com/photos/20367774/pexels-photo-20367774.jpeg',
  'https://images.pexels.com/photos/20596245/pexels-photo-20596245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/8755970/pexels-photo-8755970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
]); // Ссылки на изображения слайдов
const currentSlide = ref(0);

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
}

function prevSlide() {
  currentSlide.value = (currentSlide.value + slides.value.length - 1) % slides.value.length;
}
</script>

<style lang="scss">
.carousel {
  overflow: hidden;
}

.slides-container {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  min-width: 100%;
}
</style>
