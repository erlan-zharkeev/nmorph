<template>
  <div class="wrapper">
    <div class="wrapper__left horizontal">
      <NmorphCard>
        <template #header>Label one</template>
        <NmorphTextInput v-model="textValue" label="Label one" :rules="reactiveInputRules" type-password fill />
        <NmorphNumberInput
          v-model="numberModel"
          :min="2"
          :max="8"
          label="Label one"
          :rules="[{ value: 5, operator: 'eq', error: 'Че дурак вообще?!' }]"
          static-error-box-space
          fill
        />
        <NmorphRadioGroup
          v-model="radioValue"
          label="Label one"
          :options="radioOptions"
          :rules="[{ error: 'мимо сука', radioCompareType: 'not-equal', value: 'label3' }]"
          static-error-box-space
        />
        <NmorphCheckboxGroup
          v-model="checkboxValue"
          label="Label one"
          :options="checkboxOptions"
          :rules="[{ error: 'мимо сучараааа!!!', checkboxCompareType: 'not-contains', value: ['Three'] }]"
          static-error-box-space
          fill
        />
        <template #footer>Copyright</template>
      </NmorphCard>
    </div>
    <div class="wrapper__right vertical">
      <NmorphCard>
        <NmorphLink text="click me" underline icon-name="plus" color="error" />
      </NmorphCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  NmorphCheckboxGroup,
  NmorphRadioGroup,
  NmorphNumberInput,
  NmorphCard,
  NmorphTextInput,
  NmorphLink,
} from '@nmorph/nmorph-ui-kit/components';
import { reactive, ref } from 'vue';
const checkboxValue = ref<string[]>(['Two']);
const radioValue = ref('label1');
const textValue = ref('');
const numberModel = ref(1);

const inputRules = [
  {
    pattern:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: 'hui morzh',
  },
];

let reactiveInputRules = reactive(inputRules);

const handler = () => {
  reactiveInputRules.splice(0, reactiveInputRules.length);
};

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
  margin-left: 8px;
  &.vertical {
    display: flex;
  }
}
.wrapper__element {
  padding: 4px;
}

.d-flex {
  display: flex;
  align-items: flex-end;
}

.ml-2 {
  margin-left: 16px;
}
</style>
