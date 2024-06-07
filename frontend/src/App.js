
import './App.css';

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Header from './components/Header/Header';
import  Login  from './components/login/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loaduser, registerUser } from './actions/user';
import Account from './components/Account/Account';
import  Home  from './components/home/Home';
import NewPost from './components/NewPost/NewPost';

import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import Signup from './components/Signup/Signup';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import Register from './components/Signup/Signup';
import UserProfile from './components/UserProfile/UserProfile';
import NotFound from './components/NotFound/NotFound';
import Search from './components/Search/Search';

function App() {
  const {isAuthenticated}  = useSelector((state)=>state.user)
  const dispatch = useDispatch();

  
 

  return (
    <Router>
     {isAuthenticated && <Header/>}

      
    <Routes>
      <Route path='/' element={isAuthenticated?<Home/>:<Login/>}/>
      <Route path='/account' element={isAuthenticated?<Account/>:<Login/>}/>
      <Route path='/register' element={isAuthenticated?<Account/>:<Register/>}/>
      <Route path='/update/profile' element={isAuthenticated?<UpdateProfile/>:<Login/>}/>
      <Route path='/update/password' element={isAuthenticated?<UpdatePassword/>:<Login/>}/>
      <Route path='/user/:id' element={isAuthenticated?<UserProfile/>:<Login/>}/>
      <Route path="*" element={<NotFound/>} />

    <Route path='/newpost' element={isAuthenticated?<NewPost/>:<Login/>}/>
    <Route path='/search' element={isAuthenticated?<Search/>:<Login/>}/>
   
    </Routes>
    
   
 
    </Router>
    
  );
}

export default App;
