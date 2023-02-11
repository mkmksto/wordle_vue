import { nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameState } from '../stores/game_state'
import { useGuessTracker } from '../stores/guess_tracker'
import { useRandomWord } from '../stores/random_word'
import { useGameSettings } from '../stores/game_settings'
import { useKeyboard } from '../stores/simple_keyboard'

export async function useResetGame(): Promise<void> {
    await nextTick()

    const gameState$ = useGameState()
    const { allowInput$ } = storeToRefs(gameState$)

    const guessTracker$ = useGuessTracker()
    const { currentIdx$ } = storeToRefs(guessTracker$)

    const gameSettings$ = useGameSettings()
    const randomWord$ = useRandomWord()
    const keyboard$ = useKeyboard()

    allowInput$.value = false

    gameState$.resetGameState$()
    keyboard$.removeKeyboardColors$()

    // reset the allGuesses$ array to empty arrays and reset current index
    guessTracker$.changeNumBoxesPerRow$(gameSettings$.gameSettings$.num_chars)
    currentIdx$.value = 0

    randomWord$.clearCurrentWord$()
    randomWord$.renewCurrentWord$(gameSettings$.gameSettings$)
    allowInput$.value = true
}
