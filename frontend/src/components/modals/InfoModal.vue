<script setup lang="ts">
import { useModalState } from '@/stores/modal_states'

const modalState$ = useModalState()
</script>

<template>
    <div class="modal" @click.self="modalState$.showInfoModal$ = false">
        <div class="modal-card">
            <div class="instructions">Instructions</div>
            <div class="modal-contents">
                <span>Guess the hidden word in 6 tries.</span>
                <span
                    >With each guess, the colors of each letter changes accodring to how
                    close to the word you are.</span
                >
                <span
                    >Enter a word to start the game, for example, assume that our secret
                    word is "watch". Typing "wears" would result in the following:</span
                >
                <div class="word">
                    <div class="letter is-letter-in-correct-position">W</div>
                    <div class="letter">E</div>
                    <div class="letter is-letter-in-word">A</div>
                    <div class="letter">R</div>
                    <div class="letter">S</div>
                </div>
                <h3>Legend</h3>
                <span
                    >W is in the correct position.<br />
                    A is in the word but not in the correct position<br />
                    E, R, S are nowhere in the word.
                </span>

                <h3>Other Examples</h3>
                <div class="word">
                    <div class="letter is-letter-in-correct-position">W</div>
                    <div class="letter is-letter-in-word">H</div>
                    <div class="letter">E</div>
                    <div class="letter is-letter-in-word">A</div>
                    <div class="letter is-letter-in-word">T</div>
                </div>
                <div class="word">
                    <div class="letter">C</div>
                    <div class="letter is-letter-in-correct-position">A</div>
                    <div class="letter is-letter-in-correct-position">T</div>
                    <div class="letter is-letter-in-correct-position">C</div>
                    <div class="letter is-letter-in-correct-position">H</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* override styles from `GameBox.vue` */
.word {
    justify-content: center;
    margin-bottom: 2rem;
}

.letter {
    border-color: white;
    color: white;
}
/* modal and contents */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    font-size: 1.2rem;
    background-color: rgba(50, 50, 50, 0.7);
}

.instructions {
    background-color: rgb(80, 80, 80);
    font-weight: 900;
    font-size: 1.4rem;
    padding: 0.7rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

h3 {
    font-weight: 900;
    margin-bottom: 1rem;
}

.modal-contents {
    padding: 2rem;
    display: flex;
    flex-direction: column;
}

.modal-card {
    display: flex;
    flex-direction: column;
    max-width: 45rem;
    min-width: 30rem;
    background-color: rgb(60, 60, 60);
    color: white;
    border-radius: 1rem;
    overflow: hidden;
    margin-top: 2rem;
}

span {
    margin-bottom: 1rem;
}
</style>
