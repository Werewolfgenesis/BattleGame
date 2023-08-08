export class Hero {
  healthPoints: number
  attackDamage: number
  currentLevel: number

  constructor() {
    this.healthPoints = 100
    this.attackDamage = 25
    this.currentLevel = 0
  }

  levelUp() {
    this.currentLevel++
    this.attackDamage += 15
    this.healthPoints += 50
  }

  attack(enemy: Hero) {
    enemy.healthPoints -= this.attackDamage
  }
}
