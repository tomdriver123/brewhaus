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
  padding: 1rem;
  border: 3px solid #e0e0e0;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
}

p {
  margin: 0;
  color: #555;
  font-size: 0.8rem;
}

.type {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #888;
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 3px;
}
</style>
