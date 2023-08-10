<script setup lang="ts">
import { Hero } from '../model/Hero.ts'
import type MonsterComponentVue from './MonsterComponent.vue'
import PlayerComponent from './PlayerComponent.vue'
//check to set the default in the props if it is not required
const props = defineProps({
  player1Name: { type: String, required: true, default: 'Player1' },
  player2Name: { type: String, required: true, default: 'Player2' }
})

let player1: Hero = new Hero(props.player1Name)
let player2: Hero = new Hero(props.player2Name)
</script>

<template>
  <PlayerComponent :name="props.player1Name" image-url="hero.png" :enemy="player2" />
  <MonsterComponentVue></MonsterComponentVue>
  <!-- <PlayerComponent :name="props.player2Name" image-url="hero-mirrored.png" :enemy="player1" /> -->
</template>
