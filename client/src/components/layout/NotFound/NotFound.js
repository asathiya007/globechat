import React from 'react'

const NotFound = () => {
    return (
        <div className="top-space tc background-dark br4 w-80 pb5">
            <h1 className="white-text x-large">
                <i class="fas fa-exclamation-triangle white-hover-1"></i>
                {' '}Page Not Found
            </h1>
            <p className="f2">Sorry, this page doesn't exist!</p>
        </div>
    )
}

export default NotFound
