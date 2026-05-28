<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  NmorphAutocomplete,
  NmorphCheckbox,
  NmorphCheckboxGroup,
  NmorphColorPicker,
  NmorphDatePicker,
  NmorphFileUpload,
  NmorphForm,
  NmorphFormItem,
  NmorphIconSearch,
  NmorphNumberInput,
  NmorphOTPInput,
  NmorphRadio,
  NmorphRadioGroup,
  NmorphSelect,
  NmorphSelectButton,
  NmorphSelectButtonItem,
  NmorphSelectOption,
  NmorphSlider,
  NmorphSwitch,
  NmorphTextInput,
  NmorphTextarea,
  NmorphTimePicker,
  useNmorph,
} from '@nmorph/nmorph-ui-kit'
import type { INmorphCustomFileData, NmorphFormValueType } from '@nmorph/nmorph-ui-kit'
import SandboxSection from '@sandbox/components/SandboxSection.vue'
import preloadedUploadImageUrl from '../../../lib-docs/assets/images/cat.jpg?url'

const textValue = ref('Nmorph')
const textareaValue = ref('The textarea grows while you type.\nIt also keeps the same input focus styling.')
const passwordValue = ref('secret-value')
const selectValue = ref('draft')
const multiSelectValue = ref(['design', 'build'])
const optionSelectValue = ref('large')
const autocompleteValue = ref('')
const numberValue = ref(4)
const rightNumberValue = ref(10)
const selectButtonValue = ref('on')
const otpValue = ref('')
const alphaOtpValue = ref('A1')
const colorValue = ref('#6366f1')
const runtimeMainColor = ref('#1c1f21')
const runtimeAccentColor = ref('#006cb6')
const checked = ref(false)
const checkboxGroupValue = ref(['mail'])
const checkboxButtonGroupValue = ref(['read'])
const radioValue = ref('button')
const radioStyleValue = ref('standard')
const switchValue = ref('enabled')
const loadingSwitchValue = ref(true)
const sliderValue = ref(40)
const steppedSliderValue = ref(60)
const dateValue = ref(new Date(2026, 4, 5))
const datesValue = ref([new Date(2026, 4, 5), new Date(2026, 4, 12)])
const rangeValue = ref([new Date(2026, 4, 5), new Date(2026, 4, 18)])
const timeValue = ref('09:30')
const preciseTimeValue = ref('14:45:20')
const uploadedFiles = ref<INmorphCustomFileData[]>([
  {
    data: new File([], 'cat.jpg', { type: 'image/jpeg' }),
    previewUrl: preloadedUploadImageUrl,
  },
])
const unsupportedType = ref('')
const { theme } = useNmorph()

const selectOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'Review' },
  { value: 'published', label: 'Published' },
]

const longSelectOptions = [
  { value: 'teams', label: 'Microsoft Teams Audio Device (Virtual)' },
  { value: 'microphone', label: 'MacBook Pro Microphone (Built-in)' },
  { value: 'thunderbolt', label: 'Universal Audio Thunderbolt (PCI)' },
]

const multiSelectOptions = [
  { value: 'design', label: 'Design' },
  { value: 'build', label: 'Build' },
  { value: 'test', label: 'Test' },
]

const autocompleteList = [
  { value: 'Almaty', country: 'Kazakhstan' },
  { value: 'Astana', country: 'Kazakhstan' },
  { value: 'Amsterdam', country: 'Netherlands' },
  { value: 'Austin', country: 'United States' },
]

const checkboxOptions = [
  { id: 'mail', label: 'Email' },
  { id: 'sms', label: 'SMS' },
  { id: 'push', label: 'Push', disabled: true },
]

const radioOptions = [
  { value: 'button', label: 'Button' },
  { value: 'card', label: 'Card' },
  { value: 'table', label: 'Table', disabled: true },
]

const simulateSearch = () => new Promise((resolve) => {
  setTimeout(resolve, 250)
})

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

const emailValue = computed({
  get: () => String(formValue.value.email.value),
  set: (value: string) => {
    formValue.value.email.value = value
  },
})

const passwordFormValue = computed({
  get: () => String(formValue.value.password.value),
  set: (value: string) => {
    formValue.value.password.value = value
  },
})

watch(
  () => theme.currentTheme.value,
  (themeName) => {
    runtimeMainColor.value = theme.data.themes?.[themeName]?.main || runtimeMainColor.value
    runtimeAccentColor.value = theme.data.themes?.[themeName]?.accent || runtimeAccentColor.value
  },
  { immediate: true }
)

watch(runtimeMainColor, (main) => {
  theme.setThemeColors(theme.currentTheme.value, { main })
})

watch(runtimeAccentColor, (accent) => {
  theme.setThemeColors(theme.currentTheme.value, { accent })
})
</script>

