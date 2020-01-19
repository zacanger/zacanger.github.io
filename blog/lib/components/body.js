import React from 'react'
import Header from './header'
import Footer from './footer'
import { string, node } from 'prop-types'
import formatDate from './format-date'
import { Post } from './types'

const Body = (props) => {
  const { post, children } = props
  const date = post ? formatDate(post.created) : ''
  const view = React.cloneElement(children, props)

  return (
    <body>
      <Header {...props} title={post.title} description={date} />
      {view}
      <Footer {...props} />
    </body>
  )
}

Body.propTypes = {
  title: string,
  post: Post,
  children: node,
}

export default Body
