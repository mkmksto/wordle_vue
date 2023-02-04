<script setup lang="ts">
function someFunc() {
    console.log('dsadsadas')
}
</script>

<template>
    <div class="modal">
        <div class="modal-card">
            <span class="you-lose-msg">Game Over</span>
            <button @click="someFunc">Restart</button>
        </div>
    </div>
</template>

<style scoped>
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
    background-color: rgb(220, 220, 220);
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    font-size: 2rem;
}

.you-lose-msg {
    margin-top: 5rem;
}

button {
    background-color: white;
    bottom: 0.25rem;
    color: rgb(80, 80, 80);
    font-size: 1.5rem;
    font-family: 'Space Grotesk';
    margin-bottom: 1.5rem;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
}
</style>
