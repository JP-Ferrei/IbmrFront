<template>
  <v-app>
    <div class="d-flex">
      <MenuLateral style="top: 0px; left: 0px; z-index: 100;" />
      <TabelaAgendamentos />
    </div>
    <Nuxt />
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "nuxt-property-decorator";
import { PageBase } from "~/core/models/PageBase";

@Component
export default class Agendamentos extends PageBase {}
</script>

<style scoped></style>
