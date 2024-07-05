import React from 'react'
import './logout.css'
import {Button, Header} from '../../index'
import authservices from '../../../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/authslice'
export default function LogOut(props) {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogOut = async(e)=>{
        e.preventDefault()
        await authservices.logout().then(res =>{
                if(res){
                    <Header isAuthenticated={false} />
                    dispatch(logout())
                localStorage.removeItem('userId')
                localStorage.removeItem('userData')
               navigate('/') 
                }
        })
    }

    return (
        <div className='logout-main-container'>
            <div>
                <h2>Good Bye, see you soon</h2>
                <Button
                onClick={handleLogOut}
                type='button'
                className = 'logout-button'
                >Logout</Button>
            </div>
        </div>
    )
}
