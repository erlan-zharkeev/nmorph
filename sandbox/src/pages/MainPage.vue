<template>
  <div class="wrapper">
    <NmorphTextInput id="test" v-model="xxx" :rules="rules" />
  </div>
</template>
<script lang="ts" setup>
import { NmorphTextInput } from '@nmorph/nmorph-ui-kit/components';
import { ref } from 'vue';
const xxx = ref('');
const rules = [
  {
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    error: 'не имэйл ебать',
  },
  {
    pattern: /^.{3,}$/,
    error: 'коротко ебать',
  },
];
// const clickHandler = () => {
//   console.log('object');
// };
</script>
<style lang="scss">
.wrapper {
  text-align: center;
  height: 100vh;
  background-color: var(--main-bg);
  padding: 10rem;
}

.form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
