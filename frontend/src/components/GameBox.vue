<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

import { useGameSettings } from '../stores/game_settings'
import { useRandomWord } from '../stores/random_word'
import { useGuessTracker } from '../stores/guess_tracker'

const settings$ = useGameSettings()
const { gameSettings$ } = storeToRefs(settings$)

const randomWord$ = useRandomWord()
const { currentRandomWord$ } = randomWord$
const { renewCurrentWord$ } = randomWord$

const guessTracker$ = useGuessTracker()
const { allGuesses$ } = storeToRefs(guessTracker$)

// represents the values stored inside the guessStore's all guesses
const words: string[] = ['ranks', 'quark', 'hello', 'frank', 'beach', 'sands']

onMounted(async () => {
    console.log('*****mounting from GameBox.vue')
    window.addEventListener('keydown', (e) => {
        onKeyDown(e)
    })

    // toggleTileColor()
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
        // TODO: handle
    }
    console.log('***keyboard press***')
}

function toggleTileColor(): void {
    const letterTiles = document.querySelectorAll(
        '.letter'
    ) as NodeListOf<HTMLDivElement>
    letterTiles.forEach((tile) => {
        tile.classList.toggle('is-letter-in-word')
        tile.classList.toggle('is-letter-not-in-word')
        tile.classList.toggle('is-letter-in-correct-position')
    })
}
</script>

<template>
    <div class="game-box">
        <div class="words-container">
            <div v-for="wordGuess in allGuesses$" class="word">
                <div
                    v-for="{
                        id,
                        letter,
                        isBlank,
                        isLetterInWord,
                        isLetterInCorrectPosition,
                    } in wordGuess"
                    :key="id"
                    class="letter"
                    :class="[
                        {
                            'is-letter-in-word':
                                isLetterInWord && !isLetterInCorrectPosition,
                            'is-letter-not-in-word': !isLetterInWord && !isBlank,
                            'is-letter-in-correct-position': isLetterInCorrectPosition,
                        },
                    ]"
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
