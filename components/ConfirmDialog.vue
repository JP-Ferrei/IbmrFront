<template>
  <v-dialog persistent v-model="dialogConfirmar" max-width="500px">
    <v-card>
      <v-card-title
        class="text-caption text-md-body-1 text-lg-body-1 font-weight-regular"
        ><span class="text-center mx-auto">{{
          textoMensagem
        }}</span></v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="text-lg-body-2 text text-caption"
          color="blue darken-1"
          text
          @click="$emit('Confirmar')"
          >Sim</v-btn
        >
        <v-btn
          class="text-lg-body-2 text text-caption"
          color="blue darken-1"
          text
          @click="Cancelar"
          >Cancelar</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "nuxt-property-decorator";
import { PageBase } from "~/core/models/PageBase";

@Component
export default class ConfirmarDialog extends PageBase {
  @Prop() value!: boolean;
  @Prop() textoMensagem!: string;

  dialogConfirmar: boolean = false;

  @Watch("value")
  WatchValue() {
    this.dialogConfirmar = this.value;
  }

  Cancelar() {
    this.dialogConfirmar = false;
    this.$emit("Cancelar");
  }
}
</script>
