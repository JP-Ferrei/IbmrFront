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
        ><template v-slot:top>
          <v-text-field
            v-model="search"
            label="Pesquisar Nome"
            class="mx-4"
          ></v-text-field>
        </template>
      </v-data-table>
    </v-card>
    <ConsultaDialog
      v-model="dialogState"
      @fechou="fecharDialog()"
      @ConsultaAdicionado="lista()"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch } from "nuxt-property-decorator";
import { PageBase } from "~/core/models/PageBase";
import { Consulta } from "~/core/models/Geral/Consulta";
import { ConsultaService } from "~/core/services/geral/ConsultaService";

@Component
export default class TabelaClientes extends PageBase {
  consultas: Consulta[] = [];
  search = "";
  dialogState: boolean = false;
  puxarLista: number = 0;

  consultaService: ConsultaService = new ConsultaService();
  desserts: any = [];
  colunas: any = [
    { text: "id", value: "id" },
    { text: "Cliente", value: "cliente.nome", sortable: true },
    { text: "Dentista", value: "dentista.nome", sortable: true },
    { text: "Data", value: "dataHora" }
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
    const res = await this.consultaService.Get("Cliente,Dentista");
    this.consultas.push(res.data.items);
    this.desserts = this.consultas[0];
  }

  lista() {
    this.limpar();
    this.getLista();
  }

  limpar() {
    this.consultas = [];
    this.desserts = [];
    console.log(this.desserts);
    console.log(this.consultas);
  }
}
</script>

<style scoped></style>
