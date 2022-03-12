
import {Outlet,  Navigate, } from 'react-router-dom'
import { isAutheticated,isTransition } from '../helper';
const DistScriptionValidRout = () => {
  return (
  
 
 
 
 isTransition() ? <Outlet/>:< Navigate to="/dist/subcription"/>
  
   
  )
}

export default DistScriptionValidRout