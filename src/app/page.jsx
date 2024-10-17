import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='bg-gray-50'>

      <Link href={'/posts'} className='bg-orange-600 m-10 px-4 py-2 text-white font-bold rounded-md inline-block'>
      
      Go To Posts
      </Link>
    </div>
  )
}

export default page