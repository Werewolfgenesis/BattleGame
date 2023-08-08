<script setup lang="ts">
import { Hero } from '@/model/Hero'
import GenericButtonComponent from './GenericButtonComponent.vue'
const props = defineProps({
  enemy: { type: Hero, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true }
})

let image = '../assets/' + props.imageUrl
console.log(image)

let player1 = new Hero(props.name)
let currentPlayerOnTurnIdx = 0

const attack = (attacker: Hero, defender: Hero) => {
  const attackDamage = attacker.attack(defender)
  recalcPlayerHealthBar(defender)

  logBattleEvent('Damage inflicted by ' + attacker.name + ': ' + attackDamage)

  defender.healthPoints <= 0 ? win(attacker) : nextTurn()
}

const specialAttack = (attacker: Hero, defender: Hero) => {
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
  logBattleEvent(winner.name + " wins! Press 'Restart game' to play again")
  if (winner == player1) {
    let player2Img = document.getElementById('player2Img') as HTMLImageElement
    //player2Img.innerHTML = '<img id= "player2Img" src="../assets/hero-mirrored-dead.png" />'
    player2Img.classList.add('dead')
  } else if (winner == props.enemy) {
    let player1Img = document.getElementById('player1Img') as HTMLImageElement
    //player1Img.innerHTML = '<img id= "player2Img" src="../assets/hero-dead.png" />'
    player1Img.classList.add('dead')
  }
  //temp solution
  ;(document.getElementById('player2Attack') as HTMLButtonElement).disabled = true
  ;(document.getElementById('player2SpecialAttack') as HTMLButtonElement).disabled = true
  ;(document.getElementById('player2Heal') as HTMLButtonElement).disabled = true
  ;(document.getElementById('player1Attack') as HTMLButtonElement).disabled = true
  ;(document.getElementById('player1SpecialAttack') as HTMLButtonElement).disabled = true
  ;(document.getElementById('player1Heal') as HTMLButtonElement).disabled = true
  //TODO add a snackbar with message for the winner
}

const nextTurn = () => {
  let players = [player1, props.enemy]
  currentPlayerOnTurnIdx = (currentPlayerOnTurnIdx + 1) % 2
  heroOnEndOfTurn(players[currentPlayerOnTurnIdx])
}

const heroOnEndOfTurn = (hero: Hero) => {
  if (hero == player1) {
    //do it the vue way
    ;(document.getElementById('player2Attack') as HTMLButtonElement).disabled = true
    ;(document.getElementById('player2SpecialAttack') as HTMLButtonElement).disabled = true
    ;(document.getElementById('player2Heal') as HTMLButtonElement).disabled = true
    ;(document.getElementById('player1Attack') as HTMLButtonElement).disabled = false
    ;(document.getElementById('player1Heal') as HTMLButtonElement).disabled = false

    if (hero.cdTurns == 0) {
      ;(document.getElementById('player1SpecialAttack') as HTMLButtonElement).disabled = false
    } else {
      ;(document.getElementById('player1SpecialAttack') as HTMLButtonElement).disabled = true
    }
  } else if (hero == props.enemy) {
    ;(document.getElementById('player1Attack') as HTMLButtonElement).disabled = true
    ;(document.getElementById('player1SpecialAttack') as HTMLButtonElement).disabled = true
    ;(document.getElementById('player1Heal') as HTMLButtonElement).disabled = true
    ;(document.getElementById('player2Attack') as HTMLButtonElement).disabled = false
    ;(document.getElementById('player2SpecialAttack') as HTMLButtonElement).disabled = false
    ;(document.getElementById('player2Heal') as HTMLButtonElement).disabled = false

    if (hero.cdTurns == 0) {
      ;(document.getElementById('player2SpecialAttack') as HTMLButtonElement).disabled = false
    } else {
      ;(document.getElementById('player2SpecialAttack') as HTMLButtonElement).disabled = true
    }
  }
}
const recalcPlayerHealthBar = (hero: Hero) => {
  const id = hero == player1 ? 'health1' : 'health2'

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
    <img id="player1Img" src="../assets/hero.png" />
    <label
      ><strong>Player {{ props.name }} </strong>
    </label>
    <br />
    <label for="health">Health:</label><progress id="health1" value="100" max="100">100 %</progress>
    <tr>
      <td>
        <GenericButtonComponent
          id="player1AttackButton"
          :action="() => attack(player1, props.enemy)"
          text="Attack!"
        />
        <!-- <button id="player1Attack" type="submit" @click="attack(player1, player2)">Attack!</button> -->
      </td>
      <td>
        <GenericButtonComponent
          id="player1SpecialAttack"
          :action="() => specialAttack(player1, props.enemy)"
          text="Special Attack"
        />
        <!-- <button id=" type="submit" @click="specialAttack(player1, player2)">
          Special Attack!
        </button> -->
      </td>

      <td>
        <GenericButtonComponent id="player1Heal" :action="() => heal(player1)" text="Heal!" />
        <!-- <button id="player1Heal" type="submit" @click="heal(player1)">Heal!</button> -->
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
