# CHANGELOG

## v1.1.1

2019-12-03

- **Optimization**: Optimized for `v-model` warning messages

## v1.1.0

2019-12-01

- **Feature**: Added `v-class` directive for conditionally joining classNames together
- **Optimization**: Split the runtime into multiple independent files to reduce runtime bundle size

## v1.0.2

2019-11-23

- **Bug**: Fix bug that when `v-if` is nested under `v-else` and `v-else-if`, an error is reported

## v1.0.0

2019-10-20

- **Feature**: Added `v-model-hook` directive for function component with _useState hook_, and the `v-model` can only be used in _class component_ now
- **Optimization**: In some cases use the runtime instead of the AST code
- **Optimization**: Fix some problem of `v-model`
- **Optimization**: Improved stability

## v0.1.1

2019-10-17

- **Optimization**: Update some documents

## v0.1.0

2019-10-07

- **Feature**: Support for `v-if` and `v-else-if` and `v-else`
- **Feature**: Support for `v-show`
- **Feature**: Support for `v-for`
- **Feature**: Support for `v-model`
