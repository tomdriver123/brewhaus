<script setup>
defineProps(['brewery'])
</script>

<template>
  <div class="card">
    <h3>{{ brewery.name }}</h3>
    <p>{{ brewery.city }}, {{ brewery.state }}</p>
    <span class="type">{{ brewery.brewery_type }}</span>
  </div>
</template>

<style scoped>
.card {
  padding: 1.25rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

h3 {
  margin: 0 0 0.3rem;
  font-size: 1.05rem;
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
  color: #666;
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 3px;
  text-transform: capitalize;
}
</style>
