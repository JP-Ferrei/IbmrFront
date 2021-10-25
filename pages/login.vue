<template>
  <div class="" style="margin:auto;">
    <div class="teste" style="margin:auto;">
      <LoginCard class="d-flex justify-center align-center" />
    </div>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "nuxt-property-decorator";
import { PageBase } from "~/core/models/PageBase";

@Component
export default class Login extends PageBase {}
</script>
