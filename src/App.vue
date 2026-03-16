<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getBreweries, searchBreweries, getBreweriesMeta } from './api'
import BreweryCard from './components/BreweryCard.vue'

const breweries = ref([])
const page = ref(1)
const perPage = 18
const total = ref(0)
const search = ref('')

let debounceTimer = null

const totalPages = computed(() => Math.ceil(total.value / perPage))

async function loadBreweries() {
  const params = { page: page.value, per_page: perPage }

  if (search.value.trim()) {
    breweries.value = await searchBreweries(search.value.trim(), params)
    const meta = await getBreweriesMeta({ by_name: search.value.trim() })
    total.value = parseInt(meta.total)
  } else {
    breweries.value = await getBreweries(params)
    const meta = await getBreweriesMeta()
    total.value = parseInt(meta.total)
  }
}

onMounted(() => {
  loadBreweries()
})

watch(page, () => {
  loadBreweries()
})

watch(search, () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    page.value = 1
    loadBreweries()
  }, 350)
})
</script>

<template>
  <div id="app">
    <header>
      <h1>🍺 Brewhaus</h1>
      <p>Discover the perfect brewery for you!</p>
    </header>

    <main>
      <div class="search-bar">
        <input
          v-model="search"
          type="text"
          placeholder="Search breweries..."
        />
        <button v-if="search" class="clear-btn" @click="search = ''">✕</button>
      </div>

      <div class="grid">
        <BreweryCard
          v-for="brewery in breweries"
          :key="brewery.id"
          :brewery="brewery"
        />
      </div>

      <div class="pagination">
        <button :disabled="page <= 1" @click="page--">Prev</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button :disabled="page >= totalPages" @click="page++">Next</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
header {
  text-align: center;
  padding: 2.5rem 1rem;
  background: #550000;
  color: #fff;
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
  padding: 1rem 2rem;
  background: #ED8E8E;
}

.search-bar {
  position: relative;
  margin-bottom: 1rem;
}

.search-bar input {
  width: 100%;
  padding: 0.6rem 2.5rem 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
}

.search-bar input:focus {
  border-color: #550000;
}

.clear-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1rem;
  color: #999;
  cursor: pointer;
}

.clear-btn:hover {
  color: #333;
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

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 0;
}

.pagination button {
  padding: 0.4rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 0.9rem;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
  background: #f0f0f0;
}

.pagination span {
  font-size: 0.9rem;
  color: #333;
}
</style>
