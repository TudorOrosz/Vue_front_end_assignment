<script lang="ts">
export default {
  name: 'App'
}
</script>

<template>
  <div id="app" class="container">
    <header>
      <h1>Accounts Overview</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 24px auto;
}
</style>