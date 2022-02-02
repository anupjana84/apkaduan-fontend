import React from 'react'
import Header from './Header'

const Master = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Master
