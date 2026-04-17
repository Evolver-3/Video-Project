import React from 'react'
import TopNav from './NavData/TopNav'

const Wrapper = ({children}) => {
  return (
    <main>
      <TopNav />
      {children}
    </main>
  )
}

export default Wrapper