<script setup lang="ts">
import { Game } from '@/model/Game'
import { Hero } from '@/model/Hero'
import { Monster } from '@/model/Monster'
import { onMounted, ref } from 'vue'
import { useGamesStore } from '../stores/historyStore'
import GenericButtonComponent from './generics/GenericButtonComponent.vue'
const props = defineProps({
  enemy: { type: [Hero, Monster], required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true }
})
const getImageUrl = () => {
  return new URL(`../assets/${props.imageUrl}`, import.meta.url).toString()
}

const getImageId = () => {
  return props.name + 'Image'
}

const getHealthbarId = () => {
  return props.name + 'Healthbar'
}

const getAttackId = () => {
  return props.name + 'Attack'
}

const getSpecialAttackId = () => {
  return props.name + 'SpecialAttack'
}

const getHealId = () => {
  return props.name + 'Heal'
}

let player1: Hero
//let players: Hero[]
let disabled = ref(false)
const store = useGamesStore()
onMounted(() => {
  player1 = new Hero(props.name)
  //players = [player1, props.enemy]
})
let currentPlayerOnTurnIdx = 0

const attack = () => {
  console.log(player1.name + ' ' + props.enemy.name)

  const attackDamage = player1.attack(props.enemy)
  recalcPlayerHealthBar(props.enemy)
  logBattleEvent('Damage inflicted by ' + player1.name + ': ' + attackDamage)
  if (props.enemy instanceof Monster) {
    if (props.enemy.healthPoints <= 0) {
      logBattleEvent('Final attack by monster upon dying: ' + props.enemy.attackDamage)
      props.enemy.attack(player1)
    }
    recalcPlayerHealthBar(player1)
    if (player1.healthPoints <= 0 && props.enemy.healthPoints <= 0) {
      logBattleEvent('Tie! Monster killed ' + player1.name + ' with his last attack!')
      store.games.push(new Game(player1, 5))
      return
    }
  }

  props.enemy.healthPoints <= 0 ? win(player1) : nextTurn()
}

const specialAttack = (attacker: Hero, defender: Hero | Monster) => {
  attacker.specialAttack(defender)
  recalcPlayerHealthBar(defender)

  logBattleEvent(
    'Special attack activated by ' +
      attacker.name +
      '! Damage inflicted: ' +
      attacker.specialAttackDamage
  )

  defender.healthPoints <= 0 ? win(attacker) : nextTurn()
}

const heal = (hero: Hero) => {
  hero.heal()
  recalcPlayerHealthBar(hero)
  logBattleEvent(hero.name + ' activated heal')
  nextTurn()
}

const logBattleEvent = (text: string) => {
  let logbox = document.getElementById('battleLog') as HTMLTextAreaElement
  logbox.value += text + '\r\n'
}

const win = (winner: Hero) => {
  let game = new Game(winner, 5)

  store.games.push(game)
  logBattleEvent(winner.name + " wins! Press 'Restart game' to play again")
  if (winner == props.enemy) {
    let player2Img = document.getElementById(getImageId()) as HTMLImageElement
    // //player2Img.innerHTML = '<img id= "player2Img" src="../assets/hero-mirrored-dead.png" />'
    player2Img.classList.add('dead')
  } else if (winner == player1) {
    let player1Img = document.getElementById(props.enemy.name + 'Image') as HTMLImageElement
    // //player1Img.innerHTML = '<img id= "player2Img" src="../assets/hero-dead.png" />'
    player1Img.classList.add('dead')
  }
  //temp solution
  disabled.value = true
  //   ;(document.getElementById('player2Attack') as HTMLButtonElement).disabled = true
  //   ;(document.getElementById('player2SpecialAttack') as HTMLButtonElement).disabled = true
  //   ;(document.getElementById('player2Heal') as HTMLButtonElement).disabled = true
  //   ;(document.getElementById('player1Attack') as HTMLButtonElement).disabled = true
  //   ;(document.getElementById('player1SpecialAttack') as HTMLButtonElement).disabled = true
  //   ;(document.getElementById('player1Heal') as HTMLButtonElement).disabled = true
  //TODO add a snackbar with message for the winner
}

const nextTurn = () => {
  //let players = [player1, props.enemy]
  //   console.log('idx: ' + currentPlayerOnTurnIdx)
  //   if (currentPlayerOnTurnIdx == 0) {
  //     heroOnEndOfTurn(player1)
  //     currentPlayerOnTurnIdx = 1
  //   } else if (currentPlayerOnTurnIdx == 1) {
  //     heroOnEndOfTurn(props.enemy)
  //     currentPlayerOnTurnIdx = 0
  //   }
  //   heroOnEndOfTurn(players[currentPlayerOnTurnIdx])
}

