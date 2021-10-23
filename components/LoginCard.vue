<template>
  <div style="width: 97vw; height: 100%; margin:auto">
    <v-col md="3" lg="3" xl="3">
      <v-row
        class="my-10 mx-auto d-flex justify-center align-center"
        style="width:300px"
      >
        <div style="background-color:#89FFD5; border-radius: 50%">
          <v-icon size="150" color=""> mdi-account-outline</v-icon>
        </div>
      </v-row>

      <v-row class="d-flex align-center justify-center mx-auto mt-5">
        <h1>Clinica Ibmr</h1></v-row
      >
      <v-row class="mt-10">
        <v-col width="400px">
          <v-text-field
            label="Email"
            placeholder="Email"
            filled
            rounded
            dense
            append-icon="mdi-account"
            max-width="400px"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col width="400px">
          <v-text-field
            label="Senha"
            placeholder="Senha"
            filled
            rounded
            dense
            append-icon="mdi-lock"
            width="400px"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-col class="d-flex justify-center"
        ><v-btn
          width="200px"
          rounded
          color="#89FFD5"
          dark
          @click="login()"
          :loading="carregando"
        >
          login
        </v-btn></v-col
      >
    </v-col>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "nuxt-property-decorator";

@Component
export default class LoginCard extends Vue {
  carregando: boolean = false;

  async login() {
    this.carregando = true;
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    await delay(5000);
    this.carregando = false;
  }
}
</script>

<style scoped></style>
