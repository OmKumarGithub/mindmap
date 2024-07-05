import React from 'react'
import Navbar from '../component/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
   <>
    <Navbar></Navbar>
    <Outlet/>
   </>
  )
}

export default Layout