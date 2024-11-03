<script setup lang="ts">
import { NmorphCard, NmorphImage } from "@nmorph/nmorph-ui-kit";
import { Summer } from "~/assets/images";

const scriptData = "";
const templateData = `
<template>
  <div class="card-shadow-type-overview__left">
    <div class="card-shadow-type-overview__element">
      <NmorphCard>
        <template #header>Card title</template>
        <template #default>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Neque culpa assumenda, earum repellendus blanditiis
            explicabo laborum ipsam quia reiciendis autem hic
            cupiditate, illum incidunt quod voluptate, sequi accusamus
            ipsa quis.
          </p>
        </template>
        <template #footer
          >&copy; {{ new Date().getFullYear() }} NMORPH. All rights
          reserved.</template
        >
      </NmorphCard>
    </div>
    <div class="card-shadow-type-overview__element">
      <NmorphCard shadow-type="combined">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Neque culpa assumenda, earum repellendus blanditiis
          explicabo laborum ipsam quia reiciendis autem hic
          cupiditate, illum incidunt quod voluptate, sequi accusamus
          ipsa quis.
        </p>
      </NmorphCard>
    </div>
  </div>
  <div class="card-shadow-type-overview__right">
    <div class="card-shadow-type-overview__element">
      <NmorphCard shadow-type="inset">
        <template #header>Summer</template>
        <template #default>
          <NmorphImage :src="Summer" />
        </template>
      </NmorphCard>
    </div>
  </div>
</template>
`;
const cssData = `
<style lang="scss">
  .card-shadow-type-overview {
    display: flex;

    .card-shadow-type-overview__element {
      margin: 8px;
      width: 33.333%;
    }
  }
</style>
`;

const code = [scriptData, templateData, cssData];
</script>

<template>
  <div id="content-shadow-type">
    <attribute
      header="Shadow Type"
      :subtitle="$t('overview.card.shadow-type.subtitle')"
      :codeToCopy="code"
    >
      <template #overview>
        <div class="card-shadow-type-overview">
          <ClientOnly>
            <div class="card-shadow-type-overview__element">
              <NmorphCard>
                <template #header>Lorem ipsum</template>
                <template #default>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Neque culpa assumenda, earum repellendus blanditiis
                    explicabo laborum ipsam quia reiciendis autem hic
                    cupiditate, illum incidunt quod voluptate, sequi accusamus
                    ipsa quis.
                  </p>
                </template>
                <template #footer
                  >&copy; {{ new Date().getFullYear() }} NMORPH. All rights
                  reserved.</template
                >
              </NmorphCard>
            </div>
            <div class="card-shadow-type-overview__element">
              <NmorphCard shadow-type="combined">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Neque culpa assumenda, earum repellendus blanditiis explicabo
                  laborum ipsam quia reiciendis autem hic cupiditate, illum
                  incidunt quod voluptate, sequi accusamus ipsa quis.
                </p>
              </NmorphCard>
            </div>
            <div class="card-shadow-type-overview__element">
              <NmorphCard shadow-type="inset">
                <template #header>{{ $t("overview.summer") }}</template>
                <template #default>
                  <NmorphImage :src="Summer" />
                </template>
              </NmorphCard>
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
.card-shadow-type-overview {
  display: flex;

  .card-shadow-type-overview__element {
    margin: 8px;
    width: 33.333%;
  }
}
</style>
