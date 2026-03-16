import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.openbrewerydb.org/v1'
})

export function getBreweries(params) {
  return api.get('/breweries', { params }).then(res => res.data)
}

export function getBrewery(id) {
  return api.get(`/breweries/${id}`).then(res => res.data)
}

export function searchBreweries(query, params) {
  return api.get('/breweries/search', { params: { query, ...params } }).then(res => res.data)
}

export function getBreweriesMeta(params) {
  return api.get('/breweries/meta', { params }).then(res => res.data)
}
