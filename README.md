#es6-class-util

Utilities for composing classes when using ES6.

## Usage

```
npm install es6-class-util --save
```

### bind(canididate)

Bind all methods and accessors of the given candidate to itself (in-place) and return the candidate.

Designed for use in **babeljs** constructor, where the candidate is `this`.

### extend(destination, ...sources)

Copy the members, both values and accessors, from the `source` objects to the `destination` object.

First-in wins; existing members on the `destination` are **not** overwritten.