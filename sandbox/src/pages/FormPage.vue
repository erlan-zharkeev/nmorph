<template>
  <div class="wrapper">
    <NmorphForm :value="form" ref="formRef">
      <NmorphFormItem id="username" label="Username">
        <NmorphTextInput v-model="form.username.value" clearable />
      </NmorphFormItem>
      <NmorphFormItem
        id="date"
        :label="$t('overview.form.basic-usage.choose-date')"
      >
        <NmorphDatePicker v-model="form.date.value" />
      </NmorphFormItem>
      <NmorphFormItem id="photo" :label="$t('overview.form.basic-usage.photo')">
        <NmorphFileUpload v-model="form.photo.value" multiple />
      </NmorphFormItem>
    </NmorphForm>
  </div>
</template>
<script lang="ts" setup>
import {
  NmorphFormItem,
  NmorphForm,
  NmorphFileUpload,
  NmorphTextInput,
  NmorphDatePicker,
} from "./../../../library/src/components";

import { type INmorphFromDataExpose } from "./../../../library/src/types";

import { reactive, ref, watch } from "vue";

const formRef = ref<INmorphFromDataExpose | null>(null);

watch(
  () => formRef.value?.formData,
  (newValue) => {
    // newValue.isFormValid.
    // console.log(newValue);
    // isFormValid.value = newValue.isFormValid.value;
  },
  { deep: true }
);

const form = reactive({
  username: {
    value: "",
    rules: [{ pattern: /.{5,}/, error: "Too short" }],
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
}

form {
  max-width: 400px;
}

.nmorph-number-input {
  width: 100%;
}
</style>
