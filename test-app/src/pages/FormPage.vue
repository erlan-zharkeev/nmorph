<template>
  <div class="wrapper">
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
      <NmorphFormItem id="photo">
        <NmorphFileUpload />
      </NmorphFormItem>
    </NmorphForm>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { NmorphForm, NmorphFormItem, NmorphNumberInput, NmorphTextInput, NmorphFileUpload, NmorphDatePicker } from "@nmorph/nmorph-ui-kit";

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
});
</script>

<style>
.nmorph-form-item {
  margin-bottom: 100px;
}

form {
  max-width: 400px;
}

.nmorph-number-input {
  width: 100%;
}
</style>
