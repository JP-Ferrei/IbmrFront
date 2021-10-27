<template>
  <div>
    <v-card>
      <v-navigation-drawer
        :mini-variant="mini"
        height="100vh"
        permanent
        mini-variant-width="80px"
      >
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>{{ usuario.nome }}</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon class="d-flex align-center justify-center">
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="to(item)"
                    width="100%"
                  >
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-btn>
                </template>
                <span>{{ item.title }}</span>
              </v-tooltip>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
        <v-btn width="100%" depressed height="50" color="error" @click="sair()"
          ><v-icon> mdi-logout </v-icon>
        </v-btn>
      </v-navigation-drawer>
    </v-card>
  </div>
  <!-- <div style="background: red; height:100vh; width:60px">
    <v-btn></v-btn>
  </div> -->
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "nuxt-property-decorator";
import { Usuario } from "~/core/models/Ator/Usuario";
import { PageBase } from "~/core/models/PageBase";
import { UsuarioService } from "../core/services/Ator/UsuarioService";

@Component
export default class MenuLateral extends PageBase {
  usuarioService: UsuarioService = new UsuarioService();
  usuario: Usuario = new Usuario();
  items: any[] = [
    { title: "Clientes", icon: "mdi-account-outline", to: "/Clientes" },
    { title: "Dentistas", icon: "mdi-account-multiple", to: "/Dentistas" },
    { title: "Estoque", icon: "mdi-folder", to: "/Estoque" },
    { title: "Agendamentos", icon: "mdi-calendar", to: "/Agendamentos" }
  ];
  mini: boolean = true;
  async created() {
    const response = await this.usuarioService.ObterPorId(this.app.usuarioId);
    this.usuario = response.data;
  }

  to(item: any) {
    this.$router.push(item.to);
  }

  sair() {
    localStorage.clear();
    this.$router.push({ name: "login" });
  }
}
</script>

<style scoped></style>
