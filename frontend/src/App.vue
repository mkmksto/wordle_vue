<script setup lang="ts">
import GameBox from './components/GameBox.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
    <NavBar />
    <main>
        <GameBox />
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
</style>

<style>
/* global styles */
:root {
    --main-color: hsl(11, 65.9%, 46.9%);
    --main-text-color: #f9e9f2;
    /* --main-text-color: #faf0ea; */
}
</style>
