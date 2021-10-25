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
                  <p class="font-weight-bold">Informações do produto:</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="8" cols="12" md="8">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile">Nome</span>
                  <v-text-field
                    :rules="[
                      () =>
                        !!produto.nome ||
                        'Por favor, forneça o nome do produto.'
                    ]"
                    v-model="produto.nome"
                    dense
                    flat
                    :label="isMobile ? '' : 'Nome'"
                    :outlined="!isMobile"
                    :solo="!isMobile"
                    :regular="isMobile"
                  />
                </v-col>
                <v-col cols="2">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile"
                    >Quantidade</span
                  >
                  <v-text-field
                    :rules="[
                      () =>
                        !!produto.quantidade ||
                        'Por favor, forneça a quantidade do produto.'
                    ]"
                    v-model="produto.quantidade"
                    dense
                    flat
                    :label="isMobile ? '' : 'quantidade'"
                    :outlined="!isMobile"
                    :solo="!isMobile"
                    :regular="isMobile"
                  />
                </v-col>

                <v-col cols="6">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile"
                    >Validade</span
                  >
                  <v-text-field
                    :rules="[
                      () =>
                        !!produto.Validade ||
                        'Por favor, forneça a Validade do produto.'
                    ]"
                    v-model="produto.Validade"
                    dense
                    flat
                    :label="isMobile ? '' : 'validade'"
                    :outlined="!isMobile"
                    :solo="!isMobile"
                    :regular="isMobile"
                  /> </v-col
                ><v-col cols="6">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile"
                    >Descricao</span
                  >
                  <v-text-field
                    :rules="[
                      () =>
                        !!produto.Descricao ||
                        'Por favor, forneça a Descricao do produto.'
                    ]"
                    v-model="produto.Descricao"
                    dense
                    flat
                    :label="isMobile ? '' : 'Descricao'"
                    :outlined="!isMobile"
                    :solo="!isMobile"
                    :regular="isMobile"
                  />
                </v-col>
              </v-row>
              <v-row justify="center" class="mt-7">
                <v-col cols="9" md="3" sm="5">
                  <v-btn
                    @click="Salvar"
                    :loading="loadingBotao"
                    color="primary"
                    width="100%"
                    large
                  >
                    <span class="textPrimary--text">Cadastrar Produto</span>
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
import { Component, Prop, Watch } from "vue-property-decorator";
import { Produto } from "~/core/models/Geral/Produto";
import { PageBase } from "~/core/models/PageBase";

@Component
export default class ProdutoDialog extends PageBase {
  @Prop() value: boolean = false;
  dialog: boolean = false;

  produto: Produto = new Produto();

  @Watch("value")
  async WatchValue() {
    this.dialog = this.value;
  }

  fechar() {
    this.$emit("fechou");
    this.dialog = false;
  }

  salvar() {}
}
</script>

<style scoped></style>
