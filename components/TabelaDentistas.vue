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
        sort-by="nome"
        :search="search"
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

        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Pesquisar Nome"
            class="mx-4"
          ></v-text-field>
        </template>
      </v-data-table>
    </v-card>
    <DentistaDialog
      v-model="dialogState"
      @fechou="fecharDialog()"
      @DentistaAdicionado="lista()"
    />

    <ConfirmDialog
      @Confirmar="deletarConfirm = true"
      @Cancelar="dialogDeletar = false"
      :textoMensagem="'Tem certeza que deseja deletar este Dentista?'"
      v-model="dialogDeletar"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch } from "nuxt-property-decorator";
import { PageBase } from "~/core/models/PageBase";
import { DentistaService } from "~/core/services/Ator/DentistaService";
import { Dentista } from "~/core/models/Ator/Dentista";

@Component
export default class TabelaDentistas extends PageBase {
  dialogState: boolean = false;
  search = "";

  dialogDeletar: boolean = false;
  deletarConfirm: boolean = false;
  dentistaId: string = "";

  dentistaService: DentistaService = new DentistaService();

  dentistaArray: any[] = [];
  vazio: [] = [];
  desserts: any = [];
  colunas: any = [
    {
      text: "dentista",
      align: "start",
      sortable: true,
      value: "nome"
    },
    { text: "id", value: "id" },
    { text: "email", value: "email" },
    { text: "telefone", value: "telefone" },
    { text: "Cro", value: "cro" },
    { text: "opções", value: "actions", sortable: false }
  ];

  abrirDialog() {
    this.dialogState = true;
  }

  fecharDialog() {
    this.dialogState = false;
  }

  async created() {
    this.getLista();
  }

  async getLista() {
    const res = await this.dentistaService.ListarTudo();
    this.dentistaArray.push(res.data.items);
    this.desserts = this.dentistaArray[0];
  }

  lista() {
    this.limpar();
    this.getLista();
    console.log("limpar");
  }

  limpar() {
    this.$nuxt.$router.push({ name: "Dentistas" });
    this.desserts = [];
    this.dentistaArray = [];
    console.log(this.desserts);
    console.log(this.dentistaArray);
  }

  @Watch("deletarConfirm")
  async WhatDeletar(val: boolean) {
    if (val || this.deletarConfirm) {
      await this.dentistaService.Excluir(this.dentistaId);
      this.lista();
      this.ResetarAcoes();
    }
  }

  ResetarAcoes() {
    this.deletarConfirm = false;
    this.dentistaId = "";
    this.dialogDeletar = false;
  }

  DeletarCliente(id: string) {
    this.dialogDeletar = true;
    this.dentistaId = id;
    console.log(id);
  }
}
</script>

<style scoped></style>
