import React from 'react'

export default function Button({children , className, type,...props}) {
    

    return (
        <button 
        
        type={type}
        className={`${className} cursor-pointer`}
        {...props}
        >
            {children}
        </button>
    )
}
