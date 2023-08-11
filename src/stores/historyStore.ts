import type { Game } from '@/model/Game'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGamesStore = defineStore('aspiranti', () => {
  const games = ref<Game[]>([])

  return { games }
})
