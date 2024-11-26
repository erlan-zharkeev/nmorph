<script setup lang="ts">
"use strict";
import HelloWorld from "./components/HelloWorld.vue";
import {
  NmorphButton,
  NmorphFileUpload,
  NmorphSelect,
  NmorphBadge,
  NmorphCalendar,
  NmorphProgress,
  NmorphLink,
  // NmorphIconUser,
  // NmorphIcon,
} from "@nmorph/nmorph-ui-kit";
// import Audio from "@nmorph/nmorph-ui-kit/assets/icons/add-location.svg";
</script>

<template>
  <div>
    <NmorphButton text="click me!" />
    <NmorphProgress :percentage="80" />
    <NmorphLink text="asdf" />
    <!-- <NmorphCalendar /> -->
    <NmorphSelect />
    <!-- <NmorphBadge /> -->
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  /* height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms; */
}
.logo:hover {
  /* filter: drop-shadow(0 0 2em #646cffaa); */
}
.logo.vue:hover {
  /* filter: drop-shadow(0 0 2em #42b883aa); */
}
</style>
