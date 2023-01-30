<script setup lang="ts">
// represents the values stored inside the guessStore's all guesses
const words: string[] = ['ranks', 'quark', 'hello', 'frank', 'beach', 'sands']
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
    border: 3.5px solid var(--main-text-color);
    border-radius: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--main-text-color);
    text-transform: uppercase;
    font-size: 1.4rem;
    font-family: 'Space Grotesk';
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
