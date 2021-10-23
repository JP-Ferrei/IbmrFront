<template>
  <div class="contaier d-flex align-center  xxx">
    <div class="d-flex align-center justify-start">
      <LoginCard />
    </div>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "nuxt-property-decorator";

@Component
export default class Login extends Vue {}
</script>
