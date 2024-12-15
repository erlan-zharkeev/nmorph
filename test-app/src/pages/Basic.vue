<script setup lang="ts">
import {
  NmorphBacktop,
  NmorphButton,
  NmorphIcon,
  NmorphIconAim,
  NmorphLink,
  NmorphScroll,
} from "@nmorph/nmorph-ui-kit";

</script>

<template>
  <div class="basic page">
    <NmorphScroll height="200px">
      <div class="page__element" v-for="el in 200">{{ el }}</div>
      <!-- <div class="page__element">
        <NmorphButton text="CLICK" loading style-type='transparent' />
      </div>
      <div class="page__element">
        <NmorphIcon size='large'>
          <NmorphIconAim />
        </NmorphIcon>
      </div>
      <div class="page__element">
        <NmorphLink size='large'>I am link
        </NmorphLink>
      </div> -->
      <!-- <NmorphBacktop /> -->
    </NmorphScroll>
  </div>
</template>

<style>
.basic {}
</style>
