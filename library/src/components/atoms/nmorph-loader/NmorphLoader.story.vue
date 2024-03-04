<script setup lang="ts">
import NmorphLoader from './NmorphLoader.vue';

const setupApp = ({ app }) => {
  app.use();
};

const initState = () => ({
  scale: 1,
});
</script>

<template>
  <Story title="Atoms/NmorphLoader" :setup-app="setupApp" auto-props-disabled>
    <Variant :init-state="initState">
      <template #default="{ state }">
        <div class="loader-story">
          <NmorphLoader :scale="state.scale" />
        </div>
      </template>
      <template #controls="{ state }">
        <HstSlider v-model="state.scale" title="scale" :min="0.5" :max="10" :step="0.1" />
      </template>
    </Variant>
  </Story>
</template>
