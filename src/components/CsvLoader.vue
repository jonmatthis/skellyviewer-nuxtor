<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

const fetchData = async () => {
  try {
    const csvRoute = 'http://localhost:8000/csv'

    console.log(`Fetching data from ${csvRoute}...`)
    const response = await fetch(csvRoute)
    console.log(`Response status: ${response.status}`)
    console.log(`Response JSON: ${JSON.stringify(response, null, 2)}`)
    if (!response.ok) {
      throw new Error(`Network response was not ok - Response status: ${response.status}`)
    }

    const result = await response.text()
    console.log(`Result: ${result}`)
    data.value = result
  } catch (err) {
    error.value = err
  }
}
</script>

<template>
  <button @click="fetchData">Fetch CSV Data</button>
  <div v-if="error">{{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>
