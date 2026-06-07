<script setup lang="ts">
import {
  NmorphPagination,
  NmorphCard,
  NmorphButton,
  NmorphNumberInput,
  NmorphIcon,
  NmorphIconLoader,
} from "@nmorph/nmorph-ui-kit";

const quantityElementsOnPage = ref(10);
const elements = ref<Elements>([]);
const total = ref<number>(0);
const loading = ref(false);
const currentPage = ref(1);
const disabled = ref(false);

type Elements = Array<{ id: string; body: string }>;
interface SomeResponse {
  totalElementsQuantity: number;
  elements: Elements;
}

const fetchFakeData = async (page: number): Promise<SomeResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = page * 10;
      resolve({
        totalElementsQuantity: 40,
        elements: Array.from(
          { length: quantityElementsOnPage.value },
          (_, index) => {
            const id = (startIndex + index).toString();
            return {
              id,
              body: `Element ${id}`,
            };
          },
        ),
      });
    }, 2000);
  });
};

const getData = async (page: number) => {
  try {
    loading.value = true;
    disabled.value = true;
    const data = await fetchFakeData(page);
    elements.value = data.elements;
    total.value = data.totalElementsQuantity;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    disabled.value = false;
    loading.value = false;
  }
};

const toggleDisabled = () => {
  disabled.value = !disabled.value;
};

const changeQuantityElementsOnPageHandler = (value: number) => {
  quantityElementsOnPage.value = value;
  getData(currentPage.value);
};

const quantityElementsOnPageModel = computed({
  get: () => quantityElementsOnPage.value,
  set: changeQuantityElementsOnPageHandler,
});

const currentPageModel = computed({
  get: () => currentPage.value,
  set: (value: number) => {
    currentPage.value = value;
    getData(value - 1);
  },
});

getData(0);
</script>

<template>
  <div class="pagination-basic-usage-overview">
    <ClientOnly>
      <div class="actions">
        <div class="actions__element">
          <p>Selected page: {{ currentPage }}</p>
        </div>
        <div class="actions__element">
          <NmorphButton text="Toggle disabled" @click="toggleDisabled" />
        </div>
        <div class="actions__element">
          <NmorphNumberInput
            v-model="quantityElementsOnPageModel"
            :fill="false"
          />
        </div>
      </div>
      <div class="cards">
        <div class="cards__loader" v-if="loading">
          <NmorphIcon size="large">
            <NmorphIconLoader />
          </NmorphIcon>
        </div>
        <div class="cards__container" v-else>
          <div class="cards__card" v-for="card in elements" :key="card.id">
            <NmorphCard> {{ card.body }} </NmorphCard>
          </div>
        </div>
      </div>
      <NmorphPagination
        :disabled="disabled"
        v-model="currentPageModel"
        :elements-quantity-on-page="quantityElementsOnPage"
        :total-elements-quantity="total"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.pagination-basic-usage-overview {
  width: 100%;

  .cards__container {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 8px;
  }

  .actions {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .actions__element {
    margin-right: 8px;
    margin-bottom: 8px;
  }

  .cards__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 94px;
    margin-top: 16px;
  }
}
</style>
