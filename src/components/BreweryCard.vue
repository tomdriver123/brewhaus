<script setup>
import { useFavorites } from '../composables/useFavorites'

const props = defineProps(['brewery'])
const { toggleFavorite, isFavorite } = useFavorites()

function onFav(e) {
  e.preventDefault()
  toggleFavorite(props.brewery.id)
}
</script>

<template>
  <div class="card">
    <div class="card-top">
      <h3>{{ brewery.name }}</h3>
      <button class="fav-btn" @click="onFav">
        {{ isFavorite(brewery.id) ? '♥' : '♡' }}
      </button>
    </div>
    <p>{{ brewery.city }}, {{ brewery.state }}</p>
    <span class="type">{{ brewery.brewery_type }}</span>
  </div>
</template>

<style scoped>
.card {
  padding: 1.25rem;
  border: 3px solid #FC0000;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

h3 {
  margin: 0 0 0.3rem;
  font-size: 1.05rem;
}

.fav-btn {
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: #c00;
  padding: 0;
  line-height: 1;
  flex-shrink: 0;
}

p {
  margin: 0;
  color: #555;
  font-size: 0.85rem;
}

.type {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  color: #fff;
  background: #820000;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: capitalize;
}
</style>
