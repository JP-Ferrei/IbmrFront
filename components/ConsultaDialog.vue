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
                  <p class="font-weight-bold">Informações da consulta:</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="8" cols="6" md="6">
                  <v-autocomplete
                    dense
                    filled
                    rounded
                    solo
                    placeholder="Clientes"
                    v-model="consultaObject.cliente"
                    :items="emailClientes"
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                    dense
                    filled
                    rounded
                    solo
                    placeholder="Dentistas"
                    v-model="consultaObject.dentista"
                    :items="emailDentistastas"
                  ></v-autocomplete>
                </v-col>

                <v-col sm="8" cols="6" md="6">
                  <v-date-picker
                    v-model="consultaObject.data"
                    class="mt-4"
                  ></v-date-picker>
                </v-col>
                <v-col sm="8" cols="6" md="6">
                  <v-time-picker
                    v-model="consultaObject.hora"
                    format="24hr"
                  ></v-time-picker>
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
                    <span class="textPrimary--text">Cadastrar consulta</span>
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
import { Cliente } from "~/core/models/Ator/Cliente";
import { Dentista } from "~/core/models/Ator/Dentista";
import { Consulta } from "~/core/models/Geral/Consulta";
import { PageBase } from "~/core/models/PageBase";
import { UsuarioService } from "~/core/services/Ator/UsuarioService";
import { ConsultaService } from "~/core/services/geral/ConsultaService";
import { ClienteService } from "../core/services/Ator/ClienteService";
import { DentistaService } from "../core/services/Ator/DentistaService";

@Component
export default class ClienteDialog extends PageBase {
  @Prop() value: boolean = false;
  dialog: boolean = false;

  clientes: Cliente[] = [];
  dentistas: Dentista[] = [];

  emailClientes: string[] = [];
  emailDentistastas: string[] = [];

  consultaObject = {
    clienteEmail: "",
    dentistaEmail: "",
    data: "",
    hora: ""
  };

  consultaModel: any = {
    clienteId: "",
    dentistaId: "",
    dataHora: ""
  };

  date: Date = new Date();

  cliente: Cliente = new Cliente();
  clienteService: ClienteService = new ClienteService();
  dentistaService: DentistaService = new DentistaService();
  consultaService: ConsultaService = new ConsultaService();
  usuarioService: UsuarioService = new UsuarioService();

  loadingBotao: boolean = false;

  @Watch("value")
  async WatchValue() {
    this.dialog = this.value;
  }

  fechar() {
    this.$emit("fechou");
    this.dialog = false;
  }

  async created() {
    await this.populaClientes();
    await this.populaDentistas();
  }

  async populaClientes() {
    const res = await this.clienteService.ListarTudo();
    this.clientes = res.data.items;
    this.clientes.forEach((item: { email: string }) => {
      this.emailClientes.push(item.email);
    });
  }

  async populaDentistas() {
    const res = await this.dentistaService.ListarTudo();
    this.dentistas = res.data.items;
    this.dentistas.forEach((item: { email: string }) => {
      this.emailDentistastas.push(item.email);
    });
  }

  async salvar() {
    this.loadingBotao = true;

    try {
      this.consultaModel.dataHora = this.formataData(
        this.consultaObject.data,
        this.consultaObject.hora
      );

      const res = await this.consultaService.Post(this.consultaModel);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert("Erro ao escrever no banco");
    } finally {
      this.loadingBotao = false;
      this.fechar();
      this.$emit("ConsultaAdicionado");
    }
  }

  formataData(data: string, hora: string): Date {
    const d = data.split("-");

    const h = hora.split(":");
    const datacerta = new Date(
      Number(d[0]),
      Number(d[1]),
      Number(d[2]),
      Number(h[0]),
      Number(h[1]),
      0,
      0
    );

    return datacerta;
  }

  @Watch("consultaObject.cliente")
  watchCliente(val: string) {
    this.consultaModel.clienteId = this.clientes.filter(
      x => x.email.toLowerCase() === val.toLowerCase()
    )[0].id;
  }

  @Watch("consultaObject.dentista")
  watchDentista(val: string) {
    this.consultaModel.dentistaId = this.dentistas.filter(
      x => x.email.toLowerCase() === val.toLowerCase()
    )[0].id;
  }
}
</script>

<style scoped></style>
