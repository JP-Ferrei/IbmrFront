<template>
  <div>
    <v-dialog
      :resize="ResponsividadeHelper()"
      v-model="dialog"
      persistent
      max-width="890px"
    >
      <v-form ref="formCadastroCliente" v-model="valid" lazy-validation>
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
                  <p class="font-weight-bold">Informações do cliente:</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="8" cols="12" md="8">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile">Nome</span>
                  <v-text-field
                    :rules="[
                      () =>
                        !!cliente.nome ||
                        'Por favor, forneça o nome do cliente.'
                    ]"
                    v-model="cliente.nome"
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
                        !!cliente.cpf || 'Por favor, forneça o cpf do cliente.'
                    ]"
                    v-model="cliente.cpf"
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
                        !!cliente.telefone ||
                        'Por favor, forneça a telefone do cliente.'
                    ]"
                    v-model="cliente.telefone"
                    dense
                    flat
                    :label="isMobile ? '' : 'telefone'"
                    :outlined="!isMobile"
                    :solo="!isMobile"
                    :regular="isMobile"
                  /> </v-col
                ><v-col cols="6">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile"
                    >reponsavel</span
                  >
                  <v-text-field
                    v-model="cliente.reponsavel"
                    dense
                    flat
                    :label="isMobile ? '' : 'reponsavel'"
                    :outlined="!isMobile"
                    :solo="!isMobile"
                    :regular="isMobile"
                  />
                </v-col>

                <v-col cols="6">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile">email</span>
                  <v-text-field
                    v-model="cliente.email"
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
                    v-model="cliente.dataNascimento"
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
                    <span class="textPrimary--text">Cadastrar cliente</span>
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
import Vuetify from "vuetify/lib";
import { Cliente } from "~/core/models/Ator/Cliente";
import { PageBase } from "~/core/models/PageBase";
import { ClienteService } from "../core/services/Ator/ClienteService";

@Component
export default class ClienteDialog extends PageBase {
  @Prop() value: boolean = false;
  dialog: boolean = false;

  cliente: Cliente = new Cliente();
  clienteService: ClienteService = new ClienteService();

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
      this.cliente.senha = "null";
      this.cliente.ativo = true;
      this.clienteService.post(this.cliente);
    } catch (error) {
      console.log(error);
      alert("Erro ao escrever no banco");
    } finally {
      this.loadingBotao = false;
      this.fechar();
      this.$emit("ClienteAdicionado");
    }
  }
}
</script>

<style scoped></style>
