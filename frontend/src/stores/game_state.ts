import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameState = defineStore('gameState', () => {
    const winState$ = ref<boolean | null>(null)
    const loseState$ = ref<boolean | null>(null)
    const showInvalidGuessModal$ = ref<boolean>(false)

    function resetGameState$() {
        winState$.value = null
        loseState$.value = null
    }

    return { winState$, loseState$, resetGameState$, showInvalidGuessModal$ }
})
