import React from 'react'
import { any, string } from 'prop-types'

class Pagination extends React.Component {
  render () {
    let previous
    let next
    if (typeof this.props.previous === 'number') {
      previous = (
        <a href={this.props.baseUrl + 'page/' + this.props.previous}>
          Previous
        </a>
      )
    }
    if (typeof this.props.next === 'number') {
      next = (
        <a href={this.props.baseUrl + 'page/' + this.props.next}>
          Next
        </a>
      )
    }

    return (
      <div>
        {previous}
        {next}
      </div>
    )
  }
}

Pagination.defaultProps = {
  next: false,
  previous: false
}

Pagination.propTypes = {
  next: any,
  previous: any,
  baseUrl: string
}

export default Pagination
