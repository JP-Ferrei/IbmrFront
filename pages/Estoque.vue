<template>
  <v-app :resize="ResponsividadeHelper()">
    <div class="d-flex">
      <MenuLateral style="top: 0px; left: 0px; z-index: 100;" />
      <TabelaEstoque @abrirProdutoDialog="abrirProdutoDialog()" />
    </div>

    <ProdutoDialog v-model="dialogState" @fechou="fecharProdutoDialog()" />
    <Nuxt />
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "nuxt-property-decorator";
import { PageBase } from "~/core/models/PageBase";

@Component
export default class Estoque extends PageBase {
  dialogState: boolean = false;

  abrirProdutoDialog() {
    this.dialogState = true;
  }

  fecharProdutoDialog() {
    this.dialogState = false;
  }
}
</script>

<style scoped></style>
