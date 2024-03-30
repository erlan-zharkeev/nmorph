<template>
  <div class="wrapper">
    <NmorphCard>
      <NmorphForm :value="form">
        <NmorphFormItem id="username" label="Username">
          <NmorphTextInput v-model="form.username.value" type-password fill />
        </NmorphFormItem>

        <NmorphFormItem id="years" label="Years old">
          <NmorphNumberInput v-model="form.years.value" :min="2" :max="8" fill />
        </NmorphFormItem>

        <NmorphFormItem id="gender" label="Gender">
          <NmorphRadioGroup v-model="form.gender.value">
            <NmorphRadio
              v-for="option in genders"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="option.disabled"
            />
          </NmorphRadioGroup>
        </NmorphFormItem>

        <NmorphFormItem id="roles" label="Roles">
          <NmorphCheckboxGroup v-model="form.roles.value">
            <NmorphCheckbox
              v-for="option in roles"
              :id="option.id"
              :key="option.id"
              :label="option.label"
              :disabled="option.disabled"
              style-type="button-style"
            />
          </NmorphCheckboxGroup>
        </NmorphFormItem>

        <NmorphFormItem id="agreement" label="Agreement">
          <NmorphSwitch v-model="form.agreement.value">
            <template #thumb-on><NmorphIcon name="eye" width="10px" height="10px" /></template>
            <template #thumb-off><NmorphIcon name="eye-blocked" width="10px" height="10px" /></template>
          </NmorphSwitch>
        </NmorphFormItem>

        <NmorphFormItem id="weight" label="Weight">
          <NmorphSlider v-model="form.weight.value" :step="1" :max="150" :min="30" />
        </NmorphFormItem>

        <NmorphFormItem id="food" label="Favorite food">
          <NmorphSelect v-model="form.food.value" value-required :options-map="food" fill>
            <NmorphSelectOption
              v-for="option in food"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </NmorphSelect>
        </NmorphFormItem>

        <NmorphFormItem id="photo" label="Photo">
          <NmorphFileUpload v-model="form.photo.value" multiple />
        </NmorphFormItem>

        <NmorphFormItem id="send" label="Send form">
          <NmorphButton text="Click me" width="100px" fill />
        </NmorphFormItem>
      </NmorphForm>
    </NmorphCard>
  </div>
</template>
<script lang="ts" setup>
import {
  NmorphRadioGroup,
  NmorphNumberInput,
  NmorphCard,
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
} from './../../../library/src/components';
import { reactive } from 'vue';

const form = reactive({
  username: {
    value: '',
    rules: [{ pattern: /.{5,}/, error: 'Too short' }],
  },
  years: {
    value: 0,
    rules: [{ compareValue: 5, numberCompareType: 'eq', error: 'Wrong age' }],
  },
  gender: {
    value: 'male',
    rules: [{ compareValue: 'non-binary', booleanCompareType: 'not-eq', error: 'Wrong sex' }],
  },
  roles: {
    value: ['developer', 'reviewer'],
    rules: [{ compareValue: ['maintainer'], arrayCompareType: 'not-contains', error: 'You cant be a maintainer' }],
  },
  agreement: {
    value: true,
    rules: [{ compareValue: false, booleanCompareType: 'eq', error: 'You must set agreement' }],
  },
  weight: {
    value: 55,
    rules: [
      { compareValue: 50, numberCompareType: 'lt', error: 'Weight must be greater than 50' },
      { compareValue: 110, numberCompareType: 'gt', error: 'Weight must be less than 110' },
    ],
  },
  food: {
    value: ['apple'],
    rules: [{ compareValue: ['pear'], arrayCompareType: 'not-contains', error: 'Pear is not available' }],
  },
  photo: {
    value: [],
    rules: [],
  },
});

const genders = [
  {
    disabled: false,
    label: 'Male',
    value: 'male',
  },
  {
    disabled: false,
    label: 'Female',
    value: 'female',
  },
  {
    disabled: false,
    label: 'Non-binary asdfa asdf s',
    value: 'non-binary',
  },
];

const roles = [
  {
    id: 'maintainer',
    disabled: false,
    modelValue: true,
    label: 'Maintainer',
  },
  {
    id: 'unknown',
    disabled: true,
    modelValue: false,
    label: 'unknown',
  },
  {
    id: 'developer',
    disabled: false,
    modelValue: false,
    label: 'Developer',
  },
  {
    id: 'reviewer',
    disabled: false,
    modelValue: false,
    label: 'Reviewer',
  },
];

const food = [
  {
    label: 'Pear',
    value: 'pear',
  },
  {
    label: 'Apple',
    value: 'apple',
  },
  {
    label: 'Orange',
    value: 'orange',
  },
];
</script>
<style lang="scss">
form {
  max-width: 400px;
}
.divider {
  margin: 20px;
}

.wrapper {
  background-color: var(--main-bg);
  height: 100vh;
  padding: 1rem;
  display: flex;
}
</style>
