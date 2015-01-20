#es6-class-util

Utilities for composing classes when using ES6.

## Usage

```javascript
npm install es6-class-util
bower install
```

### bind(canididate)

Bind all methods and accessors of the given candidate to itself (in-place) and return the candidate.

Designed for use in a **Tracuer** or **6to5** constructor, where the candidate is `this`. May not work correctly where
`this` is an object created with the `new` keyword.

### extend(destination, ...sources)

Copy the members, both values and accessors, from the `source` objects to the `destination` object.

Members on the `destination`, or copied from a preceding source, are overwritten by those on a following source.