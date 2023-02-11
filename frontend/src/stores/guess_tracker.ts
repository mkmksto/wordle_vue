import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, type ComputedRef } from 'vue'
import { v4 as uuidv4 } from 'uuid'

import { useRandomWord } from '../stores/random_word'

interface LetterGuess {
    id: string
    letter: string
    isBlank: boolean
    isLetterInWord: boolean
    isLetterInCorrectPosition: boolean
}

export const useGuessTracker = defineStore('guessTracker', () => {
    const randomWord$ = useRandomWord()
    const { currentRandomWord$ } = storeToRefs(randomWord$)

    // [[{id, letter, isBlank, isLetterInWord, ....}, {...}], [{...}, {...}], ....... ]
    const allGuesses$ = ref<LetterGuess[][]>(generateEmptyGuessArray(5))

    const currentGuess$: ComputedRef<LetterGuess[]> = computed(() =>
        allGuesses$.value[currentIdx$.value].filter((l) => !l.isBlank)
    )

    const currentIdx$ = ref<number>(0)

    /**
     * Used in coordination with game settings to change the number of letters for each row
     * This function can be used to reset the `allGuesses$` array
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
     */
    function addLetterToGuess$(letterToAdd: string): void {
        const currentRow$ = allGuesses$.value[currentIdx$.value]
        const nextBlankSpace = currentRow$.find((l) => l.isBlank) as LetterGuess
        // const blankSpaceIdx: number = currentRow$.findIndex((l) => l.isBlank)

        if (!nextBlankSpace) return
        nextBlankSpace.letter = letterToAdd
        nextBlankSpace.isBlank = false

        // if (currentRandomWord[blankSpaceIdx] === letterToAdd) {
        //     nextBlankSpace.isLetterInCorrectPosition = true
        //     letterPool$.value[blankSpaceIdx] = ''
        //     return
        // }
        //
        // if (letterPool$.value.includes(letterToAdd)) {
        //     nextBlankSpace.isLetterInWord = true
        // }
    }

    const flattenedAllGuesses$: ComputedRef<LetterGuess[]> = computed(() => {
        const newFlatArr: LetterGuess[] = []
        allGuesses$.value.forEach((subarray) =>
            subarray.forEach((letter) => newFlatArr.push(letter))
        )
        return newFlatArr
    })

    const lettersInWord$: ComputedRef<string[]> = computed(() => {
        // use set to get only the unique elements
        return Array.from(
            new Set(
                flattenedAllGuesses$.value
                    .filter((l) => l.isLetterInWord && !l.isLetterInCorrectPosition)
                    .map((l) => l.letter)
            )
        )
    })

    // guessed letters that are not anywhere in the word
    const lettersNotInWord$: ComputedRef<string[]> = computed(() => {
        return Array.from(
            new Set(
                flattenedAllGuesses$.value
                    .filter((l) => !l.isLetterInWord)
                    .map((l) => l.letter)
            )
        )
    })

    const lettersInCorrectPosition$: ComputedRef<string[]> = computed(() => {
        return Array.from(
            new Set(
                flattenedAllGuesses$.value
                    .filter((l) => l.isLetterInCorrectPosition)
                    .map((l) => l.letter)
            )
        )
    })

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
     * @returns {boolean} true if every tile at the current row is filled
     */
    function isCurrentRowFilled$(): boolean {
        // console.log(`cur word len: ${currentRandomWord$.value.length}`)
        // console.log(`cur guess len: ${currentGuess$.value.length}`)
        return currentGuess$.value.length === currentRandomWord$.value.length
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
        lettersInWord$,
        lettersNotInWord$,
        lettersInCorrectPosition$,
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
