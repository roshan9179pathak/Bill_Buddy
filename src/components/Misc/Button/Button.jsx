import React from 'react'

export default function Button({children , className, type}) {
    

    return (
        <button 
        type={type}
        className={`${className} cursor-pointer`}>
            {children}
        </button>
    )
}
