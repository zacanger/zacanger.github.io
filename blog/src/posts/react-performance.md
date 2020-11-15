---
title: React Performance
created: 2016-05-14
tags:
  - react
  - performance
---

* Take a baseline measurement.
  * There's no way to measure improvements without something to measure against.
  * Chrome's Timeline thing works well for this.
  * Try measuring total elapsed time between the initial paint and the final rendering.
  * Make sure the 'Paint' and 'Screenshot' options are checked.
* Obviously the first big one is to just make your production code production code.
  * `NODE_ENV=production`, `webpack -p`, etc.
  * You can do something like this in your Webpack config:

```javascript
// stuff
plugins : [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV' : JSON.stringify('production')
  })
, new webpack.optimize.UglifyJsPlugin({
    compress : {
      warnings : false
    }
  })
]
// stuff
```

* Reduce calls to `React.createClass` (if we're still doing that).
  * Try using React Inline Elements for this.
  * We could configure Babel for this like so (this example would go directly in your package.json):

```json
"babel": { "env": { "production": { "plugins": [
  "transform-react-constant-elements",
  "transform-react-inline-elements"
] } } }
```

* Keep checking against the initial benchmark.
* 'babel-plugin-transform-react-remove-prop-types' might also be useful. It removes unwanted/unused React.PropTypes.
* There's also 'babel-preset-react-optimize'
