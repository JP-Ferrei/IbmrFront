<template>
  <div>
    <v-dialog
      :resize="ResponsividadeHelper()"
      v-model="dialog"
      persistent
      max-width="890px"
    >
      <v-form ref="formCadastroDentista" v-model="valid" lazy-validation>
        <v-card>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn rounded icon class="my-5" depressed @click="fechar()">
                    <v-icon color="textDarkGray" dark>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <p class="font-weight-bold">Informações do dentista:</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="8" cols="12" md="8">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile">Nome</span>
                  <v-text-field
                    :rules="[
                      () =>
                        !!dentista.nome ||
                        'Por favor, forneça o nome do dentista.'
                    ]"
                    v-model="dentista.nome"
                    dense
                    flat
                    :label="isMobile ? '' : 'Nome'"
                    :outlined="!isMobile"
                    :solo="!isMobile"
                    :regular="isMobile"
                  />
                </v-col>
                <v-col cols="2">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile">Cpf</span>
                  <v-text-field
                    :rules="[
                      () =>
                        !!dentista.cpf ||
                        'Por favor, forneça o cpf do dentista.'
                    ]"
                    v-model="dentista.cpf"
                    dense
                    flat
                    :label="isMobile ? '' : 'Cpf'"
                    :outlined="!isMobile"
                    :solo="!isMobile"
                    :regular="isMobile"
                  />
                </v-col>

                <v-col cols="6">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile"
                    >telefone</span
                  >
                  <v-text-field
                    :rules="[
                      () =>
                        !!dentista.telefone ||
                        'Por favor, forneça a telefone do dentista.'
                    ]"
                    v-model="dentista.telefone"
                    dense
                    flat
                    :label="isMobile ? '' : 'telefone'"
                    :outlined="!isMobile"
                    :solo="!isMobile"
                    :regular="isMobile"
                  /> </v-col
                ><v-col cols="6">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile">cro</span>
                  <v-text-field
                    v-model="dentista.cro"
                    dense
                    flat
                    :label="isMobile ? '' : 'cro'"
                    :outlined="!isMobile"
                    :solo="!isMobile"
                    :regular="isMobile"
                  />
                </v-col>

                <v-col cols="6">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile">email</span>
                  <v-text-field
                    v-model="dentista.email"
                    dense
                    flat
                    :label="isMobile ? '' : 'email'"
                    :outlined="!isMobile"
                    :solo="!isMobile"
                    :regular="isMobile"
                  />
                </v-col>

                <v-col cols="6">
                  <span class="d-block mt-5 mb-2">Data de Nascimento</span>
                  <v-date-picker
                    v-model="dentista.dataNascimento"
                    color="#89FFD5"
                  ></v-date-picker>
                </v-col>
              </v-row>
              <v-row justify="center" class="mt-7">
                <v-col cols="9" md="3" sm="5">
                  <v-btn
                    @click="salvar()"
                    :loading="loadingBotao"
                    color="primary"
                    width="100%"
                    large
                  >
                    <span class="textPrimary--text">Cadastrar dentista</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "nuxt-property-decorator";
import { Dentista } from "~/core/models/Ator/Dentista";
import { PageBase } from "~/core/models/PageBase";
import { DentistaService } from "../core/services/Ator/DentistaService";

@Component
export default class DentistaDialog extends PageBase {
  @Prop() value: boolean = false;
  dialog: boolean = false;

  dentista: Dentista = new Dentista();
  dentistaService: DentistaService = new DentistaService();

  loadingBotao: boolean = false;

  @Watch("value")
  async WatchValue() {
    this.dialog = this.value;
  }

  fechar() {
    this.$emit("fechou");
    this.dialog = false;
  }

  async salvar() {
    this.loadingBotao = true;

    try {
      this.dentista.senha = "null";
      this.dentista.ativo = true;
      this.dentistaService.post(this.dentista);
    } catch (error) {
      console.log(error);
      alert("Erro ao escrever no banco");
    } finally {
      this.loadingBotao = false;
      this.fechar();
      this.$emit("DentistaAdicionado");
    }
  }
}
</script>

<style scoped></style>
