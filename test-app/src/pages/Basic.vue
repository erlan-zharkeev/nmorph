<script setup lang="ts">
import {
  NmorphButton,
  NmorphIcon,
  NmorphIconAim,
  NmorphLink,
  NmorphScroll
} from "@nmorph/nmorph-ui-kit";

</script>

<template>
  <div class="basic page">
    <NmorphScroll>
      <div class="page__element">
        <NmorphButton text="CLICK" loading />
      </div>
      <div class="page__element">
        <NmorphIcon size='large'>
          <NmorphIconAim />
        </NmorphIcon>
      </div>
      <div class="page__element">
        <NmorphLink size='large'>I am link
        </NmorphLink>
      </div>
    </NmorphScroll>
  </div>
</template>

<style>
.basic {}
</style>
