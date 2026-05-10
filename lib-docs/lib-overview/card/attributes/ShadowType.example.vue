<script setup lang="ts">
import { NmorphCard, NmorphImage } from "@nmorph/nmorph-ui-kit";
import { Summer } from "~/assets/images";
</script>

<template>
  <div class="card-shadow-type-overview">
    <ClientOnly>
      <div class="card-shadow-type-overview__element">
        <NmorphCard>
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
        <NmorphCard shadow-type="combined">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
            culpa assumenda, earum repellendus blanditiis explicabo laborum
            ipsam quia reiciendis autem hic cupiditate, illum incidunt quod
            voluptate, sequi accusamus ipsa quis.
          </p>
        </NmorphCard>
      </div>
      <div class="card-shadow-type-overview__element">
        <NmorphCard shadow-type="inset">
          <template #header>{{ $t("overview.summer") }}</template>
          <template #default>
            <NmorphImage :src="Summer" />
          </template>
        </NmorphCard>
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.card-shadow-type-overview {
  display: flex;
  flex-wrap: wrap;

  .card-shadow-type-overview__element {
    margin: 8px;
    width: 33.333%;
  }
}
</style>
