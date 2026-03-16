<script setup>
import { useFavorites } from './composables/useFavorites'

const { count } = useFavorites()
</script>

<template>
  <div id="app">
    <header>
      <router-link to="/">
        <h1>🍺 Brewhaus</h1>
      </router-link>
      <p>Discover the perfect brewery for you!</p>
      <span v-if="count > 0" class="fav-count">♥ {{ count }} favorite{{ count !== 1 ? 's' : '' }}</span>
    </header>

    <main>
      <router-view />
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

header a {
  color: inherit;
  text-decoration: none;
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

.fav-count {
  display: inline-block;
  margin-top: 0.6rem;
  font-size: 0.85rem;
  color: #ED8E8E;
}

main {
  min-height: calc(100vh - 130px);
  background: #ED8E8E;
  padding: 1.5rem 2rem;
}

main > * {
  max-width: 1100px;
  margin: 0 auto;
}
</style>
