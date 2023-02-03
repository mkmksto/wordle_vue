import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

interface LetterGuess {
    id: string
    letter: string
    isBlank: boolean
    isLetterInWord: boolean
    isLetterInCorrectPosition: boolean
}

export const useGuessTracker = defineStore('guessTracker', () => {
    const currentGuess$ = ref<LetterGuess[]>([])
    // [[{id, letter, isBlank, isLetterInWord, ....}, {...}], [{...}, {...}], ....... ]
    const allGuesses$ = ref<LetterGuess[][]>(generateEmptyGuessArray(5))

    const currentIdx = ref<number>(0)

    // TODO: use allGuesses, filter using currentIdx
    const isGuessCanBeAddedTolist$ = computed(() => currentGuess$.value.length === 5)

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

        if (!nextBlankSpace) return
        nextBlankSpace.letter = letterToAdd
        nextBlankSpace.isBlank = false

        if (currentRandomWord.includes(letterToAdd)) {
            nextBlankSpace.isLetterInWord = true
        }

        const blankSpaceIdx: number = currentRow$.findIndex((l) => l.isBlank)
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
        changeNumBoxesPerRow$,
        addLetterToGuess$,
        removeLastLetterFromGuess$,
        addGuessToGuessList$,
        testGuess$,
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
