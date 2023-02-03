import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef } from 'vue'
import { v4 as uuidv4 } from 'uuid'

import { allowedGuesses } from '../modules/allowed_guesses'

interface LetterGuess {
    id: string
    letter: string
    isBlank: boolean
    isLetterInWord: boolean
    isLetterInCorrectPosition: boolean
}

export const useGuessTracker = defineStore('guessTracker', () => {
    // [[{id, letter, isBlank, isLetterInWord, ....}, {...}], [{...}, {...}], ....... ]
    const allGuesses$ = ref<LetterGuess[][]>(generateEmptyGuessArray(5))

    const currentGuess$: ComputedRef<LetterGuess[]> = computed(
        () => allGuesses$.value[currentIdx.value]
    )

    const currentIdx = ref<number>(0)

    /**
     * Used in coordination with game settings to change the number of letters for each row
     *
     * @param {number} newRowSize - passed from game settings (e.g. claps has a size of 5)
     */
    function changeNumBoxesPerRow$(newRowSize: number): void {
        allGuesses$.value = generateEmptyGuessArray(newRowSize)
    }

    function addLetterToGuess$(letterToAdd: string, currentRandomWord: string): void {
        const currentRow$ = allGuesses$.value[currentIdx.value]
        const nextBlankSpace = currentRow$.find((l) => l.isBlank) as LetterGuess
        const blankSpaceIdx: number = currentRow$.findIndex((l) => l.isBlank)

        if (!nextBlankSpace) return
        nextBlankSpace.letter = letterToAdd
        nextBlankSpace.isBlank = false

        if (currentRandomWord.includes(letterToAdd)) {
            nextBlankSpace.isLetterInWord = true
        }

        if (currentRandomWord[blankSpaceIdx] === letterToAdd) {
            nextBlankSpace.isLetterInCorrectPosition = true
        }
    }

    function removeLastLetterFromGuess$(): void {
        const currentRow$ = allGuesses$.value[currentIdx.value]
        const itemToRemove = [...currentRow$]
            .reverse()
            .find((l) => !l.isBlank) as LetterGuess
        if (!itemToRemove) return
        itemToRemove.letter = ''
        itemToRemove.isBlank = true
        itemToRemove.isLetterInWord = false
        itemToRemove.isLetterInCorrectPosition = false
    }

    // TODO: do at vue-side: check first whether guess can be added to the list before
    // calling this function
    // TODO: might not be necessary, maybe i only need to increment cur idx after checking `isGuessCanBeAddedToList`
    function addGuessToGuessList$(): void {
        // allGuesses$.value.push(currentGuess$.value)
    }

    /**
     * @param {number} curGuessNumChars - (from game settings): e.g. laugh is 5 chars
     * @returns {boolean} true if every tile at the current row is filled
     */
    function isCurGuessRowTilesFilled$(curGuessNumChars: number): boolean {
        return allGuesses$.value[currentIdx.value].length === curGuessNumChars
    }

    /**
     * @returns {boolean} Return true if the current guess is inside the allowed words repository
     */
    function isGuessAllowed$(): boolean {
        return allowedGuesses.includes(
            currentGuess$.value.map((letter) => letter.letter).join()
        )
    }

    function isGuessCorrect$(currentWord: string): boolean {
        if (currentWord === currentGuess$.value.map((l) => l.letter).join()) return true
        return false
    }

    return {
        currentGuess$,
        allGuesses$,
        isCurGuessRowTilesFilled$,
        changeNumBoxesPerRow$,
        addLetterToGuess$,
        removeLastLetterFromGuess$,
        addGuessToGuessList$,
        isGuessCorrect$,
    }
})

function generateEmptyGuessArray(size: number): LetterGuess[][] {
    const finalArr: LetterGuess[][] = []
    for (let i = 0; i < 6; i++) {
        const nestedArr: LetterGuess[] = []
        for (let i = 0; i < size; i++) {
            nestedArr.push({
                id: uuidv4(),
                letter: '',
                isBlank: true,
                isLetterInWord: false,
                isLetterInCorrectPosition: false,
            })
        }
        finalArr.push(nestedArr)
    }
    return finalArr
}
