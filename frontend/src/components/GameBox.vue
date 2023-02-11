<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useGameSettings } from '@/stores/game_settings'
import { useRandomWord } from '@/stores/random_word'
import { useGuessTracker } from '@/stores/guess_tracker'
import { useGameState } from '@/stores/game_state'
import { useKeyboard } from '@/stores/simple_keyboard'

import { allowedGuesses } from '@/modules/allowed_guesses'
import { checkGuessValidity } from '@/modules/check_guess_validity'

import 'simple-keyboard/build/css/index.css'

const settings$ = useGameSettings()
const { gameSettings$ } = storeToRefs(settings$)

const gameState$ = useGameState()
const { winState$, loseState$, allowInput$, showInvalidGuessModal$ } =
    storeToRefs(gameState$)

const randomWord$ = useRandomWord()
const { currentRandomWord$ } = storeToRefs(randomWord$)
const { renewCurrentWord$ } = randomWord$

const guessTracker$ = useGuessTracker()
const { allGuesses$, currentIdx$, currentGuess$, isAllRowsFilled$ } =
    storeToRefs(guessTracker$)

const keyboard$ = useKeyboard()
const { simpleKeyboard$ } = storeToRefs(keyboard$)

onMounted(async () => {
    console.log('*****mounting from GameBox.vue')

    await keyboard$.instantiateKeyboard$()
    simpleKeyboard$.value!.options.onKeyPress = onVirtualKeypress

    window.addEventListener('keydown', (e) => onKeyDown(e))

    await renewCurrentWord$(gameSettings$.value)
    allowInput$.value = true
    console.log('*****current random word: ', currentRandomWord$)
})

function onVirtualKeypress(btn: string): void {
    handleInput(btn)
}

function onKeyDown(e: KeyboardEvent): void {
    e.preventDefault()
    handleInput(e.key)
}

function handleInput(key: string): void {
    if (!allowInput$.value || !currentRandomWord$.value) return
    if (/^[a-zA-Z]$/.test(key)) {
        guessTracker$.addLetterToGuess$(key)
    } else if (key === 'Backspace' || key === '{bksp}') {
        guessTracker$.removeLastLetterFromGuess$()
    } else if (key === 'Enter' || key === '{enter}') {
        onEnter()
    }
}

async function isGuessValid(): Promise<boolean> {
    if (allowedGuesses.includes(currentGuess$.value.map((l) => l.letter).join('')))
        return true
    if (await isGuessInAPI()) return true

    showInvalidGuessModal$.value = true
    await sleep(1000)
    showInvalidGuessModal$.value = false
    return false
}

async function isGuessInAPI(): Promise<boolean> {
    const backendRes = await checkGuessValidity(
        gameSettings$.value.difficulty,
        currentGuess$.value.map((l) => l.letter).join('')
    )
    return backendRes.validity
}

async function onEnter(): Promise<void> {
    allowInput$.value = false
    try {
        if (!guessTracker$.isCurrentRowFilled$()) return
        if (!(await isGuessValid())) return

        checkValidityOfEachLetterInGuess()
        await showTileColors()
        await keyboard$.showKeyboardColors()

        if (await hasUserWon()) {
            allowInput$.value = false
            await sleep(1000)
            winState$.value = true
            loseState$.value = false
            return
        }

        if (hasUserLost()) {
            allowInput$.value = false
            winState$.value = false
            loseState$.value = true
            return
        }

        // if code has reached this line without returning, increment current row idx
        guessTracker$.currentIdx$++
    } catch (e) {
        console.error(e)
    } finally {
        allowInput$.value = true
    }
}

async function hasUserWon(): Promise<boolean> {
    if (!guessTracker$.isGuessCorrect$(currentRandomWord$.value)) return false
    return true
}

function hasUserLost(): boolean {
    if (
        isAllRowsFilled$ &&
        !guessTracker$.isGuessCorrect$(currentRandomWord$.value) &&
        currentIdx$.value === 5
    ) {
        return true
    } else {
        return false
    }
}

/**
 * loop through each Tile(HTML Element) and color each tile depending on the
 * correctness of the letter guess
 */
