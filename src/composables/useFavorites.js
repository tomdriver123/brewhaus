import { ref, computed } from 'vue'

const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
const favorites = ref(stored)

function save() {
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

export function useFavorites() {
  function toggleFavorite(id) {
    const idx = favorites.value.indexOf(id)
    if (idx === -1) {
      favorites.value.push(id)
    } else {
      favorites.value.splice(idx, 1)
    }
    save()
  }

  function isFavorite(id) {
    return favorites.value.includes(id)
  }

  const count = computed(() => favorites.value.length)

  return { favorites, count, toggleFavorite, isFavorite }
}
