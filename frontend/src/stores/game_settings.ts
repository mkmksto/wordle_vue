import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useGameSettings = defineStore('gameSettings', () => {
    const gameSettings$ = reactive({
        num_chars: 5,
        difficulty: 'medium',
    })

    function changeNumChars$(newSize: number): void {
        gameSettings$.num_chars = newSize
    }

    function resetGameSetting$(): void {
        gameSettings$.num_chars = 5
        gameSettings$.difficulty = 'medium'
    }

    return { gameSettings$, changeNumChars$, resetGameSetting$ }
})
