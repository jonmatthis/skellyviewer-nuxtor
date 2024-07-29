<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera/>
    <TresGridHelper/>
    <AnimatedBox />
    <OrbitControls/>
  </TresCanvas>
</template>

<script setup lang="ts">
const csvStore = useCsvStore();
console.log('csvStore', csvStore);
</script>
