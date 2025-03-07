import React from 'react'
import Link from 'next/link'

const Success = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-60'>
      <h1 className="text-white">Course is Successfully Added</h1>
      <div>
        <Link href="/course">
          <div className="text-white bg-teal-800 p-3 m-2 rounded-md cursor-pointer w-40 text-center">
            Check Courses
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Success