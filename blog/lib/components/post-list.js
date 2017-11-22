import React from 'react'
import { chunk } from 'lodash'
import PostCard from './post-card'
import Pagination from './pagination'
import { object, number, array } from 'prop-types'

const renderPost = (post, i) => (
  <li className="post-card" key={'post-' + i}>
    <PostCard post={post} />
  </li>
)

const PostList = (props) => {
  const publishedPosts = props.posts
  let params = props.params || false
  let chunks = chunk(publishedPosts, props.pageSize)
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
  } else if (publishedPosts.length > props.pageSize) {
    next = 2
  }
  posts = chunks[index]

  return (
    <div>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {posts.map(renderPost)}
      </ul>
      <Pagination {...props}
        index={index}
        previous={previous}
        next={next}
      />
    </div>
  )
}

PostList.propTypes = {
  posts: array,
  params: object,
  pageSize: number
}

export default PostList
