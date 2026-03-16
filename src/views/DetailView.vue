<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getBrewery } from '../api'

const route = useRoute()
const brewery = ref(null)

onMounted(async () => {
  brewery.value = await getBrewery(route.params.id)
})
</script>

<template>
  <div v-if="brewery" class="detail">
    <router-link to="/" class="back">← Back to list</router-link>

    <h2>{{ brewery.name }}</h2>
    <span class="type">{{ brewery.brewery_type }}</span>

    <div class="info">
      <div v-if="brewery.street">
        <strong>Address</strong>
        <p>{{ brewery.street }}</p>
        <p>{{ brewery.city }}, {{ brewery.state }} {{ brewery.postal_code }}</p>
      </div>

      <div v-if="brewery.phone">
        <strong>Phone</strong>
        <p>{{ brewery.phone }}</p>
      </div>

      <div v-if="brewery.website_url">
        <strong>Website</strong>
        <p><a :href="brewery.website_url" target="_blank">{{ brewery.website_url }}</a></p>
      </div>

      <div v-if="brewery.latitude && brewery.longitude">
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
</template>

<style scoped>
.detail {
  max-width: 600px;
}

.back {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #550000;
  font-size: 0.9rem;
}

.back:hover {
  text-decoration: underline;
}

h2 {
  margin: 0 0 0.5rem;
  font-size: 1.8rem;
}

.type {
  display: inline-block;
  font-size: 0.8rem;
  color: #666;
  background: #f0f0f0;
  padding: 3px 10px;
  border-radius: 3px;
  text-transform: capitalize;
  margin-bottom: 1.5rem;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info strong {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 0.2rem;
}

.info p {
  margin: 0;
  font-size: 0.95rem;
}

.info a {
  color: #550000;
}

.info a:hover {
  text-decoration: underline;
}
</style>
