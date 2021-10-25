<template>
  <div
    :resize="ResponsividadeHelper()"
    style="max-width: 1100px; width:100%"
    class="mx-auto mt-6"
  >
    <v-col lg="4" md="2" sm="3">
      <v-btn
        depressed
        class="text-caption"
        color="success"
        min-width="160"
        @click="abrir()"
        ><v-icon class="mr-1">mdi-plus</v-icon>Adicionar</v-btn
      >
    </v-col>

    <v-card>
      <v-data-table
        :headers="colunas"
        :items="produtos"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "nuxt-property-decorator";
import { Produto } from "~/core/models/Geral/Produto";
import { PageBase } from "~/core/models/PageBase";
import { ArmazemService } from "../core/services/geral/ArmazemService";
@Component
export default class TabelaEstoque extends PageBase {
  armazemService: ArmazemService = new ArmazemService();
  produtos: Produto[] = [];
  colunas: any = [
    {
      text: "Produtos",
      align: "start",
      sortable: true,
      value: "name"
    },
    { text: "Quantidade", value: 0 },
    { text: "validade", value: 0 },
    { text: "Armazem", value: "teste" },
    { text: "Data Adicao", value: "teste" }
  ];

  async created() {
    const res = await this.armazemService.GetProdutos();
    this.produtos.push(res.data);
    console.log(res.data);
  }

  abrir() {
    this.$emit("abrirProdutoDialog");
  }
}
</script>

<style scoped></style>
