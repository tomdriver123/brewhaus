<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getBreweries, searchBreweries, getBreweriesMeta } from '../api'
import { useFavorites } from '../composables/useFavorites'
import BreweryCard from '../components/BreweryCard.vue'

const breweries = ref([])
const page = ref(1)
const perPage = 18
const total = ref(0)
const search = ref('')
const breweryType = ref('')
const loading = ref(false)
const error = ref(null)
const showFavsOnly = ref(false)

const { favorites, isFavorite } = useFavorites()

const types = ['micro', 'nano', 'regional', 'brewpub', 'large', 'planning', 'contract', 'proprietor', 'closed']

let debounceTimer = null

const totalPages = computed(() => Math.ceil(total.value / perPage))

const displayedBreweries = computed(() => {
  if (showFavsOnly.value) {
    return breweries.value.filter(b => isFavorite(b.id))
  }
  return breweries.value
})

async function loadBreweries() {
  loading.value = true
  error.value = null

  try {
    const params = { page: page.value, per_page: perPage }
    if (breweryType.value) params.by_type = breweryType.value

    if (search.value.trim()) {
      breweries.value = await searchBreweries(search.value.trim(), params)
      const meta = await getBreweriesMeta({ by_name: search.value.trim(), ...params })
      total.value = parseInt(meta.total)
    } else {
      breweries.value = await getBreweries(params)
      const metaParams = breweryType.value ? { by_type: breweryType.value } : {}
      const meta = await getBreweriesMeta(metaParams)
      total.value = parseInt(meta.total)
    }
  } catch (e) {
    error.value = 'Failed to load breweries. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBreweries()
})

watch(page, () => {
  window.scrollTo(0, 0)
  loadBreweries()
})

watch(search, () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    if (page.value !== 1) {
      page.value = 1
    } else {
      loadBreweries()
    }
  }, 350)
})

watch(breweryType, () => {
  if (page.value !== 1) {
    page.value = 1
  } else {
    loadBreweries()
  }
})
</script>

<template>
  <div>
    <div class="controls">
      <div class="search-bar">
        <input
          v-model="search"
          type="text"
          placeholder="Search breweries..."
        />
        <button v-if="search" class="clear-btn" @click="search = ''">✕</button>
      </div>

      <select v-model="breweryType">
        <option value="">All types</option>
        <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
      </select>

      <button
        :class="['fav-filter', { active: showFavsOnly }]"
        @click="showFavsOnly = !showFavsOnly"
      >
        ♥
      </button>
    </div>

    <div v-if="loading" class="status">Loading...</div>
    <div v-else-if="error" class="status error">{{ error }}</div>
    <div v-else-if="breweries.length === 0" class="status">No breweries found.</div>

    <template v-else>
      <div v-if="displayedBreweries.length === 0" class="status">No favorites on this page.</div>

      <div v-else class="grid">
        <router-link
          v-for="brewery in displayedBreweries"
          :key="brewery.id"
          :to="`/brewery/${brewery.id}`"
        >
          <BreweryCard :brewery="brewery" />
        </router-link>
      </div>

      <div class="pagination">
        <button :disabled="page <= 1" @click="page--">Prev</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button :disabled="page >= totalPages" @click="page++">Next</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.search-bar {
  position: relative;
  flex: 1;
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

select {
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  outline: none;
  text-transform: capitalize;
  cursor: pointer;
}

select:focus {
  border-color: #550000;
}

.fav-filter {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  font-size: 1rem;
  cursor: pointer;
  color: #999;
}

.fav-filter.active {
  background: #c00;
  color: #fff;
  border-color: #c00;
}

.status {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
  font-size: 1rem;
}

.status.error {
  color: #c00;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.grid a {
  text-decoration: none;
  color: inherit;
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

  .controls {
    flex-direction: column;
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
