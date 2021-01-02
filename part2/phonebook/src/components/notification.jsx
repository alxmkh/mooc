import React from 'react'
import '../index.css'

const Notification = ({ message, isError }) => {
    if (message === null) {
        return null
    }

    return (
        <>
            {isError
            ? <div className="removePersonMessage">
                    {message}
                </div>
            :<div className="addMessage">
                {message}
            </div>}
        </>

    )
}

export default Notification;