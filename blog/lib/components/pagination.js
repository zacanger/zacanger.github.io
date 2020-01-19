import React from 'react'
import { any, string } from 'prop-types'

const Pagination = ({ baseUrl, previous = false, next = false }) => (
  <div>
    {typeof previous === 'number' && (
      <a style={{ marginRight: '8px' }} href={`${baseUrl}page/${previous}`}>
        Newer
      </a>
    )}
    {typeof next === 'number' && <a href={`${baseUrl}page/${next}`}>Older</a>}
  </div>
)

Pagination.propTypes = {
  next: any,
  previous: any,
  baseUrl: string,
}

export default Pagination
