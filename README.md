# puzzle-gen
an API for sudoku puzzle generation.

Check out the [demo](https://puzzle-gen.herokuapp.com/demo.html)!

## Usage

Using the api is relatively simple. It uses URL parameters, which are essentially key-value pairs separated
by `&` that come after a `?` in a url. See [this](https://support.google.com/google-ads/answer/6277564?hl=en) for more information.

## Example
`https://puzzle-gen.herokuapp.com/api/v1?quantity=5&size=9&difficulty=Trivial` will return JSON with the following structure:

```jsonc
{
    "quantity": "5", // the requested number of puzzles (this is a string, not a number)
    "size": "9", // the requested size of each of the puzzles (this is a string, not a number)
    "difficulty": "Trivial", // the requested Simon Tatham level of difficulty
    "IDs": [...], // the list of generated game IDs (strings), in case you want to go back and use it to find the solution
    "puzzles": [...], // the list of puzzles (strings) generated from the game IDs
    "formatted": [...] // a list of the puzzles transformed into strings that look like real puzzles when printed, eg with python's print or JS's console.log

}
```
