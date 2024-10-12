<template>
  <div class="cards">
    <div class="loader" v-if="loading">Loading...</div>
    <div class="card-container" v-else>
      <div class="card" v-for="card in data" :key="card.id">
        <p>{{ card.id }} - {{ card.body }}</p>
      </div>
    </div>
    <NmorphPagination
      :total-elements-quantity="totalElementsQuantity"
      :elements-quantity-on-page="elementsQuantityOnPage"
      :model-value="currentPage"
      :disabled="true"
      @update:model-value="changePageHandler"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { NmorphPagination } from "./../../../library/src/components";

const loading = ref(false);
const data = ref<Array<{ id: string; body: string }>>([]);
const totalElementsQuantity = 209;
const currentPage = ref(1);
const elementsQuantityOnPage = ref(5);

const fetchPaginatedData = async (page = 1) => {
  loading.value = true;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${elementsQuantityOnPage.value}`
  );
  const apiData = await response.json();
  data.value = apiData.map((el: { id: string; body: string }) => {
    const { id, body } = el;
    return {
      id,
      body,
    };
  });
  loading.value = false;
};

fetchPaginatedData();

const changePageHandler = (value: number) => {
  fetchPaginatedData(value);
};
</script>

<style lang="scss">
.card-container {
  display: grid;
}
.cards {
  padding: 16px;
}
.docs-top-bar__translate-btn {
  padding: 20px;
  display: flex;
}
</style>
