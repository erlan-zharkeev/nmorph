
<script setup lang="ts">
import ApiTable from "~/components/api-table/api-table.vue";

const attributesData = [{
  name: "size",
  type: "",
  default: "",
},{
  name: "shape",
  type: "",
  default: "",
},{
  name: "src",
  type: "",
  default: "",
},{
  name: "src-set",
  type: "",
  default: "",
},{
  name: "alt",
  type: "",
  default: "",
},{
  name: "fit",
  type: "",
  default: "",
}];

const slotData = [];

const variables = [];
</script>

<template>
<div class="docs-api-table">
  <api-table
    name="avatar"
    :attributes="attributesData"
    :slots="slotData"
    :variables="variables"
  />
</div>
</template>
