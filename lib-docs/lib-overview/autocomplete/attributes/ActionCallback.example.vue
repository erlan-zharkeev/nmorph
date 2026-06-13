<script setup lang="ts">
import { NmorphAutocomplete } from "@nmorph/nmorph-ui-kit";

const text = ref("");
const list = ref([]);
const actionCallback = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5",
    );
    const data = await response.json();
    list.value = data.map((el: unknown) => {
      const listEl = el as { title: string };
      return {
        value: listEl.title,
      };
    });
  } catch {
    list.value = [];
  }
};
</script>

<template>
  <div class="autocomplete-action-callback-overview">
    <NmorphAutocomplete
      v-model="text"
      :list="list"
      placeholder="Text..."
      :action-callback="actionCallback"
    />
  </div>
</template>

<style lang="scss">
.autocomplete-action-callback-overview {
}
</style>
