
import './App.css'
import Home from './layout/core/Home'
import About from './layout/core/About'
import Dashboard from './layout/core/Dashboard'
import Login from './layout/core/Login'
import Register from './layout/core/Register'
import OtpSendDist from './layout/core/OtpSendDist'
import RegisterSeller from './layout/core/RegisterSeller'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import { Routes, Route } from 'react-router-dom'
import AllService from './layout/admin/service/AllService'
import SerViceAdd from './layout/admin/service/SerViceAdd'
import AddCategory from './layout/admin/category/AddCategory'
import Allcategory from './layout/admin/category/Allcategory'
import AddState from './layout/admin/state/AddState'
import AllState from './layout/admin/state/AllState'
import AddDistrict from './layout/admin/district/AddDistrict'
import AllDistrict from './layout/admin/district/AllDistrict'

/// dist route
import AdminRoute from './routes/AdminRoute'
import DistAdminRoute from './routes/DistAdminRoute'
import DistAdminDashboard from './layout/distadmin/DistAdminDashboard'
import Subcription from './layout/distadmin/Subcription'
import Subcription1 from './layout/distadmin/Subcription1'

//scucription check
import DistScriptionValidRout from './routes/DistScriptionValidRout'


//State admin
import OtpSendState from './layout/core/OtpSendState'
import StateAdminRoute from './routes/StateAdminRoute'
import StateAdminDashboard from './layout/stateadmin/StateAdminDashboard'
import Application from './layout/distadmin/Application'
// import Subcription from './layout/stateadmin/Subcription'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/serViceAdd"  element={<SerViceAdd />} />
        <Route path="/about" element={<About />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allService" element={<AllService />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/allCategory" element={<Allcategory />} />
        <Route path="/allState" element={<AllState />} />
        <Route path="/addDistrict" element={<AddDistrict />} />
        <Route path="/allDistrict" element={<AllDistrict />} />
        <Route path="/OtpSendDist" element={<OtpSendDist />} />
        <Route path="/registerSeller" element={<RegisterSeller />} />
                  {/*============ state */}
        <Route path="/otpSendState" element={<OtpSendState />} />

                    {/*============ state */}


        <Route path="/addState" element={<AddState />} />
                    {/* ==========dist route============== */}
        <Route path='dist' element={<DistAdminRoute/>}>
        <Route path='sub'  element={<DistScriptionValidRout/>}>
              <Route path="subcription1"  element={<Subcription1 />} />

          </Route>

        <Route path="subcription"  element={<Subcription />} />
         
        </Route>
                 {/* ==========dist route============== */}
              {/* ==========state admin route============== */}
        <Route path='state' element={<StateAdminRoute/>}>

        <Route path="dashboard" index element={<StateAdminDashboard />} />
        <Route path="subcription" index element={<Subcription />} />
        </Route>
                    {/* ==========state admin route============== */}
                    {/* ==========admin route============== */}
        {/* <Route path='admin'  element={<AdminRoute/>}>
          <Route path="dashboard" element={<Dashboard />} />
        
        </Route> */}
                {/* ==========admin route============== */}
                {/* <Route path="admin/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="dist/AdminDashboard" element={<StateAdminDashboard />} /> */}
        {/* <Route path="*" element={<h1>Page Not Found</h1>} /> */}
       

       
      </Routes>
      <ToastContainer autoClose={5000}  />
    </>
  )
}

export default App
