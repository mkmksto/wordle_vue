<script setup lang="ts">
import { useModalState } from '@/stores/modal_states'
import { useGameSettings } from '@/stores/game_settings'
import { useResetGame } from '@/composables/use_reset_game'

import { storeToRefs } from 'pinia'

const modalStates$ = useModalState()
const settings$ = useGameSettings()
const { gameSettings$ } = storeToRefs(settings$)
</script>

<template>
    <div class="modal" @click.self="modalStates$.showSettingsModal$ = false">
        <div class="modal-card">
            <div class="setting">
                <label for="min-chars">Number of Letters</label>

                <input
                    id="min-chars"
                    v-model.number="gameSettings$.num_chars"
                    type="range"
                    min="5"
                    max="9"
                    class="range"
                />

                <span class="label-val">{{ gameSettings$.num_chars }}</span>
            </div>

            <div class="setting">
                <label for="difficulty">Difficulty</label>
                <select id="difficulty" v-model="gameSettings$.difficulty">
                    <option selected>Medium</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="very_hard">Very Hard</option>
                </select>
            </div>

            <div class="btn-save-container">
                <button class="save" @click="modalStates$.showSettingsModal$ = false">
                    Save
                </button>

                <button class="reset-settings" @click="settings$.resetGameSetting$()">
                    Reset Settings
                </button>

                <button
                    class="restart"
                    @click="useResetGame(), (modalStates$.showSettingsModal$ = false)"
                >
                    Save and Restart
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-save-container {
    margin-top: auto;
    width: 100%;
    display: flex;
}

label {
    font-size: 1.1rem;
    /* letter-spacing: 0.061rem; */
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
    /* font-family: 'Space Grotesk'; */
    font-size: 1.3rem;
    background-color: rgba(50, 50, 50, 0.7);
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
    margin-top: 0.4rem;
    /* font-family: 'Space Grotesk'; */
    font-size: 1rem;
    padding: 0.4rem;
    border-radius: 0.4rem;
    border: none;
    cursor: pointer;
}

.restart {
    background-color: var(--main-color);
    color: white;
}

.reset-settings {
    margin-left: auto;
    margin-right: 0.4rem;
}
</style>
