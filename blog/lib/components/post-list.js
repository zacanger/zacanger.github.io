import React from 'react'
import { chunk } from 'lodash'
import PostCard from './post-card'
import Pagination from './pagination'
import { object, number, array } from 'prop-types'

class PostList extends React.Component {
  renderPost (post, i) {
    return (
      <li className="post-card" key={'post-' + i}>
        <PostCard post={post} />
      </li>
    )
  }

  render () {
    const publishedPosts = this.props.posts
    let params = this.props.params || false
    let chunks = chunk(publishedPosts, this.props.pageSize)
    let page
    let index = 0
    let posts = []
    let previous = false
    let next = false
    if (params && params.page) {
      page = parseInt(params.page, 10)
      index = params.page - 1
      if (chunks[index - 1]) {
        previous = page - 1
      }
      if (chunks[index + 1]) {
        next = page + 1
      }
    } else if (publishedPosts.length > this.props.pageSize) {
      next = 2
    }
    posts = chunks[index]
    return (
      <div>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {posts.map(this.renderPost)}
        </ul>
        <Pagination {...this.props}
          index={index}
          previous={previous}
          next={next}
        />
      </div>
    )
  }
}

PostList.propTypes = {
  posts: array,
  params: object,
  pageSize: number
}

export default PostList
