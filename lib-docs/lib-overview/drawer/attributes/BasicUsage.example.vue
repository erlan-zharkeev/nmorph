<script setup lang="ts">
import { NmorphButton, NmorphDrawer, NmorphSpace } from "@nmorph/nmorph-ui-kit";

const open = ref(false);
</script>

<template>
  <div>
    <ClientOnly>
      <NmorphButton text="Open drawer" @click="open = true" />
      <NmorphDrawer v-model="open" title="Drawer" size="340px">
        <NmorphSpace direction="column" size="large">
          <p>
            Use a drawer for secondary flows that should not replace the current page.
          </p>
          <NmorphButton text="Close" @click="open = false" />
        </NmorphSpace>
      </NmorphDrawer>
    </ClientOnly>
  </div>
</template>
