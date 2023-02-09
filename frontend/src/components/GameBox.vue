<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

import { useGameSettings } from '@/stores/game_settings'
import { useRandomWord } from '@/stores/random_word'
import { useGuessTracker } from '@/stores/guess_tracker'
import { useGameState } from '@/stores/game_state'
import { useKeyboard } from '@/stores/simple_keyboard'

import { allowedGuesses } from '@/modules/allowed_guesses'
import { checkGuessValidity } from '@/modules/check_guess_validity'

// import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'

const settings$ = useGameSettings()
const { gameSettings$ } = storeToRefs(settings$)

const gameState$ = useGameState()
const { winState$, loseState$, showInvalidGuessModal$ } = storeToRefs(gameState$)

const randomWord$ = useRandomWord()
const { currentRandomWord$ } = storeToRefs(randomWord$)
const { renewCurrentWord$ } = randomWord$

const guessTracker$ = useGuessTracker()
const { allGuesses$, currentIdx$, currentGuess$, isAllRowsFilled$ } =
    storeToRefs(guessTracker$)

const allowInput_ = ref<boolean>(false)

const keyboard$ = useKeyboard()
const { simpleKeyboard$ } = storeToRefs(keyboard$)

onMounted(async () => {
    console.log('*****mounting from GameBox.vue')

    await keyboard$.instantiateKeyboard$()
    simpleKeyboard$.value!.options.onKeyPress = onVirtualKeypress

    window.addEventListener('keydown', (e) => onKeyDown(e))

    await renewCurrentWord$(gameSettings$.value)
    allowInput_.value = true
    console.log('*****current random word: ', currentRandomWord$)
})

function onVirtualKeypress(btn: string) {
    handleInput(btn)
}

function onKeyDown(e: KeyboardEvent): void {
    e.preventDefault()
    handleInput(e.key)
}

function handleInput(key: string) {
    if (!allowInput_.value) return
    if (/^[a-zA-Z]$/.test(key)) {
        guessTracker$.addLetterToGuess$(key, currentRandomWord$.value)
    } else if (key === 'Backspace' || key === '{bksp}') {
        guessTracker$.removeLastLetterFromGuess$()
    } else if (key === 'Enter' || key === '{enter}') {
        onEnter()
    }
    console.log('***keyboard press***')
}

async function isGuessValid(): Promise<boolean> {
    if (!allowedGuesses.includes(currentGuess$.value.map((l) => l.letter).join(''))) {
        if (await isGuessInAPI()) {
            return true
        } else {
            showInvalidGuessModal$.value = true
            await sleep(1000)
            showInvalidGuessModal$.value = false
            return false
        }
    } else {
        return true
    }
}

async function isGuessInAPI(): Promise<boolean> {
    const backendRes = await checkGuessValidity(
        gameSettings$.value.difficulty,
        currentGuess$.value.map((l) => l.letter).join('')
    )
    return backendRes.validity
}

async function onEnter(): Promise<void> {
    allowInput_.value = false
    try {
        if (!guessTracker$.isCurrentRowFilled$(gameSettings$.value.num_chars)) return
        if (!(await isGuessValid())) return

        await showTileColors()
        await keyboard$.showKeyboardColors()

        // TODO: refactor
        if (guessTracker$.isGuessCorrect$(currentRandomWord$.value)) {
            await sleep(1000)
            allowInput_.value = false
            winState$.value = true
            loseState$.value = false
            return
        }

        // TODO: refactor (checks if player has lost)
        if (
            isAllRowsFilled$ &&
            !guessTracker$.isGuessCorrect$(currentRandomWord$.value) &&
            currentIdx$.value === 5
        ) {
            allowInput_.value = false
            winState$.value = false
            loseState$.value = true
            return
        }

        // if code has reached this line without retuning, increment current row idx
        guessTracker$.currentIdx$++
    } catch (e) {
        console.error(e)
    } finally {
        allowInput_.value = true
    }
}

async function showTileColors(): Promise<void> {
    // Get all letter tile divs, then filter only the current row
    const letterTiles = Array.from(
        document.querySelectorAll('.letter') as NodeListOf<HTMLDivElement>
    ).filter((tile) => parseInt(tile.dataset.rowid!) === currentIdx$.value)

    for (const [i, tile] of letterTiles.entries()) {
        await sleep(350)
        const letterAtIdx = currentGuess$.value[i]

        if (letterAtIdx.isLetterInWord && !letterAtIdx.isLetterInCorrectPosition) {
            tile.classList.add('is-letter-in-word')
        } else if (!letterAtIdx.isLetterInWord) {
            tile.classList.add('is-letter-not-in-word')
        } else if (letterAtIdx.isLetterInCorrectPosition) {
            tile.classList.add('is-letter-in-correct-position')
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

<style scoped>
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

.cell {
    width: 4rem;
    height: 4rem;
    border-radius: 0.9rem;
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
}
</style>

<style>
/* having this scoped would cause problems with the classes now showing up for the keyboard */
.hg-button {
    background-color: transparent !important;
    font-weight: bold !important;
    border: none !important;
    height: 45px !important;
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
