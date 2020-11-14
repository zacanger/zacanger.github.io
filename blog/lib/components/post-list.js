import React from 'react'
import PostCard from './post-card'
import { object, arrayOf } from 'prop-types'
import { Post } from './types'

const PostList = ({ posts }) => (
  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
    {posts.map((p, i) => (
      <li key={`post-${i}`}>
        <PostCard post={p} />
      </li>
    ))}
  </ul>
)

PostList.propTypes = {
  posts: arrayOf(Post),
  params: object,
}

export default PostList
