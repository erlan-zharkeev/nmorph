<template>
  <div class="wrapper">
    <div class="wrapper__left horizontal">
      <div class="wrapper__element">
        <NmorphRadioGroup v-model="radioValue" :options="radioOptions" />
      </div>
      <div class="wrapper__element">
        <NmorphCheckboxGroup v-model="checkboxValue" :options="checkboxOptions" />
      </div>
      <div class="wrapper__element">
        <NmorphRadioGroup v-model="radioValue" :options="radioOptions" style-type="button-style" />
      </div>
      <div class="wrapper__element">
        <NmorphCheckboxGroup v-model="checkboxValue" :options="checkboxOptions" style-type="button-style" />
      </div>
      <div class="wrapper__element">
        <NmorphButton text="click" loading />
      </div>
      <div class="wrapper__element">
        <NmorphTextInput v-model="textValue" label="Label one" :rules="inputRules" type-password />
      </div>
    </div>
    <div class="wrapper__right vertical">
      <!-- <div class="wrapper__element">
        <NmorphRadioGroup v-model="radioValue" :options="radioOptions" direction="column" />
      </div>
      <div class="wrapper__element">
        <NmorphCheckboxGroup v-model="checkboxValue" :options="checkboxOptions" direction="column" />
      </div>
      <div class="wrapper__element">
        <NmorphRadioGroup v-model="radioValue" :options="radioOptions" direction="column" style-type="button-style" />
      </div>
      <div class="wrapper__element">
        <NmorphCheckboxGroup
          v-model="checkboxValue"
          :options="checkboxOptions"
          direction="column"
          style-type="button-style"
        />
      </div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NmorphCheckboxGroup, NmorphRadioGroup, NmorphIcon, NmorphButton } from '@nmorph/nmorph-ui-kit/components';
import NmorphTextInput from '@nmorph/nmorph-ui-kit/components/atoms/inputs/nmorph-text-input/NmorphTextInput.vue';
import { ref } from 'vue';
const checkboxValue = ref<string[]>(['Two']);
const radioValue = ref('label1');
const textValue = ref('');

const inputRules = [
  {
    pattern:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: 'fui morzh',
  },
];

const radioOptions = [
  {
    disabled: false,
    label: 'Label 1',
    value: 'label1',
  },
  {
    disabled: true,
    label: 'Label 2',
    value: 'label2',
  },
  {
    disabled: false,
    label: 'Label 3',
    value: 'label3',
  },
];

const checkboxOptions = ref([
  {
    id: 'One',
    disabled: false,
    modelValue: true,
    label: 'Label 1',
  },
  {
    id: 'Two',
    disabled: true,
    modelValue: false,
    label: 'Label 2',
  },
  {
    id: 'Three',
    disabled: false,
    modelValue: false,
    label: 'Label 3',
  },
]);
</script>
<style lang="scss">
.wrapper {
  height: 100vh;
  background-color: var(--main-bg);
  padding: 2rem;
  display: flex;
}

.wrapper__left,
.wrapper__right {
  width: 50%;
}
.wrapper__right {
  &.vertical {
    display: flex;
  }
}
.wrapper__element {
  padding: 4px;
}

.d-flex {
  display: flex;
}
</style>
