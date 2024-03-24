<script setup lang="ts">
import NmorphTextInput from './NmorphTextInput.vue';
import { ControlComponentHeight } from './../../../types/common.enums';

const setupApp = ({ app }) => {
  app.use();
};

const initState = () => ({
  id: 'identifier',
  placeholder: 'Placeholder text',
  label: 'Label Example',
  typePassword: false,
  disabled: false,
  modelValue: '',
  error: false,
  rules: [
    {
      pattern: '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/',
      error: 'not email',
    },
    {
      pattern: '/^.{3,}$/',
      error: 'too short',
    },
  ],
  height: 'default',
});
</script>

<template>
  <Story title="NmorphTextInput" :setup-app="setupApp" auto-props-disabled>
    <Variant :init-state="initState">
      <template #default="{ state }">
        <div class="text-input-story">
          <NmorphTextInput
            :id="state.id"
            ref="domInputRef"
            v-model="state.modelValue"
            :placeholder="state.placeholder"
            :type-password="state.typePassword"
            :error="state.error"
            :label="state.label"
            :disabled="state.disabled"
            :type="state.typePassword ? 'password' : 'text'"
            :name="state.id"
            :rules="state.rules"
            :class="{ 'nmorph-text-input--labeled': state.label }"
          />
        </div>
      </template>
      <template #controls="{ state }">
        <HstText v-model="state.modelValue" title="modelValue" />
        <HstText v-model="state.id" title="identifier/field-name" />
        <HstText v-model="state.placeholder" title="placeholder" />
        <HstText v-model="state.label" title="label" />
        <HstCheckbox v-model="state.typePassword" title="type password" />
        <HstCheckbox v-model="state.error" title="error" />
        <HstCheckbox v-model="state.disabled" title="disabled" />
        <div v-for="(option, optionIndex) in state.rules" :key="optionIndex">
          <HstText v-model="option.pattern" :title="'pattern' + (optionIndex + 1)" />
          <HstText v-model="option.error" :title="'error text' + (optionIndex + 1)" />
        </div>
        <HstSelect v-model="state.height" :options="Object.values(ControlComponentHeight)" title="height" />
      </template>
    </Variant>
  </Story>
</template>
