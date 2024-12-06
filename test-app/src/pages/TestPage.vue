<script setup lang="ts">
import { ref } from "vue";
import {
  NmorphCollapse,
  NmorphCollapseItem,
  NmorphIcon,
  NmorphButton,
  NmorphCheckbox,
} from "@nmorph/nmorph-ui-kit";
const open = ref(false);

const codeOpen = ref("");

const openHandler = () => {
  const value = codeOpen.value === "1" ? "" : "1";
  codeOpen.value = value;
};
</script>

<template>
  <div class="test">
    <NmorphButton icon="eye" class="x" />
    <NmorphButton text="click" class="x" />
    <NmorphButton icon="code" />
    <NmorphButton style-type="transparent" text="kick" @click="openHandler" />
    <NmorphCollapse :modelValue="codeOpen">
      <NmorphCollapseItem id="1" name="1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi numquam
        dolores nobis, dolorum ipsam quia nihil beatae repellendus voluptas non
        quas, labore eveniet corrupti neque dignissimos eius ex vero quo.
      </NmorphCollapseItem>
    </NmorphCollapse>
  </div>
  <NmorphCheckbox v-model="open" style-type="button" size="small" id="open">
    <template #label>
      <NmorphIcon>
        Logo
      </NmorphIcon>
    </template>
  </NmorphCheckbox>
</template>

<style>
.test {
  width: 200px;
  padding: 20px;
  display: flex;
  align-items: center;
}

.test-wrapper {
  position: sticky;
  height: 70vh;
}
</style>
