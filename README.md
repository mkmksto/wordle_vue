# Wordle clone written with Vue and Flask

### Vue + TS setup guide

- [reddit](https://www.reddit.com/r/neovim/comments/v4mhsv/neovim_setup_for_fullstack_web_development_with/) post with comprehensive settings for vue + ts dev setup
- corresponding [dotfiles](https://github.com/garcia5/dotfiles/blob/master/files/nvim/lua/ag/lsp_config.lua#L111)

## Developer Notes

### Fonts

- [Font Pair](https://www.fontpair.co/) (where i found `Space Grotesk`)
- [Recommendations](https://dribbble.com/resources/font-pairing-tools) from dribble

### Architecture

- Word from backend (exactly same as `vue text twist`)
- data to be fetched inside `GameBox`

### Do this (current TODOs)

- fix your guess store
- `addLetterToGuess` should have checks before adding the item to the `allGuesses` array.
  - check if letter is in word
  - check if letter is in the correct position
  - isBlank
- implement keyboard input and deleting letters from guess
- implement guess testing by pressing enter
- !!!(IMPORTANT) (left off at `guess_tracker.ts`, line `35`)

#### Stores

##### Guess Store

- main property must be an object containing the following properties
  - isLetterInWord (yellow) (but wrong position) (else: color: grey)
  - isLetterInCorrectPosition (green)
  - isBlank (no input yet from user, blank state when loading game)
- might need a `currentGuessIdx` why? Because we'll start with 25 boilerplate, unfilled `LetterGuess` objects (see interface).

##### Game state store

- see `vue_text_twist`
- might not be needed, i might only need something like `hasWordBeenGuessed` prop inside `guess_tracker.ts` and something that watches it then shows a modal when i win

#### Cells

- each cell has three classes to be used for coloring

1. Normal (maybe no need to create this)
2. `incorrect-guess`: white text on blackish bg
3. `correct-guess`: black text on white bg

#### Keyboard

- update this
- layout this probably like this:
- each keyboard row is a `display: flex` (row)
- each of those have a top and bottom border (probably black)
- then apply highlighting

#### Game Settings

- update this
