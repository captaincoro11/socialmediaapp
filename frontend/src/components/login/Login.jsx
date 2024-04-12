import React, { useState ,useEffect } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { Typography ,Button } from '@mui/material'
import { useDispatch , useSelector } from 'react-redux'
import { loginuser } from '../../actions/user'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

const Login = () => {
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const dispatch = useDispatch();
    const {error,loading} = useSelector((state)=>state.user)
    const loginHandler = (e) =>{
        e.preventDefault();
        dispatch(loginuser(email,password))

    };
    
  useEffect(()=>{


   
     
    if(error){
      enqueueSnackbar(error);
      dispatch({
        type:"clearErrors"
      })
    
    }



      },[error,dispatch,loading]);
  return (
    <div className='login'>
    <form className='loginForm' onSubmit={loginHandler}>
    <Typography variant='h3' style={{padding:"2vmax"}}>Social App</Typography>
    <input type="email" placeholder='Email' required value={email} onChange={(e)=>setemail(e.target.value)} />
    <input type="password" placeholder='Password' required value={password} onChange={(e)=>setpassword(e.target.value)} />
    <Link to='/forgot/password'>
        <Typography>Forgot Password</Typography>
    </Link>
    <Button disabled={loading} type='Submit'>Login</Button>
    <Link to='/register'>
        <Typography>New User</Typography>
    </Link>
    <SnackbarProvider/>
    </form>
      
    </div>
  )
}

export default Login
