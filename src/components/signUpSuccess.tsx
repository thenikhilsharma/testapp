import React from 'react'
import Link from 'next/link'

const signUpSuccess = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-60'>
      <h1 className="text-white">User is Successfully Registered!</h1>
      <div>
        <Link href="/signin">
          <div className="text-white bg-teal-800 p-3 m-2 rounded-md cursor-pointer w-40 text-center">
            Sign In
          </div>
        </Link>
      </div>
    </div>
  )
}

export default signUpSuccess
