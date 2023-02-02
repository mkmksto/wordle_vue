<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useGameSettings } from '../stores/game_settings'
import { useRandomWord } from '../stores/random_word'

const settings$ = useGameSettings()
const { gameSettings$ } = storeToRefs(settings$)

const randomWord$ = useRandomWord()
const { renewCurrentWord$ } = randomWord$

// represents the values stored inside the guessStore's all guesses
const words: string[] = ['ranks', 'quark', 'hello', 'frank', 'beach', 'sands']

onMounted(async () => {
    console.log('*****mounting from GameBox.vue')
    window.addEventListener('keypress', () => {
        console.log('keypress event')
    })
    await renewCurrentWord$(gameSettings$.value)
    console.log(randomWord$.currentRandomWord$)
})
</script>

<template>
    <div class="game-box">
        <div class="words-container">
            <div v-for="word in words" class="word">
                <div v-for="letter in word" class="letter">{{ letter }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
