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
import { NmorphForm, NmorphFormItem } from "./../../../library/src/components";
import NmorphNumberInput from "../../../library/src/components/form/nmorph-number-input/NmorphNumberInput.vue";
import NmorphTextInput from "../../../library/src/components/form/nmorph-text-input/NmorphTextInput.vue";
import NmorphFileUpload from "../../../library/src/components/form/nmorph-file-upload/NmorphFileUpload.vue";
import NmorphDatePicker from "../../../library/src/components/form/nmorph-date-picker/NmorphDatePicker.vue";

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
<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  max-width: 200px;
  height: 200px;
  overflow: auto;
}
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
