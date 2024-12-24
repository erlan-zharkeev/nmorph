<script setup lang="ts">
import {
  NmorphPagination,
  NmorphCard,
  NmorphButton,
  NmorphNumberInput,
} from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/CodeSlotData.vue";

const scriptData = `
<script lang="ts" setup>
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
                body: 'Element ' + id,
              };
            }
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

  getData(0);
<\/script>
`;

const templateData = `
<template>
  <div class="actions">
    <div class="actions__element">
      <p>Selected page: {{ currentPage }}</p>
    </div>
    <div class="actions__element">
      <NmorphButton text="Toggle disabled" @click="toggleDisabled" />
    </div>
    <div class="actions__element">
      <NmorphNumberInput
        :model-value="quantityElementsOnPage"
        @update:model-value="changeQuantityElementsOnPageHandler"
        :fill="false"
      />
    </div>
  </div>
  <div class="cards">
    <div class="cards__loader nmorph-title-3" v-if="loading">
      Loading...
    </div>
    <div class="cards__container" v-else>
      <div
        class="cards__card"
        v-for="card in elements"
        :key="card.id"
      >
        <NmorphCard> {{ card.body }} </NmorphCard>
      </div>
    </div>
  </div>
  <NmorphPagination
    :disabled="disabled"
    :quantity-elements-on-page="quantityElementsOnPage"
    :total-elements-quantity="total"
    :model-value="currentPage"
    @update:model-value="($e: number) => getData($e - 1)"
  />
</template>
`;

const cssData = `
<style lang="scss">
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
    margin-top: 16px;
    text-align: center;
  }
</scss>
`;

const code = [scriptData, templateData, cssData];

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
          }
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

getData(0);
</script>

<template>
  <div id="content-basic-usage">
    <Attribute :header="$t('overview.basic-usage')" :subtitle="$t('overview.pagination.basic-usage.subtitle')"
      :codeToCopy="code">
      <template #overview>
        <div class="pagination-basic-usage-overview">
          <ClientOnly>
            <div class="actions">
              <div class="actions__element">
                <p>{{ $t("overview.selected-page") }} {{ currentPage }}</p>
              </div>
              <div class="actions__element">
                <NmorphButton text="Toggle disabled" @click="toggleDisabled" />
              </div>
              <div class="actions__element">
                <NmorphNumberInput :model-value="quantityElementsOnPage"
                  @update:model-value="changeQuantityElementsOnPageHandler" :fill="false" />
              </div>
            </div>
            <div class="cards">
              <div class="cards__loader nmorph-title-3" v-if="loading">
                {{ $t("overview.loading") }}
              </div>
              <div class="cards__container" v-else>
                <div class="cards__card" v-for="card in elements" :key="card.id">
                  <NmorphCard> {{ card.body }} </NmorphCard>
                </div>
              </div>
            </div>
            <NmorphPagination :disabled="disabled" :quantity-elements-on-page="quantityElementsOnPage"
              :total-elements-quantity="total" :model-value="currentPage"
              @update:model-value="($e: number) => getData($e - 1)" />
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data :template-data="templateData" :script-data="scriptData" :css-data="cssData" />
      </template>
    </attribute>
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
    margin-top: 16px;
    text-align: center;
  }
}
</style>
