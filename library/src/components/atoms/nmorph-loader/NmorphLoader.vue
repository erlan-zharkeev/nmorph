<template>
  <div class="nmorph-loader">
    <div v-for="i in 8" :key="i" />
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';

interface IProps {
  scale?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  scale: 1,
});

const scale = computed(() => `scale(${props.scale * 0.3})`);
</script>

<style lang="scss">
.nmorph-loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: v-bind(scale);
}
.nmorph-loader div {
  animation: nmorph-loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.nmorph-loader div:after {
  content: ' ';
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text-01);
  margin: -4px 0 0 -4px;
}
.nmorph-loader div:nth-child(1) {
  animation-delay: -0.036s;
}
.nmorph-loader div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.nmorph-loader div:nth-child(2) {
  animation-delay: -0.072s;
}
.nmorph-loader div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.nmorph-loader div:nth-child(3) {
  animation-delay: -0.108s;
}
.nmorph-loader div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.nmorph-loader div:nth-child(4) {
  animation-delay: -0.144s;
}
.nmorph-loader div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.nmorph-loader div:nth-child(5) {
  animation-delay: -0.18s;
}
.nmorph-loader div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.nmorph-loader div:nth-child(6) {
  animation-delay: -0.216s;
}
.nmorph-loader div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.nmorph-loader div:nth-child(7) {
  animation-delay: -0.252s;
}
.nmorph-loader div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.nmorph-loader div:nth-child(8) {
  animation-delay: -0.288s;
}
.nmorph-loader div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes nmorph-loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
