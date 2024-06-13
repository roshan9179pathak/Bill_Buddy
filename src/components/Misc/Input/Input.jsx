import React from 'react'

export function Input({className,placeholder,type}) {
    

    return (
        <input type={type}
            placeholder={placeholder}
            className={className}
        />
    )
}
