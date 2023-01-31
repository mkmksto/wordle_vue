import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRandomWord = defineStore('randomWord', () => {
    const currentRandomWord$ = ref<string>('')
    const isBackendDataFetched$ = computed<boolean>(() =>
        Boolean(currentRandomWord$.value)
    )

    async function renewCurrentWord$(): Promise<void> {
        const backendData = await fetchBackendData()
        currentRandomWord$.value = backendData.rand_word
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

async function fetchBackendData() {
    const fetchUrl = window.location.href.includes('vercel')
        ? '/api/random_word'
        : 'http://127.0.0.1:5000/api/random_word'
    console.log('random_word.ts - current URL: ', fetchUrl)
    const res = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
        },
    })

    if (!res.ok) throw new Error('backend error, either 4xx or 5xx')
    const py_resp = await res.json()
    return py_resp
}
