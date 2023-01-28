<script setup lang="ts">
import NavBar from './components/NavBar.vue'
console.log('hello from app')
</script>

<template>
    <NavBar />
    <main>
        <div class="game-box"></div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
}

.game-box {
    background-color: var(--main-color);
    margin: 2.5rem 2.5rem 2.5rem 5rem;
    height: 80%;
    width: 70%;
    border-radius: 3rem;
}
</style>

<style>
/* global styles */
:root {
    --main-color: hsl(11, 71.9%, 53.9%);
}
</style>
