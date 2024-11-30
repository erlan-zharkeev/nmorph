<script setup lang="ts">
import {
  NmorphButton,
  NmorphProgress,
  NmorphLink,
  NmorphCard,
  NmorphFileUpload,
  NmorphAvatar
} from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div>
    <NmorphButton text="click me!" />
    <NmorphProgress :percentage="80" />
    <NmorphLink text="asdf" />
    <NmorphCard>LOAD</NmorphCard>
    <NmorphFileUpload />
    <NmorphAvatar src="https://picsum.photos/200/300" />
  </div>
</template>

<style>
.nmorph-avatar {
  padding: 21px;
}
</style>
