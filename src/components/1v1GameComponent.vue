<script setup lang="ts">
import BattleLogComponent from './BattleLogComponent.vue'
import PlayersComponent from './PlayersComponent.vue'
</script>

<template>
  <div style="display: block">
    <div style="display: flex; gap: 500px">
      <PlayersComponent player1-name="Mitko" player2-name="Gio" />
    </div>

    <BattleLogComponent />
  </div>
</template>
