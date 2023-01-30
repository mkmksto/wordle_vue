import json
from collections.abc import Generator
from pathlib import Path


def get_dict_file_paths(
    debug: bool = False,
) -> Generator[Path, None, None] | None:
    if debug:
        dict_files = Path(__file__).parent.parent / 'dictionary_files'
        dict_files = dict_files.glob('D*.json')

        return dict_files

    dict_files = Path(__file__).cwd() / 'dictionary_files'
    dict_files = dict_files.glob('D*.json')
    return dict_files


def get_all_dict_data(file_paths: Generator[Path, None, None]) -> dict:
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
            consolidated_dict = data

    return consolidated_dict


if __name__ == "__main__":
    first_file = get_dict_file_paths(debug=True)
    if first_file:
        # print(len(list(first_file)))
        print(list(first_file))
        # first_file = list(first_file)[0]
