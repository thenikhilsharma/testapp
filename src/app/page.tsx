import React from 'react'
import './home.css'
import Link from 'next/link'

const Home = () => {
  return (
    <div className='flex item-center justify-center'>
      <Link href="/course">
        <div className='login'>
          LogIn
        </div>
      </Link>
    </div>
  )
}

export default Home
