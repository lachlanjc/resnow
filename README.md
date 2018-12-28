# resnow ❄️

> React component for snow on your webpage ☃️

![npm](https://img.shields.io/npm/v/resnow.svg)](https://www.npmjs.com/package/resnow)

- Used on/extracted from [Hack Club Secret Santa](https://hackclub.com/santa)
- Code heavily inspired by [`react-snow-effect`](https://github.com/jungledre/react-snow-effect), but updated for React 16, supports server-rendering, & offers more options
- Bootstrapped with [`create-react-library`](https://www.npmjs.com/package/create-react-library)

## Install

```bash
npm install --save resnow
yarn add resnow
```

## Usage

```jsx
import React from 'react'
import Snow from 'resnow'

export default () => (
  <div style={{ background: 'blue' }}>
    <Snow />
  </div>
)
```

| Prop             | Effect                                                              |
| ---------------- | ------------------------------------------------------------------- |
| `max`            | Number of particles. Default: `32`                                  |
| `speed`          | Speed of particles, in ms. Default: `32`                            |
| `color`          | Color of particles. Default: `rgba(255, 255, 255, 0.75)`            |
| `width`/`height` | Size of `<canvas>`. Default: `1024`x`768`, but fills browser window |

## License

MIT © [@lachlanjc](https://github.com/lachlanjc)
