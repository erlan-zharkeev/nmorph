<script setup lang="ts">
import { NmorphDropdown, NmorphCheckbox } from "@nmorph/nmorph-ui-kit";

const scriptData = `
const firstMenu = ref(null);
const firstMenuOpen = ref(true);
const firstMenuCloseHandler = () => {
  firstMenuOpen.value = false;
};

const secondMenu = ref(false);
const secondMenuOpen = ref(false);
const closeHandler = () => {
  secondMenuOpen.value = false;
};
`;

const templateData = `
<div class="wrapper">
  <div class="first-menu">
    <div ref="firstMenu">
      <NmorphCheckbox
        v-model="firstMenuOpen"
        label="First menu"
        design="button"
      />
      <NmorphDropdown
        :fill-width="false"
        :width="120"
        v-if="firstMenu"
        :open="firstMenuOpen"
        :relative-element="firstMenu"
        @on-outside-click="firstMenuCloseHandler"
        :x-offset="-122"
        :y-offset="-36"
      >
        <div class="content">
          <p
            class="content__element"
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
        design="button"
      />
      <NmorphDropdown
        v-if="secondMenu"
        :open="secondMenuOpen"
        :relative-element="secondMenu"
        @on-outside-click="closeHandler"
      >
        <div class="content">
          <p
            class="content__element"
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
`;

const cssData = `
<style lang="scss">
  .wrapper {
    display: flex;
  }

  .first-menu {
    margin-right: 16px;
  }

  .content {
    border-radius: 4px;
    overflow: hidden;
  }

  .content__element {
    cursor: pointer;
    padding: 4px;
    &:hover {
      background: var(--nmorph-text-color);
      color: var(--nmorph-main-color);
    }
  }
</style>

`;
const code = [scriptData, templateData, cssData];

const firstMenu = ref(null);
const firstMenuOpen = ref(true);
const firstMenuCloseHandler = () => {
  firstMenuOpen.value = false;
};

const secondMenu = ref(false);
const secondMenuOpen = ref(false);
const closeHandler = () => {
  secondMenuOpen.value = false;
};
</script>

<template>
  <div id="content-basic-usage">
    <attribute
      header="Open"
      :subtitle="$t('overview.basic-usage')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="dropdown-basic-usage-overview">
          <ClientOnly>
            <div class="wrapper">
              <div class="first-menu">
                <div ref="firstMenu">
                  <NmorphCheckbox
                    v-model="firstMenuOpen"
                    :label="$t('overview.dropdown.basic-usage.first-menu')"
                    design="button"
                  />
                  <NmorphDropdown
                    :fill-width="false"
                    :width="120"
                    v-if="firstMenu"
                    :open="firstMenuOpen"
                    :relative-element="firstMenu"
                    @on-outside-click="firstMenuCloseHandler"
                    :x-offset="-122"
                    :y-offset="-36"
                  >
                    <div class="content">
                      <p
                        class="content__element"
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
                    :label="$t('overview.dropdown.basic-usage.second-menu')"
                    design="button"
                  />
                  <NmorphDropdown
                    v-if="secondMenu"
                    :open="secondMenuOpen"
                    :relative-element="secondMenu"
                    @on-outside-click="closeHandler"
                  >
                    <div class="content">
                      <p
                        class="content__element"
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
      <template #code>
        <code-example v-if="templateData" lang="html">{{
          templateData
        }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{
          scriptData
        }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.dropdown-basic-usage-overview {
  .wrapper {
    display: flex;
  }

  .first-menu {
    margin-right: 16px;
  }

  .content {
    border-radius: 4px;
    overflow: hidden;
  }

  .content__element {
    cursor: pointer;
    padding: 4px;
    &:hover {
      background: var(--nmorph-text-color);
      color: var(--nmorph-main-color);
    }
  }
}
</style>
