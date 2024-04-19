# Fzeach

Fzearch is a fuzzy search library for Javascript/Typescript. It is base on Smith-Waterman algorithm and provides a simple and easy-to-use API for fuzzy search.

## How to use

```javascript
import { Fzeach } from 'fzeach';

const fzeach = new Fzeach();

const list = [
	'apple',
	'banana',
	'orange',
	'grape',
	'kiwi',
	'mango',
	'melon',
	'peach',
	'pear',
	'plum',
	'strawberry',
	'watermelon',
];

const keyword = 'apple';

// create a class instance
const result = fzeach.search(list, keyword, 'levenshtein');
// or use the static method
const result = Fzeach.search(list, keyword, 'damerau-levenshtein');
```

## API

### `Fzearch.search(query: string, db: string[], options?: FzearchOptions): any[]`

- `query`: The keyword to search.
- `db`: The list of strings to search.
- `options`: The options for the search.
    - `maxResults`: The maximum number of results to return. Default is 5.
    - `getPenalty`: The function to calculate the penalty for the given characters.
    - `getScore`: The function to calculate the score for the given characters.
    - `showScore`: Whether to show the score in the result. Default is false.
    - `caseSensitive`: Whether to consider the case sensitivity. Default is false.

## Algorithms

I want to base on smith-waterman algorithm and modify some of the mark calculation to achieve some of the following goals:

- Keyword appears earlier in the string, it should have a higher score. For example, if we search `react` in the list `['react hooks', 'common react mistakes']`, `'react hooks'` should and a higher order.

- Case sensitivity should be considered. The weighting of case matching should be higher than the weighting of case mismatching.

## Example

```javascript
let fzearch: Fzearch;

const db = [
	'Algorithm of Searching Agentsz',
	'Debounce and Throttle',
	'React Hooks',
	'Persisting State in React',
	'Deep Copy and Shadow Copy in Javascript',
	'Common React Mistakes',
];

fzearch = new Fzearch(db);

console.log(fzearch.search('co', 5));
// [
//   'Common React Mistakes',
//   'Deep Copy and Shadow Copy in Javascript',
//   'Persisting State in React',
//   'React Hooks',
//   'Algorithm of Searching Agentsz'
// ]
```

## Reference

- [Smith-Waterman algorithm](https://en.m.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm)