<template>
  <div class="page">
    <SandboxSection title="NmorphTextInput">
      <div class="grid">
        <NmorphTextInput v-model="textValue" clearable placeholder="Default clearable">
          <template #prepend-icon>
            <NmorphIconSearch />
          </template>
        </NmorphTextInput>
        <NmorphTextInput v-model="passwordValue" type-password placeholder="Password" height="thick" />
        <NmorphTextInput model-value="Disabled value" disabled height="thin" />
      </div>
      <p class="hint">value: {{ textValue || 'empty' }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphTextarea">
      <div class="grid">
        <NmorphTextarea v-model="textareaValue" placeholder="Write a note" auto-size :min-rows="3" :max-rows="6" />
        <NmorphTextarea model-value="Fixed height textarea" :rows="4" resize="none" />
        <NmorphTextarea model-value="Disabled textarea" disabled />
      </div>
      <p class="hint">characters: {{ textareaValue.length }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphSelect">
      <div class="grid">
        <NmorphSelect v-model="selectValue" :options="selectOptions" no-element-placeholder="Select status" :width="260" />
        <NmorphSelect model-value="review" :options="selectOptions" fill />
        <NmorphSelect model-value="teams" :options="longSelectOptions" options-width="auto" />
        <NmorphSelect
          v-model="multiSelectValue"
          :options="multiSelectOptions"
          value-required
          height="thick"
          no-element-placeholder="Select stages"
        />
        <NmorphSelect v-model="optionSelectValue" height="thin">
          <NmorphSelectOption value="small" label="Small" />
          <NmorphSelectOption value="medium" label="Medium" />
          <NmorphSelectOption
            value="large"
            label="Large"
            hover-background="color-mix(in srgb, var(--nmorph-accent-color) 18%, transparent)"
            hover-color="var(--nmorph-accent-color)"
          />
        </NmorphSelect>
        <NmorphSelect model-value="" :options="selectOptions" loading />
        <NmorphSelect model-value="draft" :options="selectOptions" disabled />
      </div>
      <p class="hint">selected: {{ selectValue }} / {{ multiSelectValue }} / {{ optionSelectValue }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphAutocomplete">
      <div class="grid">
        <NmorphAutocomplete
          v-model="autocompleteValue"
          :list="autocompleteList"
          placeholder="Search city"
          :action-callback="simulateSearch"
          clearable
        >
          <template #default="{ scope }">
            <span>{{ scope.value }} · {{ scope.country }}</span>
          </template>
        </NmorphAutocomplete>
        <NmorphAutocomplete model-value="Disabled" :list="autocompleteList" disabled />
      </div>
      <p class="hint">value: {{ autocompleteValue || 'empty' }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphNumberInput">
      <div class="row">
        <NmorphNumberInput v-model="numberValue" :min="0" :max="10" :step="1" />
        <NmorphNumberInput v-model="rightNumberValue" :min="0" :max="20" :step="2" action-btn-position-right height="thick" />
        <NmorphNumberInput :model-value="3" disabled />
      </div>
      <p class="hint">values: {{ numberValue }} / {{ rightNumberValue }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphSelectButton">
      <div class="stack">
        <NmorphSelectButton v-model="selectButtonValue">
          <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
          <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
          <NmorphSelectButtonItem value="maybe" disabled>Maybe</NmorphSelectButtonItem>
        </NmorphSelectButton>
        <NmorphSelectButton model-value="compact" height="thin" :track-padding="3" :item-size="30" item-font-size="12px">
          <NmorphSelectButtonItem value="compact">Compact</NmorphSelectButtonItem>
          <NmorphSelectButtonItem value="wide">Wide</NmorphSelectButtonItem>
        </NmorphSelectButton>
        <NmorphSelectButton model-value="auto" fill>
          <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
          <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
          <NmorphSelectButtonItem value="auto">Auto</NmorphSelectButtonItem>
        </NmorphSelectButton>
      </div>
      <p class="hint">value: {{ selectButtonValue }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphOTPInput">
      <div class="stack">
        <NmorphOTPInput v-model="otpValue" :length="6" mode="numeric" />
        <NmorphOTPInput v-model="alphaOtpValue" :length="4" mode="alphanumeric" height="thin" autocapitalize="characters" />
        <NmorphOTPInput model-value="1234" :length="4" disabled />
      </div>
      <p class="hint">value: {{ otpValue || 'empty' }} / {{ alphaOtpValue || 'empty' }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphColorPicker">
      <div class="stack">
        <div class="row">
          <NmorphColorPicker v-model="runtimeMainColor" show-value />
          <NmorphColorPicker v-model="runtimeAccentColor" show-value />
        </div>
        <p class="hint">
          runtime theme: {{ theme.currentTheme.value }} / main {{ runtimeMainColor }} / accent {{ runtimeAccentColor }}
        </p>
      </div>
      <div class="row">
        <NmorphColorPicker v-model="colorValue" height="thin" />
        <NmorphColorPicker v-model="colorValue" show-value display-format='rgb' />
        <NmorphColorPicker v-model="colorValue" height="thick" show-value />
        <NmorphColorPicker model-value="#22c55e" show-value disabled />
      </div>
      <p class="hint">value: {{ colorValue }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphCheckbox">
      <div class="stack">
        <div class="row">
          <NmorphCheckbox v-model="checked" label="Single checkbox" />
          <NmorphCheckbox v-model="checked" label="Thin checkbox" height="thin" />
          <NmorphCheckbox model-value label="Checked disabled" disabled />
          <NmorphCheckbox v-model="checked" design="button" label="Button checkbox" height="thick" />
        </div>
        <NmorphCheckboxGroup v-model="checkboxGroupValue" :options="checkboxOptions" height="thin" />
        <NmorphCheckboxGroup v-model="checkboxButtonGroupValue" :options="checkboxOptions" design="checkbox" direction="column" height="thick" />
      </div>
      <p class="hint">checked: {{ checked }} / group: {{ checkboxGroupValue }} / buttons: {{ checkboxButtonGroupValue }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphRadio">
      <div class="stack">
        <NmorphRadioGroup v-model="radioValue" :options="radioOptions" height="thin" />
        <NmorphRadioGroup v-model="radioStyleValue" :options="radioOptions" style-type="radio-style" direction="column" height="thick" />
        <div class="row">
          <NmorphRadio value="standalone" label="Standalone checked" checked />
          <NmorphRadio value="disabled" label="Disabled" height="thin" disabled />
        </div>
      </div>
      <p class="hint">radio: {{ radioValue }} / {{ radioStyleValue }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphSwitch">
      <div class="row">
        <NmorphSwitch v-model="switchValue" active-value="enabled" inactive-value="disabled">
          <template #bg-on>ON</template>
          <template #bg-off>OFF</template>
        </NmorphSwitch>
        <NmorphSwitch v-model="loadingSwitchValue" loading :width="52" :height="30" :offset="4" :thumb-height="22" />
        <NmorphSwitch model-value="disabled" active-value="enabled" inactive-value="disabled" disabled />
      </div>
      <p class="hint">value: {{ switchValue }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphSlider">
      <div class="stack">
        <NmorphSlider v-model="sliderValue" />
        <NmorphSlider
          v-model="steppedSliderValue"
          :min="20"
          :max="100"
          :step="10"
          :show-tooltip="false"
          :thumb-width="60"
          :slider-height="28"
          :value-fixed-container-height="12"
        />
        <NmorphSlider :model-value="30" disabled />
      </div>
      <p class="hint">values: {{ sliderValue }} / {{ steppedSliderValue }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphDatePicker">
      <div class="row">
        <NmorphDatePicker v-model="dateValue" placeholder="Date" :width="260" :calendar-cell-height="40" />
        <NmorphDatePicker v-model="datesValue" type="dates" placeholder="Dates" height="thin" />
        <NmorphDatePicker v-model="rangeValue" type="daterange" placeholder="Range" height="thick" />
        <NmorphDatePicker :model-value="dateValue" disabled />
      </div>
    </SandboxSection>

    <SandboxSection title="NmorphTimePicker">
      <div class="row">
        <NmorphTimePicker v-model="timeValue" placeholder="Time" :width="180" />
        <NmorphTimePicker v-model="preciseTimeValue" show-seconds :minute-step="15" :second-step="10" height="thick" />
        <NmorphTimePicker model-value="12:00" min-time="09:00" max-time="18:00" height="thin" />
        <NmorphTimePicker model-value="08:00" disabled />
      </div>
      <p class="hint">time: {{ timeValue || 'empty' }} / {{ preciseTimeValue || 'empty' }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphFileUpload">
      <div class="stack">
        <NmorphFileUpload
          v-model="uploadedFiles"
          multiple
          button-text="Upload attachments"
          @on-unsupported-file-type-error="unsupportedType = $event"
        />
        <NmorphFileUpload disabled button-text="Disabled upload" />
      </div>
      <p class="hint">attachments: {{ uploadedFiles.length }} / unsupported: {{ unsupportedType || 'none' }}</p>
    </SandboxSection>

    <SandboxSection title="NmorphForm">
      <NmorphForm :value="formValue" validate-immediately>
        <NmorphFormItem id="email" label="Email" autocomplete="email" static-error-box-space>
          <NmorphTextInput v-model="emailValue" placeholder="Enter email" />
        </NmorphFormItem>
        <NmorphFormItem id="password" label="Password" :show-validation-icon="false">
          <NmorphTextInput v-model="passwordFormValue" type-password placeholder="Enter password" />
        </NmorphFormItem>
      </NmorphForm>
    </SandboxSection>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.stack {
  display: grid;
  gap: 12px;
}

.row,
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.grid > * {
  min-width: 220px;
  flex: 1 1 220px;
}

.hint {
  margin: 0;
  font-size: 13px;
  color: var(--nmorph-semi-contrast-text-color);
}
</style>
