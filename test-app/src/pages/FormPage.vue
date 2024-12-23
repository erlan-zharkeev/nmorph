<template>
  <div class="wrapper">
    <NmorphCard>
      <NmorphForm :value="form">
        <NmorphFormItem id="username">
          <NmorphTextInput />
        </NmorphFormItem>
        <NmorphFormItem id="photo">
          <NmorphDatePicker v-model="form.date.value" />
        </NmorphFormItem>
        <NmorphFormItem id="age">
          <NmorphNumberInput />
        </NmorphFormItem>
        <!-- <NmorphFormItem id="photo">
          <NmorphFileUpload />
        </NmorphFormItem> -->
        <!-- <div class="line">
          <div class="stub" v-if="form.fruit.value === 'apple'">stubbbbbbbbbbb</div>
          <NmorphFormItem id="fruit">
            <NmorphSelect v-model="form.fruit.value" value-required :options-map="food" fill>
              <NmorphSelectOption v-for="option in food" :key="option.value" :label="option.label"
                :value="option.value" />
            </NmorphSelect>
          </NmorphFormItem>
        </div> -->
        <!-- <NmorphFormItem id="fruit">

          <NmorphSelect v-model="form.fruit.value" value-required :options-map="food" fill>
            <NmorphSelectOption v-for="option in food" :key="option.value" :label="option.label"
              :value="option.value" />
          </NmorphSelect>
        </NmorphFormItem> -->
      </NmorphForm>
    </NmorphCard>
  </div>
  <div class="stub" v-if="form.fruit.value === 'apple'">stubbbbbbbbbbb</div>
  <NmorphSelect v-model="form.fruit.value" value-required :options-map="food" fill>
    <NmorphSelectOption v-for="option in food" :key="option.value" :label="option.label" :value="option.value" />
  </NmorphSelect>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { NmorphCard, NmorphForm, NmorphFormItem, NmorphNumberInput, NmorphTextInput, NmorphFileUpload, NmorphDatePicker, NmorphSelect, NmorphSelectOption } from "@nmorph/nmorph-ui-kit";

const form = reactive({
  username: {
    value: "",
    rules: [],
  },
  age: {
    value: 12,
    rules: [],
  },
  photo: {
    value: [],
    rules: [],
  },
  date: {
    value: new Date(),
    rules: [],
  },
  fruit: {
    value: 'apple',
    rules: []
  }
});

const food = [
  {
    label: 'pear',
    value: 'pear',
  },
  {
    label: 'apple',
    value: 'apple',
  },
  {
    label: 'orange',
    value: 'orange',
  },
];
</script>

<style>
.wrapper {
  padding: 16px;
  width: 500px;
}

.line {
  /* display: flex; */
  /* align-items: center; */
}

.nmorph-form-item {
  margin-bottom: 20px !important;
}

form {
  /* max-width: 400px; */
}

.nmorph-number-input {
  width: 100%;
}
</style>
