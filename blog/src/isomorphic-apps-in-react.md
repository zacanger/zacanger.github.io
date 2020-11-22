---
title: Isomorphic Apps in React
created: 2016-01-25
tags:
  - isomorphic
  - react
  - js
---

I don't know for sure that this deserves its own file... we'll see.

We'll be processing several requests simultaneously, so we should deal with a
global state (dependent on user) (like flux stores state, or whatever).

About 90%, really, of the client and server code, should be shared.

Which parts should be isomorphic?

1. view
1. styles
1. routing
1. data fetching
1. config
1. i10n

The view is already there, really. Just gotta use `ReactDOM.renderToString`
instead of `ReactDOM render`.

Inline styles better than individual sheets in the dirs, for this
architecture. React supports them. That said, one should _emulate_ pseudo
attributes (:hover, :active, and :focus, for example) in your Javascript.
Handle your own prefixes (grooosss). Emulate your media queries in Js, too.
Gotta eventually merge the CSS somehow; http://stack.formidable.com/radium/
isn't half-bad for that.

Because there's so much Js to bundle up and load, it's actually okay to but
the bundle at the end of your markup for this case. But we want to split
things out in the webpack.config.js, so that we've got CSS on its own and can
load that first the way we used to. Here's a sample webpack.config.js:

```
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: "./src/app.js",
  plugins: [
    new webpackDefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new ExtractTextPlugin("[name].css")
  ],
  output : {
    path: __dirname + '/public/build/',
    filename: 'bundle.js',
    publicPath: 'build/'
  },
  module: {
    loaders: [
      {
        test: /\.css%/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader")
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=10000&mimietype=image/png"
      },
      {
        test: /\.jsx$/,
        loader: "react-hot!babel!eslint-loader",
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.js$/,
        loader: "babel!eslint-loader",
        exclude: [/node_modules/, /public/]
    ]
  },
  eslint: {
    configFile: '.eslintr`^c'
  }
}
```

React Router works well for isomorphic stuff. Here's an example of using it
with server-side rendering:

```
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import routes from './routes'

serve((req, res) =>
  // req.url would be full url path from original request, including query string
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
      if (error){res.status(500).send(error.message)}
      else if (redirectLocation){res.redirect(302, redirectLocation.pathname + redirectLocation.search)}
      else if (renderProps){res.status(200).send(renderToString(<RouterContext {...renderProps} />))}
      else {res.status(404).send('404 not found')}
  })
)
```

Redux in an isomporhic app: better than a singelton flux store. With Redux we
can use react-redux's react context. Using redux store's API makes dumping and
restoring store state easy. Check the code of
https://github.com/WebbyLab/itsquiz-wall for a really good, in-depth,
production app using all of the above tech in an isomorphic app.

Here's a simple api example that works both server- and client-side:

```
'use strict'
import apiFactory from './api'

const api=apiFactory({
  apiPrefix: 'http://pharoah.js.org/api/v1'
})
const promise = api.users.list()
```

Here's a promise-pased client: https://www.npmjs.com/package/axios

Here are two that use Fetch (which are fine in Mozilla and Chromium, now):
https://www.npmjs.com/package/isomorphic-fetch and
https://www.npmjs.com/package/node-fetch

So, here's what we might do on the client:

* render react components
* show spinners
* fetch component-dependent data
* update the page

And on the server:

* preload all the data
* render the page to a string
* send html to the client

How to do this isomorphically? Check that itsquiz app again, it's so much
easier than typing out an example here.

For a full-on tutorial using React and Redux to make an isomorphic app (Todos,
of course...), check here:
https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4
