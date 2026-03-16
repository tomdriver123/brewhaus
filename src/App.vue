<template>
  <div id="app">
    <header>
      <router-link to="/">
        <h1>🍺 Brewhaus</h1>
      </router-link>
      <p>Discover the perfect brewery for you!</p>
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

main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: #ED8E8E;
}
</style>
