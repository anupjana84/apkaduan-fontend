import logo from './logo.svg'
import './App.css'
import Home from './layout/core/Home'
import About from './layout/core/About'
import Dashboard from './layout/core/Dashboard'
import Login from './layout/core/Login'
import Register from './layout/core/Register'



import { Routes, Route, Link } from 'react-router-dom'
import AllService from './layout/admin/service/AllService'
import Services from './layout/admin/service/Services'
import AddCategory from './layout/admin/category/AddCategory'
import Allcategory from './layout/admin/category/Allcategory'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allService" element={<AllService />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/allCategory" element={<Allcategory />} />
       
      </Routes>
    </>
  )
}

export default App
