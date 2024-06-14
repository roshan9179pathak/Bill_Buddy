import React from 'react'
import './home.css'
import {Button} from '../../index'
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
    
        const navigate = useNavigate()

    return (
        <div className={`${'product-login'}`}>
            <h2 className={'product-heading'}>Welcome Back!</h2>
            <p className={'product-message'}>We’re thrilled to see you again. <span className='text-[#7C5DFA]'>Log-In</span> so you can continue exploring all the amazing features we have in store.</p>
            <div className={`${'product-buttons-container'}`}>
                <Button className='guest_button'>Guest Login</Button>
                <Button onClick={()=>navigate('/login')} className='login_button'>Login</Button>
            </div>
        </div>
    )
}
