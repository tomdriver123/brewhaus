<script setup>
import { ref, onMounted } from 'vue'
import { getBreweries } from './api'
import BreweryCard from './components/BreweryCard.vue'

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
      <div class="brewery-list">
        <BreweryCard
          v-for="brewery in breweries"
          :key="brewery.id"
          :brewery="brewery"
        />
      </div>
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

.brewery-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
