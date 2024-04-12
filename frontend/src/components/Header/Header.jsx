import React, { useState } from 'react'
import './Header.css'
import {Link } from 'react-router-dom'
import {
  Home,
  HomeOutlined,
  Add,AddOutlined,
  Search,
  SearchOutlined,
  AccountCircle,
  AccountCircleOutlined,
} from '@mui/icons-material'
const Header = () => {
  const [tab,settab]=useState(window.location.pathname);
  console.log(tab);
  return (
    <div className='header'>
      <Link to='/' onClick={()=>settab('/')}>
        {tab==='/'?<Home style={{color:"black"}} />:<HomeOutlined style={{color:"grey"}}/>}
      </Link>
      <Link to='/newpost' onClick={()=>settab('/newpost')}>
      {tab==='/newpost'?<Add style={{color:"black"}}/>:<AddOutlined style={{color:"grey"}}/>}
      </Link>
      <Link to='/search'  onClick={()=>settab('/search')}>
      {tab==='/search'?<Search style={{color:"black"}}/>:<SearchOutlined style={{color:"grey"}}/>}
      </Link>
      <Link to='/account '  onClick={()=>settab('/account')}>
      {tab==='/account'?<AccountCircle style={{color:"black"}}/>:<AccountCircleOutlined style={{color:"grey"}}/>}
      </Link>
    </div>
  )
}

export default Header
