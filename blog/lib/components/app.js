import React from 'react'
import Head from './head'
import Body from './body'
import { Post } from './types'
import { arrayOf, object } from 'prop-types'

const App = (props) => {
  const { posts, params } = props
  let post = false

  if (params && params.post) {
    const slug = params.post
    post = posts.find((p) => p.slug === slug)
  }

  return (
    <html lang="en">
      <Head {...props} post={post} />
      <Body {...props} post={post} />
    </html>
  )
}

App.propTypes = {
  posts: arrayOf(Post),
  params: object,
}

export default App
