import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef } from 'vue'
import { v4 as uuidv4 } from 'uuid'

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
        () => allGuesses$.value[currentIdx$.value]
    )

    const currentIdx$ = ref<number>(0)

    /**
     * Used in coordination with game settings to change the number of letters for each row
     *
     * @param {number} newRowSize - passed from game settings (e.g. claps has a size of 5)
     */
    function changeNumBoxesPerRow$(newRowSize: number): void {
        allGuesses$.value = generateEmptyGuessArray(newRowSize)
    }

    /**
     * Adds letter to the current row then updates whether the letter is in the word, etc.
     *
     * @param {string} letterToAdd - the key press
     * @param {string} currentRandomWord - the word fetched from the backend (for comparison)
     */
    function addLetterToGuess$(letterToAdd: string, currentRandomWord: string): void {
        const currentRow$ = allGuesses$.value[currentIdx$.value]
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
        const currentRow$ = allGuesses$.value[currentIdx$.value]
        const itemToRemove = [...currentRow$]
            .reverse()
            .find((l) => !l.isBlank) as LetterGuess
        if (!itemToRemove) return
        itemToRemove.letter = ''
        itemToRemove.isBlank = true
        itemToRemove.isLetterInWord = false
        itemToRemove.isLetterInCorrectPosition = false
    }

    /**
     * @param {number} curGuessNumChars - (from game settings): e.g. laugh is 5 chars
     * @returns {boolean} true if every tile at the current row is filled
     */
    function isCurrentRowFilled$(curGuessNumChars: number): boolean {
        return allGuesses$.value[currentIdx$.value].length === curGuessNumChars
    }

    const isAllRowsFilled$: ComputedRef<boolean> = computed(() =>
        allGuesses$.value.every((row) => row.every((letter) => !letter.isBlank))
    )

    function isGuessCorrect$(currentWord: string): boolean {
        if (currentWord === currentGuess$.value.map((l) => l.letter).join(''))
            return true
        return false
    }

    return {
        currentGuess$,
        allGuesses$,
        currentIdx$,
        isCurrentRowFilled$,
        changeNumBoxesPerRow$,
        addLetterToGuess$,
        removeLastLetterFromGuess$,
        isAllRowsFilled$,
        isGuessCorrect$,
    }
})

function generateEmptyGuessArray(wordSize: number): LetterGuess[][] {
    const finalArr: LetterGuess[][] = []
    for (let i = 0; i < 6; i++) {
        const nestedArr: LetterGuess[] = []
        for (let i = 0; i < wordSize; i++) {
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
