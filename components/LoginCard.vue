<template>
  <div
    style="width: 97vw; height: 100%; display: flex; justify-content:center; align-items:center"
  >
    <v-col
      md="3"
      lg="3"
      xl="3"
      class="d-flex mx-auto justify-center align-center"
    >
      <v-row
        class="my-10 mx-auto d-flex justify-center align-center"
        style="width:300px; "
      >
        <div style="background-color:#89FFD5; border-radius: 50%; margin:auto">
          <v-icon size="150" color=""> mdi-account-outline</v-icon>
        </div>
      </v-row>

      <v-row
        class="d-flex align-center justify-center mx-auto mt-5 "
        style="margin-left: 50px"
      >
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
            v-model="acesso.email"
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
            v-model="acesso.senha"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-col class="d-flex justify-center align-center"
        ><v-btn
          width="100%"
          rounded
          color="#89FFD5"
          dark
          @click="login()"
          :loading="carregando"
          ref="butao"
        >
          login
        </v-btn></v-col
      >
      <v-row v-show="menssagemErro" style="margin:auto; ">
        <span style="margin:auto"> {{ menssagemErro }}</span>
      </v-row>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "nuxt-property-decorator";
import { AutenticadorService } from "../core/services/geral/AutenticadorService";
import { PageBase } from "~/core/models/PageBase";

@Component
export default class LoginCard extends PageBase {
  carregando: boolean = false;
  autenticador: AutenticadorService = new AutenticadorService();
  menssagemErro: string = "";

  acesso: { email: string; senha: string } = {
    email: "",
    senha: ""
  };

  async login() {
    this.carregando = true;
    try {
      console.log("1");
      const res = await this.autenticador.AutenticarUsuario(this.acesso);
      console.log("2");
      localStorage.setItem("sessionApp", JSON.stringify(res.data));
      console.log("3");

      this.$router.push({ name: "index" });
      this.$nuxt.$router.push({ name: "index" });
      console.log("4");

      console.log(res.data);
      console.log("5");
    } catch (error) {
      this.menssagemErro = "Email ou senha Incorreto";
    } finally {
      this.carregando = false;
    }
  }
}
</script>

<style scoped></style>
