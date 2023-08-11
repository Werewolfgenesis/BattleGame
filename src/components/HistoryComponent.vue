<script setup lang="ts">
import { useGamesStore } from '../stores/historyStore'

let fields = [
  { key: 'winnername', label: 'Winner', sortable: true },
  { key: 'numberTurns', label: 'Number of Turns', sortable: true }
]

const store = useGamesStore()
const history = store.games
</script>

<template>
  <div>
    <b-table striped hover :items="history" :fields="fields">
      <template #cell(winnername)="data">{{ data.item.winner.name }}</template>
    </b-table>
  </div>
</template>
