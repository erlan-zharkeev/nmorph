<script setup lang="ts">
import { NmorphDropdown, NmorphCheckbox } from "@nmorph/nmorph-ui-kit";

const firstMenu = ref(null);
const firstMenuOpen = ref(true);
const firstMenuCloseHandler = () => {
  firstMenuOpen.value = false;
};

const secondMenu = ref(null);
const secondMenuOpen = ref(false);
const closeHandler = () => {
  secondMenuOpen.value = false;
};
</script>

<template>
  <div class="dropdown-basic-usage-overview">
    <ClientOnly>
      <div class="wrapper">
        <div class="first-menu">
          <div ref="firstMenu">
            <NmorphCheckbox
              v-model="firstMenuOpen"
              label="First menu"
              design="nmorph"
            />
            <NmorphDropdown
              :fill-width="false"
              :width="160"
              v-if="firstMenu"
              :open="firstMenuOpen"
              :relative-element="firstMenu"
              placement="bottom-end"
              @on-outside-click="firstMenuCloseHandler"
              :y-offset="8"
            >
              <div class="dropdown-basic-usage__content">
                <p
                  class="dropdown-basic-usage__item"
                  @click="closeHandler"
                  v-for="idx of [1, 2, 3]"
                  :key="idx"
                >
                  Lorem ipsum {{ idx }}
                </p>
              </div>
            </NmorphDropdown>
          </div>
        </div>
        <div class="second-menu">
          <div ref="secondMenu">
            <NmorphCheckbox
              v-model="secondMenuOpen"
              label="Second menu"
              design="nmorph"
            />
            <NmorphDropdown
              v-if="secondMenu"
              :open="secondMenuOpen"
              :relative-element="secondMenu"
              @on-outside-click="closeHandler"
            >
              <div class="dropdown-basic-usage__content">
                <p
                  class="dropdown-basic-usage__item"
                  @click="closeHandler"
                  v-for="idx of [1, 2, 3]"
                  :key="idx"
                >
                  Lorem ipsum {{ idx }}
                </p>
              </div>
            </NmorphDropdown>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.dropdown-basic-usage-overview {
  .wrapper {
    display: flex;
    padding: 8px 12px 48px;
  }

  .first-menu {
    margin-right: 16px;
  }
}

.dropdown-basic-usage__content {
  padding: 8px;
  overflow: hidden;
  border-radius: 4px;
}

.dropdown-basic-usage__item {
  margin: 0;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: var(--nmorph-text-color);
    color: var(--nmorph-main-color);
  }
}
</style>
