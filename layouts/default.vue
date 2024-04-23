<template>
  <div>
    <div class="p-4 flex flex-row bg-white bg-opacity-10 mx-2 mt-2 rounded-xl items-center justify-between fixed z-50 w-[calc(100vw-1rem)] top-0 backdrop-blur-lg">
      <div class="text-lg font-semibold">
        Sól życia
      </div>
      <div>
        <nuxt-link to="/o-nas" class="mx-3 my-0 text-sm  transition-all duration-300 hover:mx-1 hover:p-2 hover:bg-white hover:bg-opacity-15 rounded-md">O NAS</nuxt-link>
        <nuxt-link to="/off-road" class="mx-3 my-0 text-sm  transition-all duration-300 hover:mx-1 hover:p-2 hover:bg-white hover:bg-opacity-15 rounded-md">OFF-ROAD</nuxt-link>
        <nuxt-link to="/kontakt" class="mx-3 my-0 text-sm  transition-all duration-300 hover:mx-1 hover:p-2 hover:bg-white hover:bg-opacity-15 rounded-md">OFERTA</nuxt-link>
        <nuxt-link to="/kontakt" class="mx-3 my-0 text-sm  transition-all duration-300 hover:mx-1 hover:p-2 hover:bg-white hover:bg-opacity-15 rounded-md">GALERIA</nuxt-link>
        <nuxt-link to="/kontakt" class="mx-3 my-0 text-sm  transition-all duration-300 hover:mx-1 hover:p-2 hover:bg-white hover:bg-opacity-15 rounded-md">KONTAKT</nuxt-link>
      </div>
    </div>
    <div style="margin-top: 50px">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
</script>