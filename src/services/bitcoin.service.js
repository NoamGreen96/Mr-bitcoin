import axios from 'axios'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

export const bitcoinService = {
  getRate: async function () {
    const cachedData = utilService.loadFromStorage('bitcoinRate')
    if (cachedData) {
      return cachedData
    }
    const response = await axios.get('https://blockchain.info/ticker')
    const data = response.data
    utilService.saveToStorage('bitcoinRate', data)
    return data
  },

  getMarketPriceHistory: async function (timespan) {
    const cacheKey = `marketPriceHistory-${timespan}`
    const cachedData = utilService.loadFromStorage(cacheKey)
    if (cachedData) {
      return cachedData
    }

    const url = `https://api.blockchain.info/charts/market-price?timespan=${timespan}&format=json&cors=true`
    const response = await axios.get(url)
    const data = response.data
    storageService.put(cacheKey, data)
    return data
  },

  getAvgBlockSize: async function (timespan) {
    const cacheKey = `avgBlockSize-${timespan}`
    const cachedData = utilService.loadFromStorage(cacheKey)
    if (cachedData) {
      return cachedData
    }

    const url = `https://api.blockchain.info/charts/avg-blocksize? timespan=${timespan}&format=json&cors=true`
    const response = await axios.get(url)
    const data = response.data
    storageService.put(cacheKey, data)
    return data
  },
}
