import React, { Component } from 'react'

export default class Newsitem extends Component {

    render() {
        const {title, description, imageUrl, date, source} = this.props;
        return (
            <div>
                <div className="card my-3">
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">{new Date(date).toGMTString()}</small></p>
                            <a href="/" className="btn btn-dark btn-sm">read more</a>
                        </div>
                        <span style={{
                            transform:"translate(-5%,-50%)"
                        }} className="position-absolute top-0 start-0 badge rounded-pill bg-danger">{source}</span>
                </div>
            </div>
        )
    }
}
