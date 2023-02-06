<template>
    <div class="modal">
        <div class="modal-card">Word Not Found</div>
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
    background-color: rgb(80, 80, 80);
    color: white;
    display: flex;
    border-radius: 1rem;
    font-size: 2rem;
    font-family: 'Space Grotesk';
    transform: translate(20px, -100px);
    padding: 1.5rem;
    user-select: none;
}
</style>
