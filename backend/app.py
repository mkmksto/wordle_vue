from typing import Any

from flask import Flask, request
from flask_cors import CORS
from utils import english_dictionary, game_settings, json_utils

app = Flask(__name__)
CORS(app)


def main():
    dict_file_paths = json_utils.get_dict_file_paths()
    all_dict_data = json_utils.get_all_dict_data(dict_file_paths)
    return english_dictionary.EnglishDict(all_dict_data)


english_dict = main()


@app.route('/')
def index():
    return 'hello from index'


@app.route('/api/random_word', methods=['GET'])
def get_random_word():
    # TODO: define the shape of the dictionary based on what you'll pass to this endpoint
    # frontend_settings: dict[str, Any] | None = request.get_json() or {}
    frontend_settings: dict[str, Any] | None = {}
    # if not frontend_settings:
    #     return ('', 504)

    num_chars: int = frontend_settings.get('num_chars', 6)
    diff: str = frontend_settings.get('difficulty', 'medium')
    difficulty: int = game_settings.diff_map.get(diff, 0.1)

    while True:
        print('*****FETCHING*****')
        rand_word: str = english_dict.get_random_word()
        frequency: float = english_dict.get_frequency(rand_word) or 0.1
        if len(rand_word) == num_chars and frequency >= difficulty:
            break

    return {'word': rand_word}


if __name__ == "__main__":
    app.run(debug=True)
