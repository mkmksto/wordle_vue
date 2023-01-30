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

#### Stores

##### Random Word Store

- data fetched is stored inside a store (randomWord$)
- try if it's possible to use its methods without having to destructure
- use `property$` syntax for its props
- data fetching is stored inside the `modules` folder

- properties:
  1. currentRandomWord$
  - structure:
  - not sure yet but i think i only need the string itself
  2. isBackendDataFetched$ (for vue's `if-else`)
  3.

##### Guess Store

- implement a `guess store` `currentGuess$`
- `guess store` methods:
  1. addLetterToGuess$
  2. removeLetterFromGuess$
  3. testGuess$
- properties:
  1. currentGuess$
  2. allGuesses$
  3. currentGuessString$ (for comparison purposes?)

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
