import React from 'react'

const NotFoundPage = () => {
  const handleGoToHome = () => {
    window.location.href = '/';
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-8xl'>404 Not Found</h1>
      <button onClick={handleGoToHome} className='cursor-pointer text-2xl bg-red-600 rounded-2xl px-4 py-2 text-white'>Go to Home</button>
    </div>
  )
}

export default NotFoundPage
