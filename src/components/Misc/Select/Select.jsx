import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props   
},ref) {
    
const id = useId()
    return (
        <div>
            {label && <label
                htmlFor={id}
                className=''
            >
                {label}
                </label>}

        <select  
        {...props}
        ref = {ref}
        id={id}
        className={className}
        >

            {options?.map((option) =>(
                <option key={option} value={option}>
                    {option}
                    </option>
            ))}
        </select>

        </div>
    )
}

export default React.forwardRef(Select)