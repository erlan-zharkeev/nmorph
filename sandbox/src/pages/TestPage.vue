<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  NmorphCollapse,
  NmorphCollapseItem,
  NmorphIcon,
  NmorphButton,
} from "./../../../library/src/components";
interface IProps {}
const props = withDefaults(defineProps<IProps>(), {});
const str = ref("");
const model = ref([""]);
const update = ref(null);

const clickHandler = () => {
  // update.value("1", false);
  model.value = ["1"];
};
</script>

<template>
  <div class="test">
    <div class="asdf" @click="clickHandler">trigger</div>
    <NmorphCollapse v-model="model" @updateCb="($event) => (update = $event)">
      <NmorphCollapseItem id="1" name="1" :closeOnClick="false">
      </NmorphCollapseItem>
    </NmorphCollapse>
    <NmorphButton style-type="transparent">
      <NmorphIcon name="code" />
    </NmorphButton>
  </div>
</template>

<style lang="scss">
.test {
  width: 200px;
  padding: 20px;
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
