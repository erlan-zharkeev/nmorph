<template>
  <div class="wrapper">
    <div class="docs-top-bar__search">
      <NmorphTextInput placeholder="search" v-model="searchQuery">
        <template #prepend-icon>
          <NmorphIcon name="search" />
        </template>
      </NmorphTextInput>
    </div>
    <NmorphAutocomplete
      v-model="value"
      :list="variants"
      :actionCallback="getVariants"
    >
    </NmorphAutocomplete>
    <NmorphAlert
      v-for="color in ['info', 'success', 'error', 'warning']"
      :key="color"
      content="Hello, im alert content"
      title="Hi, Title is very important"
      :type="color"
      class="additional-class"
    />
    <NmorphYearMonthPicker :currentDate="new Date()" />
    <NmorphButton class="btn" @click="addNotification"
      >Add notification</NmorphButton
    >
    <!-- <NmorphButton
      style-type="default"
      ripple
      text="I am ripple"
      accentBgOnHover
    /> -->
    <!-- <NmorphIcon name="eye" color="var(--nmorph-accent-color)" />
    <NmorphCheckbox
      class="docs-top-bar__burger"
      v-model="n"
      style-type="button-style"
      label="menu"
    /> -->
    <div class="element">
      <NmorphLink disabled type="accent">Accent</NmorphLink>
      <NmorphLink disabled type="success">Success</NmorphLink>
      <NmorphLink disabled type="warning">Warning</NmorphLink>
      <NmorphLink disabled type="error">Error</NmorphLink>
      <NmorphLink disabled underline>Underlined</NmorphLink>

      <!-- <NmorphIcon
        class="nmorph-link__icon"
        name="eye"
        width="10px"
        height="10px"
      /> -->
    </div>
  </div>
  <NmorphNotificationProvider :notifications="notifications" :quantity="3" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  NmorphAutocomplete,
  NmorphAlert,
  NmorphYearMonthPicker,
  NmorphButton,
  NmorphTextInput,
  NmorphIcon,
} from "./../../../library/src/components";
import NmorphNotificationProvider from "./../../../library/src/components/providers/nmorph-notification-provider/NmorphNotificationProvider.vue";
import { useNmorphNotification } from "./../../../library/src/hooks";

const searchQuery = ref("");

const { notifications, notify } = useNmorphNotification();
const count = ref(8);

const addNotification = () => {
  count.value += 1;
  notify({
    content: `Yay!, ${count.value}`,
    duration: 0,
    title: "Title",
    type: "error",
  });
};

const n = ref(false);

const value = ref("");
const variants = ref([]);

const getVariants = async () => {
  return fetch("https://rickandmortyapi.com/api/character/?page=19")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      variants.value = data.results.map((el: any) => {
        return {
          value: el.name,
        };
      });
    });
};

// const variants = [
//   { value: "vue", link: "https://github.com/vuejs/vue" },
//   { value: "element", link: "https://github.com/ElemeFE/element" },
//   { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
//   { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
//   { value: "vuex", link: "https://github.com/vuejs/vuex" },
//   { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
//   { value: "babel", link: "https://github.com/babel/babel" },
// ];
</script>

<style lang="scss">
.element {
  margin: 1rem;
}
.btn {
  margin-top: 40px;
}
.nmorph-divider {
  margin: 0 8px;
}
.wrapper {
  margin: 50px;
}

.nmorph-alert {
  margin-right: 8px;
}
.nmorph-link {
  margin-right: 8px;
}
.line {
  display: flex;
  .ml-2 {
    margin-left: 8px;
  }
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.additional-class {
  margin-top: 24px;
  margin-bottom: 24px;
}
</style>
