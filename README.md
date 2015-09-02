# Memoized Decorator

A minimilistic memoize decorator.  Written because the only other memoize
  decorator I found in NPM didn't support arguments!

Serializes arguments by `.toString()` or `JSON.strinigify` for objects literals
  & arrays.  `null` & `undefined` safe.

## Installation

```sh
npm install --save-dev memoized-decorator
```

## Usage

```js
import memoize from 'memoized-decorator';

class Foo {
  @memoize
  myMethod() {
    // ...
  }
}
```
