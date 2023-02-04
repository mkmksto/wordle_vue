<script setup lang="ts">
import { useGameState } from '@/stores/game_state'

import GameBox from './components/GameBox.vue'
import NavBar from './components/NavBar.vue'
import GameLostModal from '@/components/modals/GameLostModal.vue'

const gameState$ = useGameState()
</script>

<template>
    <GameLostModal v-if="gameState$.loseState$ === true" />
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
    --letter-in-word: rgb(190, 130, 67);
    --letter-not-in-word: rgb(100, 100, 100);
    --letter-in-correct-position: rgb(119, 155, 67);
    /* --main-text-color: #faf0ea; */
}
</style>
