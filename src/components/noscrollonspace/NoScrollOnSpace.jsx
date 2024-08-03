'use client'

import React, { useEffect } from 'react'

const NoScrollOnSpace = ({ children }) => {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                event.preventDefault();
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener when the component unmounts
        return () => {
        document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);



    return (
        <div>{children}</div>
    )
}

export default NoScrollOnSpace