import type { Hero } from './Hero'
import type { Monster } from './Monster'

export class Game {
  winner: Hero | Monster
  numberTurns: number

  constructor(winner: Hero | Monster, numberTurns: number) {
    this.winner = winner
    this.numberTurns = numberTurns
  }
}
