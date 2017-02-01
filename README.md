# Memoized Decorator

A fork of [memoized-decorator](https://github.com/VoiceNGO/memoized-decorator) that takes class properties into consideration by attaching the memoization cache at the object level rather than class level. 

Serializes arguments by `.toString()` or `JSON.strinigify` for objects literals
  & arrays.  `null` & `undefined` safe.

## Installation

```sh
npm install --save memoized-class-decorator
```

## Usage

```js
import memoize from 'memoized-class-decorator';

class Foo {
  @memoize
  myMethod() {
    // ...
  }
}
```
