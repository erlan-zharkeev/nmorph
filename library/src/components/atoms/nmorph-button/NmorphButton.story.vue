<script setup lang="ts">
import NmorphButton from './NmorphButton.vue';
import { NmorphButtonStyle, NmorphButtonType } from './NmorphButton.enums';

const setupApp = ({ app }) => {
  app.use();
};

const initState = () => ({
  type: NmorphButtonType.button,
  styleType: NmorphButtonStyle.default,
  width: '250px',
  fill: false,
  text: 'Click',
  disabled: false,
  loading: false,
});
</script>

<template>
  <Story title="Atoms/NmorphButton" :setup-app="setupApp" auto-props-disabled>
    <Variant :init-state="initState">
      <template #default="{ state }">
        <div class="button-story">
          <NmorphButton
            :type="state.type"
            :width="state.width"
            :fill="state.fill"
            :text="state.text"
            :disabled="state.disabled"
            :loading="state.loading"
            :style-type="state.styleType"
          />
        </div>
      </template>
      <template #controls="{ state }">
        <HstSelect v-model="state.type" :options="Object.values(NmorphButtonType)" title="type button" />
        <HstSelect v-model="state.styleType" :options="Object.values(NmorphButtonStyle)" title="style type" />
        <HstText v-model="state.width" title="width" />
        <HstText v-model="state.text" title="text" />
        <HstCheckbox v-model="state.fill" title="fill" />
        <HstCheckbox v-model="state.disabled" title="disabled" />
        <HstCheckbox v-model="state.loading" title="loading" />
      </template>
    </Variant>
  </Story>
</template>
