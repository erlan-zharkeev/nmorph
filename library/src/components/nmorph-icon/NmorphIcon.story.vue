<script setup lang="ts">
import NmorphIcon from './NmorphIcon.vue';
import { IconSize } from './types';
import { NmorphIconList } from './../../types/common.enums';

const setupApp = ({ app }) => {
  app.use();
};

const initState = () => ({
  name: 'eye',
  path: '',
  size: IconSize.medium,
  width: null,
  height: null,
});
</script>

<template>
  <Story title="NmorphIcon" :setup-app="setupApp" auto-props-disabled>
    <Variant :init-state="initState">
      <template #default="{ state }">
        <div class="icon-story">
          <NmorphIcon
            :name="state.name"
            :path="state.path"
            :size="state.size"
            :width="state.width"
            :height="state.height"
          />
        </div>
      </template>
      <template #controls="{ state }">
        <HstSelect v-model="state.name" :options="Object.keys(NmorphIconList)" title="icon name" />
        <HstText v-model="state.path" title="image path" />
        <HstSelect v-model="state.size" :options="Object.keys(IconSize)" title="icon size" />
        <HstNumber v-model="state.width" title="width" />
        <HstNumber v-model="state.height" title="height" />
      </template>
    </Variant>
  </Story>
</template>
