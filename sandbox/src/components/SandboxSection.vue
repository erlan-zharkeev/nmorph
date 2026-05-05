<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <section class="section">
    <h2 class="section__title">{{ title }}</h2>
    <div class="section__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section {
  display: grid;
  gap: 12px;
}

.section__title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--nmorph-text-secondary);
}

.section__body {
  display: grid;
  gap: 10px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--nmorph-border-color);
  background: var(--nmorph-card-bg);
}
</style>
