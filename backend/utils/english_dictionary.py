import random

import requests


class EnglishDict:

    """
    Get a random word with its associated information
    from a dictionary file
    Args:
        data: Dictionary of English dict data

    """

    def __init__(self, data: dict) -> None:
        self._data = data
        self._word = list(data.keys())

    def get_random_word(self) -> str:
        return random.choice(self._word).lower()

    def get_frequency(self, word: str) -> float | None:
        """
        Return the frequency (per million) for a particular word

        Args:
            word: word as string

        Returns:
            (float): frequency of the word
        """
        data_muse_api = f"https://api.datamuse.com/words?sp={word}&qe=sp&md=fr&max=1"
        res: requests.Response = requests.get(data_muse_api, timeout=5)
        if not res:
            return None

        res_dict: dict = res.json()
        freq = res_dict[0]
        freq = freq.get('tags', None)
        freq = freq[-1]
        freq = float(freq.split(':')[-1])
        return freq


if __name__ == "__main__":
    pass
