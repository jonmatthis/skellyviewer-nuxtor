<script setup>
const { data, error } = useFetch('http://localhost:8000/csv')
</script>

<template>
  <div v-if="error">{{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>
