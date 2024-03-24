<template>
  <div class="wrapper">
    <div class="wrapper__left horizontal">
      <NmorphCard>
        <NmorphForm :value="form">
          <NmorphFormItem id="username" label="Username" static-error-box-space>
            <NmorphTextInput v-model="form.username.value" fill />
          </NmorphFormItem>
          <NmorphFormItem id="email" label="Email" static-error-box-space>
            <NmorphTextInput v-model="form.email.value" fill />
          </NmorphFormItem>
          <NmorphFormItem id="years" label="Years old" static-error-box-space>
            <NmorphNumberInput v-model="form.years.value" :min="2" :max="8" fill />
          </NmorphFormItem>
        </NmorphForm>

        <div class="divider" />
        <!-- <NmorphNumberInput
          v-model="numberModel"
          :min="2"
          :max="8"
          label="Label one"
          :rules="[{ value: 5, operator: 'eq', error: 'Че дурак вообще?!' }]"
          static-error-box-space
          fill
        />
        <div class="divider" />
        <NmorphRadioGroup
          v-model="radioValue"
          label="Label one"
          :options="radioOptions"
          :rules="[{ error: 'мимо сука', radioCompareType: 'not-equal', value: 'label3' }]"
          style-type="button-style"
          static-error-box-space
        />
        <div class="divider" />
        <NmorphCheckboxGroup
          v-model="checkboxValue"
          label="Label one"
          :options="checkboxOptions"
          style-type="button-style"
          :rules="[{ error: 'мимо сучараааа!!!', checkboxCompareType: 'not-contains', value: ['Three'] }]"
          static-error-box-space
          fill
        />
        <div class="divider" />
        <NmorphSlider v-model="slider" :step="1" />
        <div class="divider" />
        <NmorphSwitch v-model="switchValue">
          <template #thumb-on><NmorphIcon name="eye" width="10px" height="10px" /></template>
          <template #thumb-off><NmorphIcon name="eye-blocked" width="10px" height="10px" /></template>
        </NmorphSwitch>
        <div class="divider" />
        <NmorphSelect v-model="selectVal" :options="selectOptions" value-required />
        <div class="divider" />
        <NmorphFileUpload multiple @on-files-changed="filesCapturedHandler" /> -->
      </NmorphCard>
    </div>
    <div class="wrapper__right vertical">
      <NmorphCard>
        <!-- <NmorphTooltip text="read me" position="right" disabled>
          <NmorphLink text="click me" underline icon-name="plus" color="error" />
        </NmorphTooltip>
        <div class="">
          <NmorphTag v-for="tag in tags" v-bind="tag" :key="tag.value" height="thin" @close="closeTagHandler" />
        </div>
        <div class="divider" />
        <NmorphImagePreview :src="slides" />
        <template #footer>Copyright</template> -->
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
  NmorphSelect,
  NmorphFormItem,
  NmorphForm,
  NmorphTextInput,
  NmorphSlider,
  NmorphFileUpload,
  NmorphSwitch,
} from './../../../library/src/components';
import { reactive, ref } from 'vue';

const usernameRules = [
  {
    pattern: /.{5,}/,
    error: 'Too short',
  },
];
const emailRules = [
  {
    pattern:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: 'Not email',
  },
];
const yearsRules = [{ value: 5, operator: 'eq', error: 'Че дурак вообще?!' }];

const form = reactive({
  username: {
    value: '',
    rules: usernameRules,
  },
  email: {
    value: '',
    rules: emailRules,
  },
  years: {
    value: 0,
    rules: yearsRules,
  },
});

const checkboxValue = ref<string[]>(['Two']);
const radioValue = ref('label1');
const textValue = ref('');
const numberModel = ref(1);
const slider = ref(50);
const selectVal = ref(['1']);

// let reactiveInputRules = reactive(inputRules);

let tags = reactive([
  { text: 'tag one', value: 'value-1' },
  { text: 'two', value: 'value-2' },
]);

const switchValue = ref(false);

const handler = () => {
  reactiveInputRules.splice(0, reactiveInputRules.length);
};
const slides = ref([
  'https://images.pexels.com/photos/20367774/pexels-photo-20367774.jpeg',
  'https://images.pexels.com/photos/20596245/pexels-photo-20596245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/8755970/pexels-photo-8755970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
]);
const closeTagHandler = (value: string) => {
  const index = tags.findIndex((tag) => tag.value === value);
  if (index !== -1) tags.splice(index, 1);
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

const selectOptions = reactive([
  {
    label: 'Label-1',
    value: '1',
  },
  {
    label: 'Label-2',
    value: '2',
    disabled: true,
  },
  {
    label: 'Label-3',
    value: '3',
  },
]);

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

const filesCapturedHandler = () => {
  console.log('files');
};
</script>
<style lang="scss">
.divider {
  margin: 1rem;
}
.wrapper {
  height: 100vh;
  background-color: var(--main-bg);
  padding: 1rem;
  display: flex;
}
.test {
  position: fixed;
  left: 0%;
  bottom: 50px;
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
