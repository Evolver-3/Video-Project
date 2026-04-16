import React from 'react'
import TopNav from './TopNav'

const Wrapper = ({children}) => {
  return (
    <main>
      <TopNav/>
      {children}
    </main>
  )
}

export default Wrapper