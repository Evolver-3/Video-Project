import React from 'react'
import { useTheme } from '../../useTheme'

const DarkBtn = () => {
  const {darkMode,toggleTheme}=useTheme()
  return (
    <button onClick={toggleTheme} className=''>
      {darkMode?"dark":"light"}
    </button>
  )
}

export default DarkBtn