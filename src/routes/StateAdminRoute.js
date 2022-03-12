import {Outlet,  Navigate, } from 'react-router-dom'
import { isAutheticated } from '../helper';

const StateAdminRoute = () => {
    return (
  
        //isAutheticated() && isAutheticated().user.role==='stateadmin'?
        <Outlet/> 
       //  :< Navigate to="/" />
      
     )
}

export default StateAdminRoute