import React, { useId } from 'react'

const Input = function({
    className,
    placeholder,
    type,
    value,
    label,
    ...props
},ref) {
    
const id = useId()
    return (
        
       

        <input 
        
        id={id}
        type={type}
            placeholder={placeholder}
            className={className}
            ref = {ref}
            {...props}
        />
        
    )
}

export default React.forwardRef(Input)
