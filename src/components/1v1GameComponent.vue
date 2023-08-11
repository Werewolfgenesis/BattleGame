<script setup lang="ts">
import { Hero } from '@/model/Hero'
import PlayerComponent from './PlayerComponent.vue'
import BattleLogComponent from './generics/BattleLogComponent.vue'

const props = defineProps({
  player1Name: { type: String, required: true, default: 'Player1' },
  player2Name: { type: String, required: true, default: 'Player2' }
})

let player1: Hero = new Hero(props.player1Name)
let player2: Hero = new Hero(props.player2Name)
</script>

<template>
  <div style="display: block" class="bg">
    <div style="display: flex; gap: 500px">
      <PlayerComponent :name="props.player1Name" image-url="hero.png" :enemy="player2" />

      <PlayerComponent :name="props.player2Name" image-url="hero-mirrored.png" :enemy="player1" />
    </div>

    <BattleLogComponent />
  </div>
</template>

<style scoped>
.bg {
  background-image: url('../assets/battle.jpg');
}
</style>
