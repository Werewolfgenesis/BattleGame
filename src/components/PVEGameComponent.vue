<script setup lang="ts">
import { Monster } from '@/model/Monster'
import MonsterComponent from './MonsterComponent.vue'
import PlayerComponent from './PlayerComponent.vue'
import BattleLogComponent from './generics/BattleLogComponent.vue'

const props = defineProps({
  player1Name: { type: String, required: true, default: 'Player1' }
})

let monster: Monster = new Monster()
</script>

<template>
  <div style="display: block" class="bg">
    <div style="display: flex; gap: 500px">
      <PlayerComponent image-url="hero.png" :name="props.player1Name" :enemy="monster" />
      <MonsterComponent />
    </div>

    <BattleLogComponent />
  </div>
</template>

<style scoped>
.bg {
  background-image: url('../assets/battle.jpg');
}
</style>
