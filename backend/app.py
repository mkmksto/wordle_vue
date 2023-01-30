from flask import request
from utils import json_utils


def test_fun():
    """
    something
    """
    # dasdasd
    print('hello world')


if __name__ == "__main__":
    files = json_utils.get_dict_file_paths()
    print(len(list(files)))
