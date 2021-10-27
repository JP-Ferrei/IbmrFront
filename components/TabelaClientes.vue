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
        @click="abrirDialog()"
        ><v-icon class="mr-1">mdi-plus</v-icon>Adicionar</v-btn
      >
    </v-col>

    <v-card>
      <v-data-table
        :headers="colunas"
        :items="desserts"
        item-key="nome"
        class="elevation-1"
        :search="search"
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
            @click="EditarCliente(item.id)"
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
      </v-data-table>
    </v-card>
    <ClienteDialog
      v-model="dialogState"
      @fechou="fecharDialog()"
      @ClienteAdicionado="lista()"
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
import { Cliente } from "~/core/models/Ator/Cliente";
import { PageBase } from "~/core/models/PageBase";
import { ClienteService } from "../core/services/Ator/ClienteService";

@Component
export default class TabelaClientes extends PageBase {
  dialogState: boolean = false;

  dialogDeletar: boolean = false;
  deletarConfirm: boolean = false;
  clienteId: string = "";

  clienteService: ClienteService = new ClienteService();

  search = "";
  clientes: any[] = [];
  desserts: any = [];
  colunas: any = [
    {
      text: "cliente nome",
      align: "start",
      sortable: true,
      value: "nome"
    },
    { text: "id", value: "id" },
    { text: "cpf", value: "cpf" },
    { text: "email", value: "email" },
    { text: "telefone", value: "telefone" },
    { text: "opções", value: "actions", sortable: false }
  ];

  abrirDialog() {
    this.dialogState = true;
  }

  fecharDialog() {
    this.dialogState = false;
  }

  async created() {
    this.getListaClientes();
  }

  async getListaClientes() {
    const res = await this.clienteService.ListarTudo();
    this.clientes.push(res.data.items);
    this.desserts = this.clientes[0];
  }

  lista() {
    this.limpar();
    this.getListaClientes();
  }

  limpar() {
    this.clientes = [];
    this.desserts = [];
    console.log(this.desserts);
    console.log(this.clientes);
  }

  VerDetalhes(id: string) {}

  Editar(id: string) {}

  @Watch("deletarConfirm")
  async WhatDeletar(val: boolean) {
    if (val || this.deletarConfirm) {
      await this.clienteService.Excluir(this.clienteId);
      this.lista();
      this.ResetarAcoes();
    }
  }

  ResetarAcoes() {
    this.deletarConfirm = false;
    this.clienteId = "";
    this.dialogDeletar = false;
  }

  DeletarCliente(id: string) {
    this.dialogDeletar = true;
    this.clienteId = id;
    console.log(id);
  }
}
</script>

<style scoped></style>
