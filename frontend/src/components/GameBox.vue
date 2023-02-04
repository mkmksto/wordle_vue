<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

import { useGameSettings } from '../stores/game_settings'
import { useRandomWord } from '../stores/random_word'
import { useGuessTracker } from '../stores/guess_tracker'
import { allowedGuesses } from '@/modules/allowed_guesses'

const settings$ = useGameSettings()
const { gameSettings$ } = storeToRefs(settings$)

const randomWord$ = useRandomWord()
const { currentRandomWord$ } = randomWord$
const { renewCurrentWord$ } = randomWord$

const guessTracker$ = useGuessTracker()
const { allGuesses$, currentIdx$, currentGuess$ } = storeToRefs(guessTracker$)

onMounted(async () => {
    console.log('*****mounting from GameBox.vue')
    window.addEventListener('keydown', (e) => {
        onKeyDown(e)
    })

    await renewCurrentWord$(gameSettings$.value)
    console.log('*****current random word: ', currentRandomWord$)
})

const allowInput = ref<boolean>(true)

function onKeyDown(e: KeyboardEvent): void {
    if (!allowInput.value) return
    if (/^[a-zA-Z]$/.test(e.key)) {
        guessTracker$.addLetterToGuess$(e.key, randomWord$.currentRandomWord$)
    } else if (e.key === 'Backspace') {
        guessTracker$.removeLastLetterFromGuess$()
    } else if (e.key === 'Enter') {
        onEnter()
    }
    console.log('***keyboard press***')
}

function onEnter(): void {
    if (!guessTracker$.isCurrentRowFilled$(gameSettings$.value.num_chars)) return
    if (!allowedGuesses.includes(currentGuess$.value.map((l) => l.letter).join(''))) {
        // TODO: show temporary modal (i.e. invalid guess)
        console.log('sorry, invalid guess')
        // TODO: check some backend API if the word is fairly common (frequency)
        return
    }
    showTileColors()
    if (guessTracker$.isGuessCorrect$(randomWord$.currentRandomWord$)) {
        console.log('a winnnar is YOUUUU')
        // TODO: disable input
        // TODO: if guess is correct, update win status to won
        return
    }
    guessTracker$.currentIdx$++
}

function showTileColors(): void {
    // Get all letter tile divs, then filter only the current row
    Array.from(document.querySelectorAll('.letter') as NodeListOf<HTMLDivElement>)
        .filter((tile) => parseInt(tile.dataset.rowid!) === currentIdx$.value)
        .forEach((tile, idx) => {
            const letterAtIdx = currentGuess$.value[idx]
            if (letterAtIdx.isLetterInWord && !letterAtIdx.isLetterInCorrectPosition) {
                tile.classList.add('is-letter-in-word')
            } else if (!letterAtIdx.isLetterInWord) {
                tile.classList.add('is-letter-not-in-word')
            } else if (letterAtIdx.isLetterInCorrectPosition) {
                tile.classList.add('is-letter-in-correct-position')
            }
        })
}
</script>

<template>
    <div class="game-box">
        <div class="words-container">
            <div v-for="(wordGuess, idx) in allGuesses$" class="word">
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
    </div>
</template>

<style scoped>
/* Dynamic Styles */
.is-letter-in-word {
    background-color: var(--letter-in-word);
}

.is-letter-not-in-word {
    background-color: var(--letter-not-in-word);
}

.is-letter-in-correct-position {
    background-color: var(--letter-in-correct-position);
}

/* Static Styles */
.words-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    height: 460px;
    margin-top: 4rem;
}

.word {
    display: flex;
    justify-content: space-between;
    width: 100%;
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
    border: 3.5px solid var(--main-text-color);
    border-radius: 0.9rem;
}

.game-box {
    background-color: var(--main-color);
    margin: 2.5rem 2.5rem 2.5rem 5rem;
    height: 90%;
    width: 70%;
    border-radius: 3rem;
    display: flex;
    justify-content: center;
}
</style>
