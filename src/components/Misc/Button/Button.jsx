import React from 'react'

function Button({children , className, type,...props},ref) {
    

    return (
        <button 
        
        type={type}
        className={`${className} cursor-pointer`}
        {...props}
        ref={ref}
        >
            {children}
        </button>
    )
}

export default React.forwardRef(Button)