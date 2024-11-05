<template>
  <NmorphForm :value="form" ref="formRef">
    <NmorphFormItem id="username" label="Username">
      <NmorphTextInput v-model="form.username.value" clearable />
    </NmorphFormItem>
    <NmorphFormItem id="date" label="Date">
      <NmorphDatePicker v-model="form.date.value" />
    </NmorphFormItem>
    <NmorphFormItem id="photo" label="Photo">
      <NmorphFileUpload v-model="form.photo.value" multiple />
    </NmorphFormItem>
  </NmorphForm>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script setup lang="ts">
// use strict
import {
  NmorphFormItem,
  NmorphForm,
  NmorphTextInput,
  NmorphDatePicker,
  NmorphFileUpload,
} from "@nmorph/nmorph-ui-kit";
import { inject, reactive } from "vue";

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
