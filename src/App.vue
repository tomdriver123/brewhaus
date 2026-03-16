<script setup>
import { ref, onMounted } from 'vue'
import { getBreweries } from './api'

const breweries = ref([])

onMounted(async () => {
  breweries.value = await getBreweries({ per_page: 12 })
})
</script>

<template>
  <div id="app">
    <header>
      <h1>Brewhaus</h1>
      <p>Discover the perfect brewery for you!</p>
    </header>

    <main>
      <ul>
        <li v-for="brewery in breweries" :key="brewery.id">
          {{ brewery.name }} — {{ brewery.city }}, {{ brewery.state }}
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped>
header {
  text-align: center;
  padding: 2rem 0;
}

h1 {
  font-size: 2.4rem;
  margin: 0;
}

header p {
  color: #888;
  margin-top: 0.25rem;
}

main {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

ul {
  list-style: none;
}

li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
</style>
