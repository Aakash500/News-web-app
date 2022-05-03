import React, { Component } from 'react'

export default class Notfound extends Component {
  render() {
    return (
        <div className="card text-white bg-dark mb-3 mt-3">
        <div className="card-header">Message</div>
        <div className="card-body">
          <h5 className="card-title">No news found</h5>
          <p className="card-text">we suggest to try more appropriate keyword or check spelling of your keyword</p>
        </div>
      </div>
    )
  }
}
