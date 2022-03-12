import React from 'react'
import { isAutheticated } from '../helper';
import {Outlet,  Navigate, } from 'react-router-dom'

const AdminRoute = () => {
    return (<>
  <></>
  <Outlet/> 
  </>
       //isAutheticated() && isAutheticated().user.role==='admin'?
        
      //  :< Navigate to="/" />
      
     )
}

export default AdminRoute