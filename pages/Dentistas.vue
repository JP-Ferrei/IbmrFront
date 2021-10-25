<template>
  <v-app>
    <MenuLateral style="top: 0px; left: 0px; " />
    <Nuxt />
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "nuxt-property-decorator";
import { PageBase } from "~/core/models/PageBase";

@Component
export default class Dentistas extends PageBase {}
</script>

<style scoped></style>
