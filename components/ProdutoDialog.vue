<template>
  <div>
    <v-dialog
      :resize="ResponsividadeHelper()"
      v-model="dialog"
      persistent
      max-width="890px"
    >
      <v-form ref="formCadastroCliente" lazy-validation>
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
                    >validade</span
                  >
                  <v-date-picker
                    v-model="produto.validade"
                    color="#89FFD5"
                  ></v-date-picker> </v-col
                ><v-col cols="6">
                  <span class="d-block mt-5 mb-n2" v-if="isMobile"
                    >descricao</span
                  >
                  <v-text-field
                    :rules="[
                      () =>
                        !!produto.descricao ||
                        'Por favor, forneça a descricao do produto.'
                    ]"
                    v-model="produto.descricao"
                    dense
                    flat
                    :label="isMobile ? '' : 'descricao'"
                    :outlined="!isMobile"
                    :solo="!isMobile"
                    :regular="isMobile"
                  />
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
import { Armazem } from "~/core/models/Geral/Armazem";
import { Produto } from "~/core/models/Geral/Produto";
import { PageBase } from "~/core/models/PageBase";
import { ArmazemService } from "~/core/services/geral/ArmazemService";
import { ProdutoService } from "~/core/services/geral/ProdutoService";

@Component
export default class ProdutoDialog extends PageBase {
  @Prop() value: boolean = false;
  dialog: boolean = false;

  loadingBotao: boolean = false;
  armazem: Armazem = new Armazem();

  produto: Produto = new Produto();
  produtoService: ProdutoService = new ProdutoService();
  armazemService: ArmazemService = new ArmazemService();
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
      // const res = await this.armazemService.AdicionarProduto(
      //   this.armazem.id,
      //   this.produto
      // );
      const produtoObject = {
        nome: this.produto.nome,
        quantidade: this.produto.quantidade,
        descricao: this.produto.descricao,
        validade: this.produto.validade.toString(),
        armazemId: this.produto.armazem.id
      };

      console.log(produtoObject);
      const res = await this.produtoService.Post(produtoObject);
    } catch (error) {
      console.log(error);
      alert("Erro ao escrever no banco");
    } finally {
      this.loadingBotao = false;
      this.fechar();
      this.$emit("produtoAdicionado");
    }
  }

  async getArmazemid() {
    const response = await this.armazemService.GetFirst();
    this.armazem = response.data;
    this.produto.armazem = this.armazem;
  }

  async created() {
    await this.getArmazemid();
    console.log(this.produto.armazem);
  }
}
</script>

<style scoped></style>
