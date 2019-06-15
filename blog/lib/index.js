import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import App from './components/app'
import PostList from './components/post-list'
import Post from './components/post'

export default (locals, callback) => {
  let view = false
  const params = {}

  if (locals.path.match(/^\/$/)) {
    view = <PostList />
  } else if (locals.path.match(/^\/posts/)) {
    params.post = locals.path.replace(/^\/posts\//, '')
    view = <Post />
  } else {
    console.log('NO MATCHING PATH')
  }

  const html = renderToStaticMarkup(
    <App {...locals}
      params={params}
      children={view}
    />
  )

  callback(null, `<!DOCTYPE html>${html}`)
}
