import Link from 'next/link'
import React from 'react'

const AIMS = () => {
  return (
    <div>
      <h1 className="text-white">THIS IS AIMS HOME PAGE</h1>
      <Link href={'/signin'}>
        <p className='text-white'>Sign In</p>
      </Link>
    </div>
  )
}

export default AIMS
