<script setup lang="ts">
import {
  NmorphPagination,
  NmorphCard,
  NmorphButton,
  NmorphNumberInput,
  NmorphSkeleton,
  NmorphSkeletonItem,
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

const placeholderElements = computed<Elements>(() =>
  Array.from({ length: quantityElementsOnPage.value }, (_, index) => ({
    id: `placeholder-${index}`,
    body: "",
  })),
);
const visibleElements = computed(() =>
  loading.value ? placeholderElements.value : elements.value,
);

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
        <div class="cards__container">
          <div
            class="cards__card"
            v-for="card in visibleElements"
            :key="card.id"
          >
            <NmorphSkeleton v-if="loading" class="cards__skeleton" loading>
              <template #template>
                <NmorphSkeletonItem
                  variant="rect"
                  width="100%"
                  height="70px"
                />
              </template>
            </NmorphSkeleton>
            <NmorphCard
              v-else
              class="cards__card-content"
              :paper="3"
            >
              <span>{{ card.body }}</span>
            </NmorphCard>
          </div>
        </div>
      </div>
      <NmorphPagination
        :disabled="disabled"
        :loading="loading"
        v-model="currentPageModel"
        :elements-quantity-on-page="quantityElementsOnPage"
        :total-elements-quantity="total"
        fixed-container
        :max-visible-pages="5"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.pagination-basic-usage-overview {
  width: 100%;

  .cards {
    position: relative;
    width: 100%;
    min-width: 0;
  }

  .cards__container {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    width: 100%;
    min-width: 0;
  }

  .cards__card {
    min-width: 0;
  }

  .cards__card-content {
    display: flex;
    align-items: center;
    height: 70px;
    overflow: hidden;
  }

  .cards__card-content span {
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

  .cards__skeleton,
  .cards__skeleton .nmorph-skeleton__template,
  .cards__skeleton .nmorph-skeleton-item {
    width: 100%;
  }

  .cards__skeleton .nmorph-skeleton-item {
    margin-bottom: 0;
    border-radius: 4px;
  }
}
</style>
