<script setup lang="ts">
console.log('hello from nav')
</script>

<template>
    <nav>
        <ul>
            <li class="header">
                <fa icon="fa-solid fa-bars"></fa>
            </li>

            <li class="header">
                <fa icon="fa-solid fa-circle-info"></fa>
            </li>

            <li class="header">
                <fa icon="fa-solid fa-gear"></fa>
            </li>
        </ul>

        <div class="game-title">WORDLE</div>
    </nav>
</template>

<style scoped>
nav {
    position: fixed;
    height: 100vh;
    z-index: 50;
    width: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.game-title {
    margin-top: 6rem;
    writing-mode: vertical-rl;
    text-orientation: upright;
    /* color: var(--main-text-color); */
    font-family: 'Space Grotesk';
    font-size: 3rem;
    font-weight: 500;
}

ul {
    margin-top: 4rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
}

li {
    font-size: 1.7rem;
    cursor: pointer;
    /* color: var(--main-text-color); */
}
</style>
