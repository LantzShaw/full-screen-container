# full-screen-container

## Installation

```sh
$ pnpm add full-screen-container

or

$ npm i full-screen-container
```

## Usage

**main.js**
```js
import FullScreenContainer from '../packages'

Vue.use(FullScreenContainer)
```

And then we can use the `FullScreenContainer` to wrap your component  in the sigal vue component, like this:

```vue
<template>
    <FullScreenContainer>
        <div></div>
    </FullScreenContainer>
</template>
```