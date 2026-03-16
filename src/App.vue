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
      <h1>🍺 Brewhaus</h1>
      <p>Discover the perfect brewery for you!</p>
    </header>

    <main>
      <div class="grid">
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
  padding: 2.5rem 1rem;
  background: #2c3e50;
  color: #fff;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.4rem;
  margin: 0;
}

header p {
  color: #aab;
  margin-top: 0.4rem;
  font-size: 1.05rem;
}

main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
