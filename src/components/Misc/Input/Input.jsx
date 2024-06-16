import React from 'react'

const Input = function({
    className,
    placeholder,
    type,
    ...props
},ref) {
    

    return (
        <input 
        type={type}
            placeholder={placeholder}
            className={className}
            ref = {ref}
            {...props}
        />
    )
}

export default React.forwardRef(Input)
