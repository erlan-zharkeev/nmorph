<script setup lang="ts">
import { NmorphCard, NmorphImage } from "@nmorph/nmorph-ui-kit";
import { Summer } from "~/assets/images";
</script>

<template>
  <div class="card-shadow-type-overview">
    <div class="card-shadow-type-overview__element">
      <NmorphCard :paper="3">
        <template #header>Lorem ipsum</template>
        <template #default>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
            culpa assumenda, earum repellendus blanditiis explicabo laborum
            ipsam quia reiciendis autem hic cupiditate, illum incidunt quod
            voluptate, sequi accusamus ipsa quis.
          </p>
        </template>
        <template #footer
          >&copy; {{ new Date().getFullYear() }} NMORPH. All rights
          reserved.</template
        >
      </NmorphCard>
    </div>
    <div class="card-shadow-type-overview__element">
      <NmorphCard shadow-type="combined" :paper="3">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
          culpa assumenda, earum repellendus blanditiis explicabo laborum
          ipsam quia reiciendis autem hic cupiditate, illum incidunt quod
          voluptate, sequi accusamus ipsa quis.
        </p>
      </NmorphCard>
    </div>
    <div class="card-shadow-type-overview__element">
      <NmorphCard shadow-type="inset" :paper="3">
        <template #header>Summer</template>
        <template #default>
          <NmorphImage :src="Summer" />
        </template>
      </NmorphCard>
    </div>
  </div>
</template>

<style lang="scss">
.card-shadow-type-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: 16px;
  min-width: 0;

  .card-shadow-type-overview__element {
    min-width: 0;
  }
}
</style>
