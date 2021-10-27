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
    <DentistaDialog
      v-model="dialogState"
      @fechou="fecharDialog()"
      @DentistaAdicionado="lista()"
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
  dentistaArray: any[] = [];
  search = "";
  dialogState: boolean = false;

  dentistaService: DentistaService = new DentistaService();

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
    { text: "cpf", value: "cpf" },
    { text: "email", value: "email" },
    { text: "telefone", value: "telefone" },
    { text: "Cro", value: "cro" }
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
}
</script>

<style scoped></style>
