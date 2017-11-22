import React from 'react'
import Header from './header'
import Footer from './footer'
import { string, node, any } from 'prop-types'
import formatDate from './format-date'

class Body extends React.Component {
  render () {
    const { post, children } = this.props
    const date = post ? formatDate(post.created) : ''

    const view = React.cloneElement(children, this.props)

    return (
      <body>
        <Header {...this.props}
          title={post.title}
          description={date} />
        {view}
        <Footer {...this.props} />
      </body>
    )
  }
}

Body.propTypes = {
  title: string,
  post: any,
  children: node
}

export default Body
