<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  NmorphCollapse,
  NmorphCollapseItem,
  NmorphIcon,
  NmorphButton,
  NmorphTextInput,
  NmorphCheckbox,
} from "./../../../library/src/components";
import Logo from "./../assets/icons/alert-warning.svg";
const open = ref(false);
</script>

<template>
  <div class="test">
    <NmorphButton icon="eye" class="x" />
    <NmorphButton text="click" class="x" />
    <NmorphIcon name="logo" />
  </div>
  <NmorphCheckbox
    v-model="open"
    style-type="button-style"
    size="small"
    id="open"
  >
    <template #label>
      <NmorphIcon>
        <Logo />
      </NmorphIcon>
    </template>
  </NmorphCheckbox>
</template>

<style lang="scss">
.test {
  width: 200px;
  padding: 20px;
  display: flex;
  align-items: center;
}

.x {
  margin-right: 8px;
}

html {
  overflow: hidden;
  height: 100vh;
}

.test-wrapper {
  position: sticky;
  height: 70vh;
}
</style>
