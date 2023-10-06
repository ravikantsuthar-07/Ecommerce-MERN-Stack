import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Spinner = ({path = "login"}) => {
    const [count, serCount] = useState(5);
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            serCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 &&  navigate(`/${path}`);
        return () => clearInterval(interval)
    }, [count, navigate, path])
    return (
        <div>
            <div className="text-center align-items-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Spinner