async function showTileColors(): Promise<void> {
    // TODO: slice letterTiles to only match the length of the current guess
    // the above code gets all tiles even if empty (or maybe not, because this code will)
    // only be reached when the tiles are full anyway

    // Get all letter tile divs, then filter only the current row
    const letterTiles = Array.from(
        document.querySelectorAll('.letter') as NodeListOf<HTMLDivElement>
    ).filter((tile) => parseInt(tile.dataset.rowid!) === currentIdx$.value)

    // actual coloring part
    for (const [i, tile] of letterTiles.entries()) {
        await sleep(350)
        const letterGuessObjAtIdx = currentGuess$.value[i]

        if (letterGuessObjAtIdx.isLetterInWord) {
            tile.classList.add('is-letter-in-word')
        } else if (letterGuessObjAtIdx.isLetterInCorrectPosition) {
            tile.classList.add('is-letter-in-correct-position')
        } else if (!letterGuessObjAtIdx.isLetterInWord) {
            tile.classList.add('is-letter-not-in-word')
        }
    }
}

/**
 * Checks whether or not each letter from the current guess is in the correct position
 * or if the letter is anywhere in the word, otherwise, will defualt to NOT anywhere in the current random word
 */
function checkValidityOfEachLetterInGuess(): void {
    const guessLetterPool: string[] = []
    const validLetters: string[] = currentRandomWord$.value.split('')

    for (let i = 0; i < currentRandomWord$.value.length; i++) {
        // letter is an exact match at the exact index
        if (currentGuess$.value[i].letter === currentRandomWord$.value[i]) {
            currentGuess$.value[i].isLetterInCorrectPosition = true
            // push empty char so that the indices for comparison still matches
            guessLetterPool.push(' ')

            // if exact match, remove letter from validLetters for comparison
            // this is to prevent cases like e.g. the word is `ellis` and typing `eager` would make the
            // first `e` green, but would still make the second `e` yellow (should be grey)
            const idxAtValidLettersArr = validLetters.indexOf(
                currentRandomWord$.value[i]
            )
            validLetters.splice(idxAtValidLettersArr, 1)
        } else {
            // if not an exact match, throw into pool for later comparison
            guessLetterPool.push(currentGuess$.value[i].letter)
        }
    }

    for (let i = 0; i < currentRandomWord$.value.length; i++) {
        if (validLetters.includes(guessLetterPool[i])) {
            currentGuess$.value[i].isLetterInWord = true
        }
    }
}

async function sleep(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms))
}
</script>

<template>
    <div class="game-box">
        <div class="words-container">
            <div v-for="(wordGuess, idx) in allGuesses$" :key="idx" class="word">
                <!-- row-id will be used for toggling the colors in that row -->
                <div
                    v-for="{ id, letter } in wordGuess"
                    :key="id"
                    class="letter"
                    :data-rowid="idx"
                >
                    {{ letter }}
                </div>
            </div>
        </div>
        <div v-if="currentRandomWord$" class="fetching"></div>
        <div v-else class="fetching">...fetching</div>
        <div class="simple-keyboard"></div>
    </div>
</template>

<style>
/* DO NOT SCOPE these styles because the info modal also uses these */
/* Dynamic Styles */

.fetching {
    height: 1.5rem;
    font-size: 1.3rem;
    color: rgb(130, 130, 130);
    margin-top: 1rem;
    font-family: 'Space Grotesk';
}

/* Static Styles */
.words-container {
    background-color: var(--main-color);
    padding: 4rem 20rem;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    height: fit-content;
    margin-top: 1rem;
    gap: 0.7rem;
}

.word {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 0.9rem;
}

.letter {
    width: 4rem;
    height: 4rem;
    border: 3px solid var(--main-text-color);
    border-radius: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--main-text-color);
    text-transform: uppercase;
    font-size: 1.4rem;
    font-family: 'Space Grotesk';
    font-weight: 600;
    user-select: none;
}

.game-box {
    margin-top: 2rem;
    height: 95%;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.simple-keyboard {
    width: 570px;
    margin-top: 2rem;
    font-family: 'Space Grotesk' !important;
    font-weight: 700;
    font-size: 1.2rem;
    background-color: transparent;
    border: 3px solid var(--main-color);
    border-radius: 2rem;
    padding: 1rem;
}
</style>

<style>
/* having this scoped would cause problems with the classes now showing up for the keyboard */
.hg-button {
    background-color: transparent !important;
    font-weight: bold !important;
    border: none !important;
    height: 45px !important;
    box-shadow: none !important;
    color: rgb(80, 80, 80);
}

.is-letter-in-word {
    background-color: var(--letter-in-word) !important;
    color: white;
    transition: all 0.35s ease;
}

.is-letter-not-in-word {
    background-color: var(--letter-not-in-word) !important;
    color: white;
    transition: all 0.35s ease;
}

.is-letter-in-correct-position {
    background-color: var(--letter-in-correct-position) !important;
    color: white;
    transition: all 0.35s ease;
}
</style>
