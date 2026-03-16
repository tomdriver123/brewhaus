import { createRouter, createWebHistory } from 'vue-router'
import ListView from './views/ListView.vue'
import DetailView from './views/DetailView.vue'

const routes = [
  { path: '/', component: ListView },
  { path: '/brewery/:id', component: DetailView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
