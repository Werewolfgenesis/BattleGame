export class Hero {
  healthPoints: number
  name: string
  //attackDamage: number
  currentLevel: number
  specialAttackDamage: number
  cdTurns: number
  minDamage: number
  maxDamage: number

  constructor(name: string) {
    this.minDamage = 15
    this.maxDamage = 45
    this.healthPoints = 100
    this.name = name
    //this.attackDamage = 50
    this.currentLevel = 0
    this.specialAttackDamage = 1.2 * this.maxDamage
    this.cdTurns = 0
  }

  levelUp() {
    this.currentLevel++
    this.minDamage += 15
    this.maxDamage += 15
    this.healthPoints += 50
    this.specialAttackDamage = 1.2 * this.maxDamage
  }

  attack(enemy: Hero): number {
    const attackDamage = Math.floor(
      Math.random() * (this.maxDamage - this.minDamage + 1) + this.minDamage
    )
    enemy.healthPoints -= attackDamage
    if (this.cdTurns > 0) this.cdTurns--

    return attackDamage
  }

  heal() {
    this.healthPoints += 30
    if (this.cdTurns > 0) this.cdTurns--
  }

  specialAttack(enemy: Hero) {
    if (this.cdTurns == 0) {
      this.cdTurns = 2
      enemy.healthPoints -= this.specialAttackDamage
    }
  }
}
