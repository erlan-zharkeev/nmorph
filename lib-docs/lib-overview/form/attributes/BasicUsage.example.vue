<script setup lang="ts">
import {
  NmorphForm,
  NmorphFormItem,
  NmorphTextInput,
  NmorphRadioGroup,
  NmorphNumberInput,
  NmorphRadio,
  NmorphCheckboxGroup,
  NmorphCheckbox,
  NmorphSwitch,
  NmorphIcon,
  NmorphSelect,
  NmorphSlider,
  NmorphSelectOption,
  NmorphDatePicker,
  NmorphFileUpload,
  NmorphButton,
  NmorphIconEye,
  NmorphIconEyeBlocked,
  type INmorphFormDataExpose,
  type NmorphFormValueType,
} from "@nmorph/nmorph-ui-kit";

const drinks = [
  {
    disabled: false,
    label: "Coffee",
    value: "coffee",
  },
  {
    disabled: false,
    label: "Tea",
    value: "tea",
  },
  {
    disabled: false,
    label: "Kombucha",
    value: "kombucha",
  },
];

const browsers = [
  {
    id: "chrome",
    disabled: false,
    modelValue: true,
    label: "Chrome",
  },
  {
    id: "firefox",
    disabled: false,
    modelValue: false,
    label: "Firefox",
  },
  {
    id: "ie",
    disabled: false,
    modelValue: false,
    label: "IE",
  },
];

const food = [
  {
    label: "Pear",
    value: "Pear",
  },
  {
    label: "Apple",
    value: "Apple",
  },
  {
    label: "Orange",
    value: "Orange",
  },
];

const form = reactive({
  username: {
    value: "",
    rules: [{ pattern: /.{5,}/, error: "Too short" }],
  },
  years: {
    value: 18,
    rules: [
      {
        compareValue: 18,
        numberCompareType: "lt",
        error: "Incorrect age",
      },
    ],
  },
  drink: {
    value: "coffee",
    rules: [
      {
        compareValue: "kombucha",
        booleanCompareType: "eq",
        error: "We don't have Kombucha(",
      },
    ],
  },
  browsers: {
    value: ["chrome", "firefox"],
    rules: [
      {
        compareValue: ["ie"],
        arrayCompareType: "not-contains",
        error: "IE is not supported",
      },
    ],
  },
  numberValue: {
    value: 50,
    rules: [
      {
        compareValue: 30,
        numberCompareType: "lt",
        error: "Value must be greater than 30",
      },
      {
        compareValue: 80,
        numberCompareType: "gt",
        error: "Value must be less than 80",
      },
    ],
  },
  food: {
    value: ["Apple"],
    rules: [
      {
        compareValue: ["Pear"],
        arrayCompareType: "not-contains",
        error: "Pear is unavailable",
      },
    ],
  },
  photo: {
    value: [],
    rules: [
      {
        fileMaxSize: 1024 * 1024,
        fileAllowedTypes: ["jpeg", "png", "webp"],
        fileMaxCount: 3,
        error: "Upload up to 3 images, 1 MB each",
      },
    ],
  },
  date: {
    value: new Date(),
    rules: [],
  },
  agreement: {
    value: true,
    rules: [
      {
        compareValue: false,
        booleanCompareType: "eq",
        error: "You must accept the agreement",
      },
    ],
  },
} satisfies NmorphFormValueType);

const formRef: Ref<INmorphFormDataExpose | null> = ref(null);

const isFormValid = ref(false);

watch(
  () => formRef.value?.formData,
  (newValue) => {
    if (newValue) {
      isFormValid.value = newValue.isFormValid.value;
    }
  },
  { deep: true },
);
</script>

<template>
  <div class="form-basic-usage-overview">
    <div class="nmorph-title-3">
      Form is valid:
      {{ isFormValid }}
    </div>
    <NmorphForm :value="form" ref="formRef">
      <NmorphFormItem id="username" label="Username">
        <NmorphTextInput
          placeholder="Enter username"
          clearable
        />
      </NmorphFormItem>
      <NmorphFormItem id="years" label="Years old">
        <NmorphNumberInput :min="0" :max="150" />
      </NmorphFormItem>
      <NmorphFormItem id="drink" label="Preferred drink">
        <NmorphRadioGroup>
          <NmorphRadio
            v-for="option in drinks"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            :disabled="option.disabled"
          />
        </NmorphRadioGroup>
      </NmorphFormItem>
      <NmorphFormItem id="browsers" label="Browsers">
        <NmorphCheckboxGroup>
          <NmorphCheckbox
            v-for="option in browsers"
            :id="option.id"
            :key="option.id"
            :label="option.label"
            :disabled="option.disabled"
            design="nmorph"
          />
        </NmorphCheckboxGroup>
      </NmorphFormItem>
      <NmorphFormItem id="numberValue" label="Numeric value">
        <NmorphSlider
          :step="1"
          :min="0"
          :max="100"
        />
        <span class="form-basic-usage-overview__value">{{
          form.numberValue.value
        }}</span>
      </NmorphFormItem>
      <NmorphFormItem id="food" label="Food">
        <NmorphSelect
          value-required
          :options-map="food"
          fill
        >
          <NmorphSelectOption
            v-for="option in food"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </NmorphSelect>
      </NmorphFormItem>
      <NmorphFormItem id="date" label="Choose a date">
        <NmorphDatePicker />
      </NmorphFormItem>
      <NmorphFormItem id="photo" label="Photo">
        <NmorphFileUpload multiple />
      </NmorphFormItem>
      <NmorphFormItem id="agreement" label="Agreement">
        <NmorphSwitch>
          <template #thumb-on>
            <NmorphIcon width="10px" height="10px">
              <NmorphIconEye />
            </NmorphIcon>
          </template>
          <template #thumb-off>
            <NmorphIcon name="eye-blocked" width="10px" height="10px">
              <NmorphIconEyeBlocked />
            </NmorphIcon>
          </template>
        </NmorphSwitch>
      </NmorphFormItem>
      <NmorphFormItem id="send">
        <NmorphButton
          text="Send form"
          :disabled="!isFormValid"
          width="100px"
          fill
        />
      </NmorphFormItem>
    </NmorphForm>
  </div>
</template>

<style lang="scss">
.form-basic-usage-overview {
  width: 260px;

  .nmorph-text-input,
  .nmorph-number-input,
  .nmorph-radio-group,
  .nmorph-checkbox-group,
  .nmorph-select,
  .nmorph-date-picker,
  .nmorph-file-upload {
    width: 100%;
  }
}
</style>
