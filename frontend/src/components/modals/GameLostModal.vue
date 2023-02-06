<script setup lang="ts">
import { useRandomWord } from '@/stores/random_word'
import { useResetGame } from '@/composables/use_reset_game'

const randomWord$ = useRandomWord()
</script>

<template>
    <div class="modal">
        <div class="modal-card">
            <div class="text-container">
                <span class="you-lose-msg">Game Over</span>
                <div class="answer-reveal">The answer was:</div>
                <div class="current-word">{{ randomWord$.currentRandomWord$ }}</div>
            </div>
            <button @click="useResetGame">Restart</button>
        </div>
    </div>
</template>

<style scoped>
.text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.you-lose-msg {
    margin-bottom: 2rem;
}

.current-word {
    background-color: rgb(210, 210, 210);
    color: rgb(80, 80, 80);
    padding: 0.7rem 1.2rem;
    border-radius: 0.8rem;
    border: 2px dashed rgb(100, 100, 100);
    text-transform: uppercase;
    letter-spacing: 0.9rem;
}
/* */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-card {
    width: 24rem;
    height: 20rem;
    background-color: rgb(250, 250, 250);
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    font-size: 2rem;
    transform: translate(20px, -100px);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
}

.you-lose-msg {
    text-transform: uppercase;
    font-family: 'Space Grotesk';
}

button {
    background-color: rgb(70, 70, 70);
    bottom: 0.25rem;
    color: rgb(245, 245, 245);
    font-size: 1.2rem;
    font-family: 'Space Grotesk';
    margin-bottom: 1.5rem;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 0.9rem;
    cursor: pointer;
    text-transform: uppercase;
    font-family: 'Space Grotesk';
    letter-spacing: 0.2rem;
}
</style>
