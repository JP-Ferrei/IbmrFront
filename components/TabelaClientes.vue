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
      ></v-data-table>
    </v-card>
    <ClienteDialog
      v-model="dialogState"
      @fechou="fecharDialog()"
      @ClienteAdicionado="lista()"
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
  clientes: any[] = [];
  clienteService: ClienteService = new ClienteService();
  search = "";
  dialogState: boolean = false;
  puxarLista: number = 0;

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
    { text: "responsavel", value: "responsavel" }
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
}
</script>

<style scoped></style>
