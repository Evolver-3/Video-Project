import React from 'react'
import { useTheme } from '../../useTheme'

const DarkBtn = () => {
  const {darkMode,toggleTheme}=useTheme()
  return (
    <button onClick={toggleTheme} className='bg-blue-400'>
      {darkMode?"dark":"light"}
    </button>
  )
}

export default DarkBtn