<script setup lang="ts">
import V1GameComponent from './1v1GameComponent.vue'
import HistoryComponent from './HistoryComponent.vue'
import PVEGameComponent from './PVEGameComponent.vue'
</script>

<template>
  <header>
    <div>
      <b-tabs content-class="mt-3" fill style="background-color: azure">
        <b-tab title="PVE" active><PVEGameComponent /></b-tab>
        <b-tab title="1v1 Game"><V1GameComponent player1-name="Mitko" player2-name="Gio" /></b-tab>
        <b-tab title="History"><HistoryComponent /></b-tab>
      </b-tabs>
    </div>
  </header>
</template>
<!-- <style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}
</style> -->
