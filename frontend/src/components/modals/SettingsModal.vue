<script setup lang="ts">
import { useModalState } from '@/stores/modal_states'
import { useResetGame } from '@/composables/use_reset_game'

const modalStates$ = useModalState()
</script>

<template>
    <div class="modal" @click.self="modalStates$.showSettingsModal$ = false">
        <div class="modal-card">
            <div class="setting">
                <label for="min-chars">Number of Letters</label>

                <input type="range" min="6" max="10" class="range" id="min-chars" />

                <span class="label-val">(5)</span>
            </div>

            <div class="setting">
                <label for="difficulty">Difficulty</label>
                <select id="difficulty">
                    <option selected>Medium</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="very_hard">Very Hard</option>
                </select>
            </div>

            <button class="save" @click="">Save but don't Restart</button>
            <button class="restart" @click="">Save and Restart</button>
        </div>
    </div>
</template>

<style scoped>
.save {
    margin-top: auto;
}

label {
    font-family: 'Space Grotesk';
    letter-spacing: 0.071rem;
}
/* ------- */
.setting {
    display: flex;
    align-items: center;
    width: 100%;
}

.settings input,
select {
    margin-left: auto;
    margin-bottom: 1rem;
}

select {
    padding: 0.4rem;
    margin-top: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

option {
    height: 2rem;
}

.range {
    background-color: rgb(100, 100, 100);
    border-radius: 0.5rem;
    appearance: none;
    height: 0.5rem;
    margin-top: auto;
    margin-bottom: auto;
}

/* ----------- */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Grotesk';
    font-size: 1.3rem;
    background-color: rgba(50, 50, 50, 0.4);
}

.modal-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 20rem;
    max-width: 30rem;
    background-color: rgb(70, 70, 70);
    color: white;
    padding: 2rem;
    border-radius: 1rem;
}

/* ----- */
button {
    width: 100%;
    margin-top: 0.4rem;
    font-family: 'Space Grotesk';
    font-size: 1rem;
    padding: 0.4rem;
    border-radius: 0.4rem;
    border: none;
}

.restart {
    background-color: var(--main-color);
    color: white;
}
</style>
