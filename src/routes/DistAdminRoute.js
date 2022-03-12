
import {Outlet,  Navigate, } from 'react-router-dom'
import { isAutheticated } from '../helper';
const DistAdminRoute = () => {
  return (
   isAutheticated() && isAutheticated().user.role==='distAdmin'?
  
   <Outlet/>  :< Navigate to="/" />
  
 
   
  )
}

export default DistAdminRoute