<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getBrewery } from '../api'

const route = useRoute()
const brewery = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    brewery.value = await getBrewery(route.params.id)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading" class="status">Loading...</div>
  <div v-else-if="brewery" class="detail">
    <router-link to="/" class="back">← Back to list</router-link>

    <div class="card">
      <div class="card-header">
        <h2>{{ brewery.name }}</h2>
        <span class="type">{{ brewery.brewery_type }}</span>
      </div>

      <div class="fields">
        <div v-if="brewery.street" class="field">
          <strong>Address</strong>
          <p>{{ brewery.street }}</p>
          <p>{{ brewery.city }}, {{ brewery.state }} {{ brewery.postal_code }}</p>
        </div>

        <div v-if="brewery.phone" class="field">
          <strong>Phone</strong>
          <p>{{ brewery.phone }}</p>
        </div>

        <div v-if="brewery.website_url" class="field">
          <strong>Website</strong>
          <p><a :href="brewery.website_url" target="_blank">{{ brewery.website_url }}</a></p>
        </div>

        <div v-if="brewery.latitude && brewery.longitude" class="field">
          <strong>Map</strong>
          <p>
            <a
              :href="`https://www.google.com/maps?q=${brewery.latitude},${brewery.longitude}`"
              target="_blank"
            >
              View on Google Maps
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail {
  max-width: 650px;
  margin: 0 auto;
}

.back {
  display: inline-block;
  margin-bottom: 1rem;
  color: #550000;
  font-weight: 500;
  font-size: 0.9rem;
}

.back:hover {
  text-decoration: underline;
}

.card {
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  border: 3px solid #FC0000;
}

.card-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

h2 {
  margin: 0 0 0.5rem;
  font-size: 1.8rem;
}

.type {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: bold;
  color: #fff;
  background: #820000;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: capitalize;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field strong {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #ED8E8E;
  margin-bottom: 0.2rem;
}

.field p {
  margin: 0;
  font-size: 0.95rem;
}

.field a {
  color: #550000;
}

.field a:hover {
  text-decoration: underline;
}

.status {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}
</style>
