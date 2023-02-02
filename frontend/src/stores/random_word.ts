import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRandomWord = defineStore('randomWord', () => {
    const currentRandomWord$ = ref<string>('')
    const isBackendDataFetched$ = computed<boolean>(() =>
        Boolean(currentRandomWord$.value)
    )

    // TODO: this should be a post request sending the Game Settings to the flask backend
    async function renewCurrentWord$(gameSettings: object): Promise<void> {
        interface flaskResponse {
            word: string
        }
        const backendData = (await fetchBackendData(gameSettings)) as flaskResponse
        currentRandomWord$.value = backendData.word
    }

    function clearCurrentWord$(): void {
        currentRandomWord$.value = ''
    }

    return {
        currentRandomWord$,
        isBackendDataFetched$,
        renewCurrentWord$,
        clearCurrentWord$,
    }
})

/**
 * Fetch a random word the from Flask backend
 *
 * @async
 * @param {object} gameSettings - the gameSettings$ store property (num_chars, difficulty)
 * @throws {Error} - throw error if fetching backend is unsuccessful
 * @returns {Promise<object>} - backend data as an object {'word': rand_word}
 */
async function fetchBackendData(gameSettings: object): Promise<object> {
    const fetchUrl = window.location.href.includes('vercel')
        ? '/api/random_word'
        : 'http://127.0.0.1:5000/api/random_word'
    console.log('random_word.ts - current URL: ', fetchUrl)
    const res = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(gameSettings),
    })

    if (!res.ok) throw new Error('backend error, either 4xx or 5xx')
    const py_resp: { word: string } = await res.json()
    return py_resp
}
