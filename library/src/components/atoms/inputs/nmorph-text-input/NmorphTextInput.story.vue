<script setup lang="ts">
import { InputHeight } from '../inputs.enums';
import NmorphTextInput from './NmorphTextInput.vue';

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
  height: 'default',
});
</script>

<template>
  <Story title="Atoms/NmorphTextInput" :setup-app="setupApp" auto-props-disabled>
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
        <HstSelect v-model="state.height" :options="Object.values(InputHeight)" title="height" />
      </template>
    </Variant>
  </Story>
</template>
