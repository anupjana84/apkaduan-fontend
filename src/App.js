
import './App.css'
import Home from './layout/core/Home'
import About from './layout/core/About'
import Dashboard from './layout/core/Dashboard'
import Login from './layout/core/Login'
import Register from './layout/core/Register'
import RegisterDistAdmin from './layout/core/RegisterDistAdmin'
import RegisterSeller from './layout/core/RegisterSeller'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import { Routes, Route, Link } from 'react-router-dom'
import AllService from './layout/admin/service/AllService'
import SerViceAdd from './layout/admin/service/SerViceAdd'
import AddCategory from './layout/admin/category/AddCategory'
import Allcategory from './layout/admin/category/Allcategory'
import AddState from './layout/admin/state/AddState'
import AllState from './layout/admin/state/AllState'
import AddDistrict from './layout/admin/district/AddDistrict'
import AllDistrict from './layout/admin/district/AllDistrict'



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/serViceAdd" element={<SerViceAdd />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allService" element={<AllService />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/allCategory" element={<Allcategory />} />
        <Route path="/addState" element={<AddState />} />
        <Route path="/allState" element={<AllState />} />
        <Route path="/addDistrict" element={<AddDistrict />} />
        <Route path="/allDistrict" element={<AllDistrict />} />
        <Route path="/registerDistAdmin" element={<RegisterDistAdmin />} />
        <Route path="/registerSeller" element={<RegisterSeller />} />
       
      </Routes>
      <ToastContainer autoClose={5000}  />
    </>
  )
}

export default App
