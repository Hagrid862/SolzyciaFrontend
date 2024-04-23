<script setup>
import 'ant-design-vue/dist/reset.css';
import {theme} from "ant-design-vue";

const { defaultAlgorithm, darkAlgorithm } = theme;
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  background-color: #000;
  color: #f0f0f0;
}
</style>