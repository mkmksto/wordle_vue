import pathlib
import re
from typing import Any, Generator

from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
from utils import english_dictionary, game_settings, json_utils

app = Flask(__name__)
# CORS(app)


def main():
    dict_file_paths = json_utils.get_dict_file_paths()
    if not dict_file_paths:
        raise FileNotFoundError('Dictionary files not found')
    all_dict_data: dict = json_utils.get_all_dict_data(dict_file_paths)
    return english_dictionary.EnglishDict(all_dict_data)


english_dict = main()


@app.route('/')
@cross_origin(origins=['*'])
def index():
    return render_template('index.html')


@app.route('/api/random_word', methods=['GET', 'POST'])
@cross_origin(origins=['*'])
def get_random_word():
    # shape: {'num_chars': int, 'difficulty': str}
    frontend_settings: dict[str, Any] | None = request.get_json() or {}

    if not frontend_settings:
        return ('', 504)

    num_chars: int = frontend_settings.get('num_chars', 6)
    diff: str = frontend_settings.get('difficulty', 'medium')
    difficulty: float = game_settings.diff_map.get(diff, 0.1)

    while True:
        print('*****FETCHING*****')
        rand_word: str = english_dict.get_random_word()
        frequency: float = english_dict.get_frequency(rand_word) or difficulty
        if (
            len(rand_word) == num_chars
            and frequency >= difficulty
            and re.search('^[a-zA-Z]*?$', rand_word)
        ):
            break

    print('************ FINAL random word: ', rand_word, '**FREQ: ', frequency)
    # return {'word': 'ellis'}
    return {'word': rand_word}


@app.route('/api/test_if_guess_is_valid', methods=['GET', 'POST'])
@cross_origin(origins=['*'])
def test_if_guess_is_valid():
    frontend_data: dict[str, Any] | None = request.get_json() or {}

    current_guess: str | None = frontend_data.get('currentGuess')
    diff = frontend_data.get('difficulty', 'medium')
    current_difficulty: float = game_settings.diff_map.get(diff, 0.1)

    print('->> current difficulty: ', current_difficulty)
    # print(f'current guess: {current_guess}')

    guess_frequency: float | None = english_dict.get_frequency(current_guess)
    print('***frequency of guess: ', guess_frequency)

    if guess_frequency is None:
        return {'validity': False}
    if current_guess is None:
        return {'validity': False}
    if float(guess_frequency) >= float(current_difficulty):
        return {'validity': True}

    return {'validity': False}


if __name__ == "__main__":
    # set to True if debugging in the browser
    app.run(debug=True)
