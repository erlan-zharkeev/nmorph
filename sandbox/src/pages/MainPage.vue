<template>
  <div class="wrapper">
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
      title="Title is very important"
      color=""
      class="additional-class"
    />
    <NmorphYearMonthPicker :currentDate="new Date()" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  NmorphAutocomplete,
  NmorphAlert,
  NmorphYearMonthPicker,
} from "./../../../library/src/components";

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
.wrapper {
  margin: 50px;
}

.nmorph-alert {
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
</style>
