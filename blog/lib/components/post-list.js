import React from 'react'
import formatDate from './format-date'
import { object, arrayOf } from 'prop-types'
import { Post } from './types'

const PostList = ({ posts }) => (
  <ul>
    {posts.map((post, i) => (
      <li key={`post-${i}`}>
        <a href={'/blog/posts/' + post.slug}>{post.title}</a> &mdash;{' '}
        {formatDate(new Date(post.created))}
        {post.subhead && <div>{post.subhead}</div>}
      </li>
    ))}
  </ul>
)

PostList.propTypes = {
  posts: arrayOf(Post),
  params: object,
}

export default PostList
