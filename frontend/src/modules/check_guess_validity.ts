export async function checkGuessValidity(
    difficulty: string,
    currentGuess: string
): Promise<{ validity: boolean }> {
    const fetchUrl = window.location.href.includes('vercel')
        ? '/api/test_if_guess_is_valid'
        : 'http://127.0.0.1:5000/api/test_if_guess_is_valid'

    const res = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ difficulty: difficulty, currentGuess: currentGuess }),
    })

    if (!res.ok) throw new Error('backend error, either 4xx or 5xx')
    const py_resp: { validity: boolean } = await res.json()
    return py_resp
}
