import React from 'react'
import Head from './head'
import Body from './body'
import { arrayOf, object } from 'prop-types'

class App extends React.Component {
  render () {
    const { posts, params } = this.props

    let post = false

    if (params && params.post) {
      const slug = params.post
      post = posts.find((p) => p.slug === slug)
    }

    return (
      <html>
        <Head {...this.props} post={post} />
        <Body {...this.props} post={post} />
      </html>
    )
  }
}

App.propTypes = {
  posts: arrayOf(object),
  params: object
}

export default App
