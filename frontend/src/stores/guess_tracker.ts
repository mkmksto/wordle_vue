import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

interface LetterGuess {
    id: number
    letter: string
    isBlank: boolean
    isLetterInWord: boolean
    isLetterInCorrectPosition: boolean
}

export const useGuessTracker = defineStore('guessTracker', () => {
    const currentGuess$ = ref<LetterGuess[]>([])
    // [[{id, letter, isBlank, isLetterInWord, ....}, {...}], [{...}, {...}], ....... ]
    const allGuesses$ = ref<LetterGuess[][]>(
        Array(5).fill(
            Array(5).fill({
                id: uuidv4(),
                letter: '',
                isBlank: true,
                isLetterInWord: false,
                isLetterInCorrectPosition: false,
            })
        )
    )

    const currentIdx = ref<number>(0)

    // TODO: use allGuesses, filter using currentIdx
    const isGuessCanBeAddedTolist$ = computed(() => currentGuess$.value.length === 5)

    function addLetterToGuess$(letterToAdd: string): void {
        // currentGuess$.value.push(letterToAdd)
    }

    // TODO: use allGuesses
    function removeLastLetterFromGuess$(): void {
        // currentGuess$.value.pop()
    }

    // TODO: do at vue-side: check first whether guess can be added to the list before
    // calling this function
    // TODO: might not be necessary, maybe i only need to increment cur idx after checking `isGuessCanBeAddedToList`
    function addGuessToGuessList$(): void {
        // allGuesses$.value.push(currentGuess$.value)
    }

    /**
     * Returns true if the current random word matches the user's guess
     *
     * @param {string} currentWord - taken from the random word store
     * @returns {boolean}
     */
    // TODO: test using current idx
    function testGuess$(currentWord: string): boolean {
        // if (currentWord !== currentGuess$.value) return false
        // return true
    }

    return {
        currentGuess$,
        allGuesses$,
        isGuessCanBeAddedTolist$,
        addLetterToGuess$,
        removeLastLetterFromGuess$,
        addGuessToGuessList$,
        testGuess$,
    }
})
