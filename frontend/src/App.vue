<script setup lang="ts">
import { useGameState } from '@/stores/game_state'
import { useModalState } from '@/stores/modal_states'

import GameBox from '@/components/GameBox.vue'
import NavBar from '@/components/NavBar.vue'
import GameLostModal from '@/components/modals/GameLostModal.vue'
import GameWonModal from '@/components/modals/GameWonModal.vue'
import InvalidGuessModal from '@/components/modals/InvalidGuessModal.vue'

import SettingsModal from '@/components/modals/SettingsModal.vue'
import InfoModal from '@/components/modals/InfoModal.vue'

import { storeToRefs } from 'pinia'

const gameState$ = useGameState()
const { showInvalidGuessModal$ } = storeToRefs(gameState$)

const modalStates$ = useModalState()
</script>

<template>
    <!-- === true because sometimes the value can be null?? not sure, can't remember -->
    <GameLostModal v-if="gameState$.loseState$ === true" />
    <GameWonModal v-if="gameState$.winState$ === true" />
    <InvalidGuessModal v-if="showInvalidGuessModal$" />
    <SettingsModal v-if="modalStates$.showSettingsModal$" />
    <InfoModal v-if="modalStates$.showInfoModal$" />

    <NavBar />
    <main>
        <GameBox />
    </main>
</template>

<style scoped>
main {
    display: flex;
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
    --letter-not-in-word: rgb(110, 110, 110);
    /* rgba(41, 165, 136, 0.9) */
    /* --letter-in-correct-position: rgb(119, 155, 67); */
    --letter-in-correct-position: rgba(41, 165, 136, 0.9);
    --main-color-al: rgba(200, 50, 50, 0.3);
    /* --main-text-color: #faf0ea; */
}
</style>
