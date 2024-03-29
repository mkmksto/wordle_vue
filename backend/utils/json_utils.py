import json
from collections.abc import Generator
from pathlib import Path


def get_dict_file_paths():
    """Get the file paths of all the English dictionary json files

    Returns:
        list: List of all the file paths of the json files
    """
    dict_files = Path(__file__).parent.parent / 'dictionary_files'
    print(dict_files)
    dict_files = list(dict_files.glob('D*.json'))

    if dict_files:
        return dict_files
    return ['']

    # debug might not be necessary at all beaucse Path always operates relative
    # to where the file was defined (which is nice)
    # dict_files = Path(__file__).cwd() / 'dictionary_files'
    # dict_files = dict_files.glob('D*.json')
    # return dict_files


def get_all_dict_data(file_paths) -> dict:
    """Given a list of file paths, consolidate all JSON info then return

    Args:
        file_paths: ['path/1/DA.json', 'path/2/DZ.json', ...]

    Returns:
        dict: Consolidated English Dictionary entries as a python dict
    """
    consolidated_dict = {}
    for path in file_paths:
        with open(path, 'r', encoding='utf8') as file:
            data: dict = json.load(file)
            consolidated_dict = consolidated_dict | data

    return consolidated_dict


if __name__ == "__main__":
    # first_file = get_dict_file_paths()
    # if first_file:
    #     # print(len(list(first_file)))
    #     print(list(first_file))
    #     # first_file = list(first_file)[0]
    dict_file_paths = get_dict_file_paths()
    all_dict_data = get_all_dict_data(dict_file_paths)
    print(len(all_dict_data))
