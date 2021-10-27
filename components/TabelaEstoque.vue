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
        @click="abrirProdutoDialog()"
        ><v-icon class="mr-1">mdi-plus</v-icon>Adicionar</v-btn
      >
    </v-col>

    <v-card>
      <v-data-table
        :headers="colunas"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <!-- <v-btn
            @click="VerDetalhes(item.id)"
            class="mx-1"
            icon
            tile
            color="white"
            style="background: grey; border-radius: 5px"
            ><v-icon>mdi-magnify</v-icon></v-btn
          > -->
          <!-- <v-btn
            @click="Editar(item.id)"
            class="mx-1"
            icon
            tile
            color="white"
            style="background: #9CCC65; border-radius: 5px"
            ><v-icon small>mdi-pencil</v-icon></v-btn
          > -->
          <v-btn
            @click="DeletarCliente(item.id)"
            class="mx-1"
            icon
            tile
            color="white"
            style="background: #EF5350; border-radius: 5px"
            ><v-icon small>mdi-delete</v-icon></v-btn
          >
        </template>

        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Pesquisar Nome"
            class="mx-4"
          ></v-text-field>
        </template>
      </v-data-table>
    </v-card>
    <ProdutoDialog
      v-model="dialogState"
      @fechou="fecharProdutoDialog()"
      @produtoAdicionado="lista()"
    />

    <ConfirmDialog
      @Confirmar="deletarConfirm = true"
      @Cancelar="dialogDeletar = false"
      :textoMensagem="'Tem certeza que deseja deletar este produto?'"
      v-model="dialogDeletar"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "nuxt-property-decorator";
import { Produto } from "~/core/models/Geral/Produto";
import { PageBase } from "~/core/models/PageBase";
import { ProdutoService } from "~/core/services/geral/ProdutoService";
import { ArmazemService } from "../core/services/geral/ArmazemService";
@Component
export default class TabelaEstoque extends PageBase {
  dialogState: boolean = false;

  dialogDeletar: boolean = false;
  deletarConfirm: boolean = false;
  produtoId: string = "";

  armazemService: ArmazemService = new ArmazemService();
  produtoService: ProdutoService = new ProdutoService();

  search: string = "";
  produto: Produto[] = [];
  desserts: any = [];

  colunas: any = [
    {
      text: "Produtos",
      align: "start",
      sortable: true,
      value: "nome"
    },
    { text: "Quantidade", value: "quantidade" },
    { text: "validade", value: "validade" },
    { text: "Data Adicao", value: "dataDeAdicao" },
    { text: "opções", value: "actions", sortable: false }
  ];

  async created() {
    this.getLista();
  }
  async getLista() {
    const res = await this.produtoService.ListarTudo();
    this.produto.push(res.data.items);
    this.desserts = this.produto[0];
  }

  lista() {
    this.limpar();
    this.getLista();
  }

  limpar() {
    this.produto = [];
    this.desserts = [];
    console.log(this.desserts);
    console.log(this.produto);
  }

  abrirProdutoDialog() {
    this.dialogState = true;
  }

  fecharProdutoDialog() {
    this.dialogState = false;
  }

  VerDetalhes(id: string) {}

  Editar(id: string) {}

  @Watch("deletarConfirm")
  async WhatDeletar(val: boolean) {
    if (val || this.deletarConfirm) {
      await this.produtoService.Excluir(this.produtoId);
      this.lista();
      this.ResetarAcoes();
    }
  }

  ResetarAcoes() {
    this.deletarConfirm = false;
    this.produtoId = "";
    this.dialogDeletar = false;
  }

  DeletarCliente(id: string) {
    this.dialogDeletar = true;
    this.produtoId = id;
    console.log(id);
  }
}
</script>

<style scoped></style>
