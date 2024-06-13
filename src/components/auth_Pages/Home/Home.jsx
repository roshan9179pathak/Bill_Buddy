import React from 'react'
import './home.css'
import {Button} from '../../index'
export default function Login() {
    

    return (
        <div className={`${'product-login'}`}>
            <h2 className={'product-heading'}>Welcome Back!</h2>
            <p className={'product-message'}>We’re thrilled to see you again. <span className='text-[#7C5DFA]'>Log-In</span> so you can continue exploring all the amazing features we have in store.</p>
            <div className={`${'product-buttons-container'}`}>
                <Button className='guest_button'>Guest Login</Button>
                <Button className='login_button'>Login</Button>
            </div>
        </div>
    )
}
