<script setup lang="ts">
import { ref } from "vue";
import { NmorphEmojiPicker } from "@nmorph/nmorph-ui-kit";
import emojiLocale from "@nmorph/nmorph-ui-kit/emoji/en";

const selectedEmoji = ref("");
</script>

<template>
  <div class="emoji-picker-basic-usage">
    <NmorphEmojiPicker
      language="en"
      :data-source="emojiLocale.data"
      :i18n="emojiLocale.i18n"
      :quick-list="emojiLocale.quickList"
      @select="selectedEmoji = $event"
    />
  </div>
</template>

<style scoped>
.emoji-picker-basic-usage {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
