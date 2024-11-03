<template>
  <div class="wrapper">
    <NmorphForm :value="form">
      <!-- <select>
        <option
          v-for="option in food"
          :key="option.value"
          :value="option.value"
          tabindex="0"
        />
      </select> -->
      <!-- <NmorphFormItem id="username" label="Username">
        <NmorphTextInput v-model="form.username.value" type-password />
      </NmorphFormItem> -->
      <!--
      <NmorphFormItem id="years" label="Years old">
        <NmorphNumberInput v-model="form.years.value" :min="18" :max="150" />
      </NmorphFormItem> -->

      <!-- <NmorphFormItem id="drink" label="Preferred drink">
        <NmorphRadioGroup v-model="form.drink.value">
          <NmorphRadio
            v-for="option in drinks"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            :disabled="option.disabled"
          />
        </NmorphRadioGroup>
      </NmorphFormItem> -->

      <!-- <NmorphFormItem id="browsers" label="Browsers">
        <NmorphCheckboxGroup v-model="form.browsers.value">
          <NmorphCheckbox
            v-for="option in browsers"
            :id="option.id"
            :key="option.id"
            :label="option.label"
            :disabled="option.disabled"
            style-type="button"
          />
        </NmorphCheckboxGroup>
      </NmorphFormItem> -->

      <!-- <NmorphFormItem id="agreement" label="Agreement">
        <NmorphSwitch v-model="form.agreement.value">
          <template #thumb-on
            ><NmorphIcon name="eye" width="10px" height="10px"
          /></template>
          <template #thumb-off
            ><NmorphIcon name="eye-blocked" width="10px" height="10px"
          /></template>
        </NmorphSwitch>
      </NmorphFormItem> -->

      <!-- <NmorphFormItem id="someValue" label="Some value">
        <NmorphSlider
          v-model="form.someValue.value"
          :step="1"
          :min="0"
          :max="100"
        />
      </NmorphFormItem> -->

      <!-- <NmorphFormItem id="food" label="Favorite food">
        <NmorphSelect
          v-model="form.food.value"
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
      </NmorphFormItem> -->

      <NmorphFormItem id="date" label="Choose date">
        <NmorphDatePicker v-model="form.date.value" />
      </NmorphFormItem>

      <!-- <NmorphFormItem id="photo" label="Photo">
        <NmorphFileUpload v-model="form.photo.value" multiple />
      </NmorphFormItem> -->

      <!-- <NmorphFormItem id="send" label="Send form">
        <NmorphButton text="Click me" width="100px" fill />
      </NmorphFormItem> -->
    </NmorphForm>
  </div>
</template>
<script lang="ts" setup>
import {
  NmorphRadioGroup,
  NmorphNumberInput,
  NmorphFormItem,
  NmorphRadio,
  NmorphForm,
  NmorphFileUpload,
  NmorphSelect,
  NmorphIcon,
  NmorphTextInput,
  NmorphSwitch,
  NmorphSlider,
  NmorphButton,
  NmorphCheckbox,
  NmorphCheckboxGroup,
  NmorphSelectOption,
  NmorphDatePicker,
} from "./../../../library/src/components";
import { reactive } from "vue";

const form = reactive({
  username: {
    value: "",
    rules: [{ pattern: /.{5,}/, error: "Too short" }],
  },
  years: {
    value: 18,
    rules: [{ compareValue: 150, numberCompareType: "eq", error: "Wrong age" }],
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
    value: ["Chrome", "Firefox"],
    rules: [
      {
        compareValue: ["ie"],
        arrayCompareType: "not-contains",
        error: "IE not supported",
      },
    ],
  },
  agreement: {
    value: true,
    rules: [
      {
        compareValue: false,
        booleanCompareType: "eq",
        error: "You must set agreement",
      },
    ],
  },
  someValue: {
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
    value: ["apple"],
    rules: [
      {
        compareValue: ["pear"],
        arrayCompareType: "not-contains",
        error: "Pear is not available",
      },
    ],
  },
  photo: {
    value: [],
    rules: [],
  },
  time: {
    value: Date.now(),
    rules: [],
  },
  date: {
    value: new Date("2024-05-13"),
    rules: [],
  },
});

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
    id: "unknown",
    disabled: true,
    modelValue: false,
    label: "Unknown",
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
    value: "pear",
  },
  {
    label: "Apple",
    value: "apple",
  },
  {
    label: "Orange",
    value: "orange",
  },
];
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
}

form {
  max-width: 400px;
}

.nmorph-number-input {
  width: 100%;
}
</style>
