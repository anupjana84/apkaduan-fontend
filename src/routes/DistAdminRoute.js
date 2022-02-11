import React from 'react'
import {Outlet, useNavigate , Navigate, } from 'react-router-dom'
import { isAutheticated } from '../helper';
const DistAdminRoute = () => {
  let navigate = useNavigate();
    const auth=true
  return (
  
    // isAutheticated() && isAutheticated().user.role==='distadmin'?
     <Outlet/> 
    //  :< Navigate to="/" />
   
  )
}

export default DistAdminRoute