import React, { useState } from 'react'
import './UpdatePassword.css'
import { Link } from 'react-router-dom'
import { Typography ,Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { loginuser, updatePassword } from '../../actions/user'

const UpdatePassword = () => {
    const [oldpassword,setoldpassword] = useState("")
    const [newpassword,setnewpassword] = useState("")
    const dispatch = useDispatch();
    const submirHandler = (e) =>{
        e.preventDefault();
        dispatch(updatePassword(oldpassword,newpassword))
        
    }
  return (
    <div className='updatePassword'>
    <form className='updatePasswordForm' onSubmit={submirHandler}>
    <Typography variant='h3' style={{padding:"2vmax"}}>Social App</Typography>
    <input className='updatePasswordInputs' type="password" placeholder='Old Password' required value={oldpassword} onChange={(e)=>setoldpassword(e.target.value)} />
    
    <input className='updatePasswordInputs' type="password" placeholder='New Password' required value={newpassword} onChange={(e)=>setnewpassword(e.target.value)} />
    
    <Button type='Submit`'>Change Password</Button>

    </form>
      
    </div>
  )
}

export default UpdatePassword
