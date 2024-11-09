<script setup lang="ts">
import { NmorphDivider, NmorphCard } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = "";

const templateData = `
<template>
  <div class="divider-wrapper">
    <div class="divider-horizontal">
      <div class="horizontal-elements">
        <div
          class="element"
          v-for="(_, idx) in Array.from({ length: 4 })"
          :key="idx"
        >
          <NmorphCard>Lorem ipsum</NmorphCard>
        </div>
      </div>
      <NmorphDivider />
      <div class="horizontal-elements">
        <div
          class="element"
          v-for="(_, idx) in Array.from({ length: 4 })"
          :key="idx"
        >
          <NmorphCard>Lorem ipsum</NmorphCard>
        </div>
      </div>
    </div>
    <div class="divider-vertical">
      <div class="vertical-elements">
        <div
          class="element"
          v-for="(_, idx) in Array.from({ length: 4 })"
          :key="idx"
        >
          <NmorphCard>Lorem ipsum</NmorphCard>
        </div>
      </div>
      <NmorphDivider direction="vertical" />
      <div class="vertical-elements">
        <div
          class="element"
          v-for="(_, idx) in Array.from({ length: 4 })"
          :key="idx"
        >
          <NmorphCard>Lorem ipsum</NmorphCard>
        </div>
      </div>
    </div>
  </div>
</template>
`;

const cssData = `
<style lang="scss">
  .divider-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .divider-horizontal {
    margin-right: 24px;
    margin-bottom: 8px;
    .nmorph-divider {
      margin: 16px 0;
    }
  }

  .divider-vertical {
    display: flex;
    .nmorph-divider {
      margin: 0 16px;
    }
  }

  .horizontal-elements {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(2, 1fr);
  }

  .vertical-elements {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-direction">
    <attribute
      header="Direction"
      :subtitle="$t('overview.divider.direction.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="divider-direction-overview">
          <ClientOnly>
            <div class="divider-wrapper">
              <div class="divider-horizontal">
                <div class="horizontal-elements">
                  <div
                    class="element"
                    v-for="(_, idx) in Array.from({ length: 4 })"
                    :key="idx"
                  >
                    <NmorphCard>Lorem ipsum</NmorphCard>
                  </div>
                </div>
                <NmorphDivider />
                <div class="horizontal-elements">
                  <div
                    class="element"
                    v-for="(_, idx) in Array.from({ length: 4 })"
                    :key="idx"
                  >
                    <NmorphCard>Lorem ipsum</NmorphCard>
                  </div>
                </div>
              </div>
              <div class="divider-vertical">
                <div class="vertical-elements">
                  <div
                    class="element"
                    v-for="(_, idx) in Array.from({ length: 4 })"
                    :key="idx"
                  >
                    <NmorphCard>Lorem ipsum</NmorphCard>
                  </div>
                </div>
                <NmorphDivider direction="vertical" />
                <div class="vertical-elements">
                  <div
                    class="element"
                    v-for="(_, idx) in Array.from({ length: 4 })"
                    :key="idx"
                  >
                    <NmorphCard>Lorem ipsum</NmorphCard>
                  </div>
                </div>
              </div>
            </div>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data
          :template-data="templateData"
          :script-data="scriptData"
          :css-data="cssData"
        />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.divider-direction-overview {
  .divider-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .divider-horizontal {
    margin-right: 24px;
    margin-bottom: 8px;
    .nmorph-divider {
      margin: 16px 0;
    }
  }

  .divider-vertical {
    display: flex;
    .nmorph-divider {
      margin: 0 16px;
    }
  }

  .horizontal-elements {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(2, 1fr);
  }

  .vertical-elements {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
  }
}
</style>
