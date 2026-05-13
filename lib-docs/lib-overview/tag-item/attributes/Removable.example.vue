<script setup lang="ts">
import { ref } from "vue";
import { NmorphTagItem } from "@nmorph/nmorph-ui-kit";

const showTag1 = ref(true);
const showTag2 = ref(true);
</script>

<template>
  <div class="tag-removable-overview">
    <NmorphTagItem
      value="0"
      :text="$t('overview.tag-zero')"
      :removable="false"
    />
    <NmorphTagItem
      v-show="showTag1"
      value="1"
      :text="$t('overview.tag-one')"
      removable
      @close="showTag1 = false"
    />
    <NmorphTagItem
      v-show="showTag2"
      value="2"
      :text="$t('overview.tag-two')"
      removable
      @close="showTag2 = false"
    />
  </div>
</template>
