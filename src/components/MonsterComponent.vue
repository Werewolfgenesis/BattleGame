<template>
  <div>
    <img id="MonsterImage" src="../assets/monster.png" />
    <label><strong>Monster </strong> </label>
    <br />
    <label for="MonsterHealthBar">Health:</label
    ><progress id="MonsterHealthbar" value="100" max="100">100 %</progress>
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
