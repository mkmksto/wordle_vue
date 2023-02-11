<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useModalState } from '@/stores/modal_states'
import { useResetGame } from '@/composables/use_reset_game'
import { useGameState } from '@/stores/game_state'

const gameState$ = useGameState()
const { loseState$ } = storeToRefs(gameState$)

const modalStates$ = useModalState()
</script>

<template>
    <nav>
        <ul>
            <li class="header">
                <fa icon="fa-solid fa-bars"></fa>
            </li>

            <li class="header" @click="modalStates$.showInfoModal$ = true">
                <fa icon="fa-solid fa-circle-info"></fa>
            </li>

            <li class="header" @click="modalStates$.showSettingsModal$ = true">
                <fa icon="fa-solid fa-gear"></fa>
            </li>
        </ul>

        <div class="game-title">WORDLE</div>

        <div class="controls">
            <ul>
                <li class="header" @click="loseState$ = true">
                    <fa icon="fa-flag"></fa>
                </li>

                <li class="header" @click="useResetGame">
                    <fa icon="fa-arrows-rotate"></fa>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
.settings {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    z-index: 100;
}

nav {
    position: fixed;
    height: 100vh;
    z-index: 50;
    width: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.game-title {
    margin-top: 6rem;
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-family: 'Space Grotesk';
    font-size: 2.5rem;
    font-weight: 500;
    user-select: none;
}

ul {
    margin-top: 4rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
}

li {
    font-size: 1.7rem;
    cursor: pointer;
}

/* */
.controls {
    margin-top: 2rem;
}
</style>
