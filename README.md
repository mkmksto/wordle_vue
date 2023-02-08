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

(last part)

- add letter color animations
- info modal
- Improve color palette
- check all `TODO`s using `telescope`
- burger menu shows my other projects

### Important Notes

- Had a problem where when `onEnter` runs (from `GameBox.vue`), any word you test would result in all the tiles greyed out. The problem had to do with incorrectly placed (probably) async return types and missing? `await` keywords.
- also found out that i can't (or at least it won't work proerply) use async/await inside a `forEach` loop, i'd have to settle with regular for loops or `for of` loops.
- vue with `eslintrc` config guide found [here](https://eslint.vuejs.org/user-guide/#bundle-configurations)
