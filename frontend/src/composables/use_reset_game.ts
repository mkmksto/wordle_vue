import { nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameState } from '../stores/game_state'
import { useGuessTracker } from '../stores/guess_tracker'
import { useRandomWord } from '../stores/random_word'
import { useGameSettings } from '../stores/game_settings'

export async function useResetGame() {
    await nextTick()

    const gameState$ = useGameState()
    const guessTracker$ = useGuessTracker()
    const { currentIdx$ } = storeToRefs(guessTracker$)
    const gameSettings$ = useGameSettings()
    const randomWord$ = useRandomWord()

    gameState$.resetGameState$()

    // reset the allGuesses$ array to empty arrays and reset current index
    guessTracker$.changeNumBoxesPerRow$(gameSettings$.gameSettings$.num_chars)
    currentIdx$.value = 0

    randomWord$.clearCurrentWord$()
    randomWord$.renewCurrentWord$(gameSettings$.gameSettings$)
}
