<script setup lang="ts">
import { ref } from 'vue'
import {
  NmorphTextInput,
  NmorphSelectButton,
  NmorphSelectButtonItem,
  NmorphOTPInput,
  NmorphColorPicker,
  NmorphCheckbox,
  NmorphSwitch,
  NmorphSlider,
  NmorphFileUpload,
  NmorphForm,
  NmorphFormItem,
} from '@nmorph/nmorph-ui-kit'
import type { NmorphFormValueType } from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'

const textValue = ref('')
const selectValue = ref('on')
const otpValue = ref('')
const colorValue = ref('#6366f1')
const checked = ref(false)
const switched = ref(false)
const sliderValue = ref(40)

const formValue = ref<NmorphFormValueType>({
  email: {
    value: '',
    rules: [
      { pattern: /^.+$/, error: 'Email is required' },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, error: 'Enter a valid email' },
    ],
  },
  password: {
    value: '',
    rules: [
      { pattern: /^.+$/, error: 'Password is required' },
      { pattern: /^.{8,}$/, error: 'Minimum 8 characters' },
    ],
  },
})
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphTextInput">
      <NmorphTextInput v-model="textValue" clearable placeholder="Type something" />
      <p class="hint">value: {{ textValue || '—' }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphFileUpload (i18n — switch lang to see)">
      <NmorphFileUpload />
    </SandboxSection>

    <SandboxSection title="NmorphSelectButton">
      <NmorphSelectButton v-model="selectValue">
        <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
        <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
        <NmorphSelectButtonItem value="maybe">Maybe</NmorphSelectButtonItem>
      </NmorphSelectButton>
      <p class="hint">value: {{ selectValue }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphOTPInput">
      <NmorphOTPInput v-model="otpValue" />
      <p class="hint">value: {{ otpValue || '—' }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphColorPicker">
      <div class="row">
        <NmorphColorPicker v-model="colorValue" height="thin" />
        <NmorphColorPicker v-model="colorValue" show-value />
        <NmorphColorPicker v-model="colorValue" height="thick" show-value />
      </div>
      <p class="hint">value: {{ colorValue }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphCheckbox">
      <NmorphCheckbox v-model="checked" label="Check me" />
      <p class="hint">checked: {{ checked }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphSwitch">
      <NmorphSwitch v-model="switched" />
      <p class="hint">value: {{ switched }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphSlider">
      <NmorphSlider v-model="sliderValue" />
      <p class="hint">value: {{ sliderValue }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphForm">
      <NmorphForm :value="formValue">
        <NmorphFormItem id="email" label="Email">
          <NmorphTextInput v-model="(formValue.email.value as string)" placeholder="Enter email" autocomplete="email" />
        </NmorphFormItem>
        <NmorphFormItem id="password" label="Password">
          <NmorphTextInput v-model="(formValue.password.value as string)" type="password" placeholder="Enter password" />
        </NmorphFormItem>
      </NmorphForm>
    </SandboxSection>
  </div>
</template>

<style scoped>
.page { display: grid; gap: 24px; }
.row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.hint { margin: 0; font-size: 13px; color: var(--nmorph-text-secondary); }
</style>