const heroOnEndOfTurn = (hero: Hero) => {
  if (hero == player1) {
    disabled.value = true
    //do it the vue way

    // ;(document.getElementById('player2Attack') as HTMLButtonElement).disabled = true
    // ;(document.getElementById('player2SpecialAttack') as HTMLButtonElement).disabled = true
    // ;(document.getElementById('player2Heal') as HTMLButtonElement).disabled = true
    // ;(document.getElementById('player1Attack') as HTMLButtonElement).disabled = false
    // ;(document.getElementById('player1Heal') as HTMLButtonElement).disabled = false

    if (hero.cdTurns == 0) {
      //;(document.getElementById(props.specialAttackButton) as HTMLButtonElement).disabled = false
    } else {
      //;(document.getElementById(props.specialAttackButton) as HTMLButtonElement).disabled = true
    }
  } else if (hero == props.enemy) {
    // ;(document.getElementById('player1Attack') as HTMLButtonElement).disabled = true
    // ;(document.getElementById('player1SpecialAttack') as HTMLButtonElement).disabled = true
    // ;(document.getElementById('player1Heal') as HTMLButtonElement).disabled = true
    // ;(document.getElementById('player2Attack') as HTMLButtonElement).disabled = false
    // ;(document.getElementById('player2SpecialAttack') as HTMLButtonElement).disabled = false
    // ;(document.getElementById('player2Heal') as HTMLButtonElement).disabled = false
    // if (hero.cdTurns == 0) {
    //   ;(document.getElementById('player2SpecialAttack') as HTMLButtonElement).disabled = false
    // } else {
    //   ;(document.getElementById('player2SpecialAttack') as HTMLButtonElement).disabled = true
    // }
  }
}
const recalcPlayerHealthBar = (hero: Hero | Monster) => {
  const id = hero == player1 ? getHealthbarId() : props.enemy.name + 'Healthbar'
  console.log(id)
  let playerHealthBar = document.getElementById(id) as HTMLProgressElement
  playerHealthBar.value = hero.healthPoints
  if (playerHealthBar.value <= 40) {
    playerHealthBar.classList.remove('progress-green')
    playerHealthBar.classList.remove('progress-blue')
    playerHealthBar.classList.add('progress-red')
  } else if (playerHealthBar.value > 40 && playerHealthBar.value < 75) {
    playerHealthBar.classList.remove('progress-green')
    playerHealthBar.classList.remove('progress-red')
    playerHealthBar.classList.add('progress-blue')
  } else {
    playerHealthBar.classList.remove('progress-blue')
    playerHealthBar.classList.remove('progress-red')
    playerHealthBar.classList.add('progress-green')
  }
}
</script>

<template>
  <div>
    <img :id="getImageId()" :src="getImageUrl()" />
    <label
      ><strong>Player {{ props.name }} </strong>
    </label>
    <br />
    <label for="health">Health:</label
    ><progress :id="getHealthbarId()" value="100" max="100">100 %</progress>
    <tr>
      <td>
        <GenericButtonComponent
          :id="getAttackId()"
          :action="() => attack()"
          text="Attack!"
          :disabled="disabled.valueOf()"
        />
      </td>
      <td>
        <GenericButtonComponent
          :id="getSpecialAttackId()"
          :action="() => specialAttack(player1, props.enemy)"
          text="Special Attack"
          :disabled="disabled.valueOf()"
        />
      </td>

      <td>
        <GenericButtonComponent
          :id="getHealId()"
          :action="() => heal(player1)"
          text="Heal!"
          :disabled="disabled.valueOf()"
        />
      </td>
    </tr>
  </div>
</template>

<style scoped>
progress {
  width: 100%;
  -webkit-appearance: none;
  margin-left: 8px;
  height: 8px;
}

progress::-webkit-progress-bar {
  -webkit-appearance: none;
  white-space: pre;
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.34) inset;
}
.progress-red::-webkit-progress-value {
  background: red;
}
.progress-blue::-webkit-progress-value {
  background: blue;
}
.progress-green::-webkit-progress-value {
  background: green;
}

.dead {
  -webkit-transform: rotate(90deg); /* Safari and Chrome */
  -moz-transform: rotate(90deg); /* Firefox */
  -ms-transform: rotate(90deg); /* IE 9 */
  -o-transform: rotate(90deg); /* Opera */
  transform: rotate(90deg);
}
</style>
