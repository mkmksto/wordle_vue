import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useGuessTracker } from '../stores/guess_tracker'

import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'

export const useKeyboard = defineStore('simpleKeyboard', () => {
    const guessTracker$ = useGuessTracker()
    const { lettersInWord$, lettersNotInWord$, lettersInCorrectPosition$ } =
        storeToRefs(guessTracker$)

    const simpleKeyboard$ = ref<Keyboard | null>(null)

    async function instantiateKeyboard$(): Promise<void> {
        simpleKeyboard$.value = new Keyboard('simple-keyboard', {
            layout: {
                default: [
                    'q w e r t y u i o p',
                    'a s d f g h j k l',
                    '{enter} z x c v b n m {bksp}',
                ],
            },
        })
    }

    async function showKeyboardColors(): Promise<void> {
        simpleKeyboard$.value?.addButtonTheme(
            lettersInWord$.value.join(' '),
            'is-letter-in-word'
        )
        simpleKeyboard$.value?.addButtonTheme(
            lettersNotInWord$.value.join(' '),
            'is-letter-not-in-word'
        )
        simpleKeyboard$.value?.addButtonTheme(
            lettersInCorrectPosition$.value.join(' '),
            'is-letter-in-correct-position'
        )
    }

    async function removeKeyboardColors$(): Promise<void> {
        simpleKeyboard$.value?.removeButtonTheme(
            lettersInWord$.value.join(' '),
            'is-letter-in-word'
        )
        simpleKeyboard$.value?.removeButtonTheme(
            lettersNotInWord$.value.join(' '),
            'is-letter-not-in-word'
        )
        simpleKeyboard$.value?.removeButtonTheme(
            lettersInCorrectPosition$.value.join(' '),
            'is-letter-in-correct-position'
        )
    }

    return {
        simpleKeyboard$,
        instantiateKeyboard$,
        showKeyboardColors,
        removeKeyboardColors$,
    }
})
