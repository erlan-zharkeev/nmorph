<template>
  <div class="wrapper">
    <NmorphTabs v-model="activeName" stretch>
      <NmorphTabPane label="User" name="first">User Content</NmorphTabPane>
      <NmorphTabPane label="Config" name="second">Config</NmorphTabPane>
      <NmorphTabPane label="Role" name="third" disabled>Role</NmorphTabPane>
      <NmorphTabPane label="Task" name="fourth">
        <template #label>I am from slot</template>
        <template #default>Task</template>
      </NmorphTabPane>
    </NmorphTabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { NmorphTabs, NmorphTabPane } from "./../../../library/src/components";

const activeName = ref("first");
</script>

<style lang="scss">
.wrapper {
  width: 1000px;
  margin: 50px;
}
</style>
