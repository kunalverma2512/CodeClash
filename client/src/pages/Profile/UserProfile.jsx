import React from 'react'
import UserStatSection from '../../components/profile/UserStatSection'
import CodeforcesChartsSection from '../../components/profile/CodeforcesChartsSection'

const UserProfile = () => {
  return (
    <div className='w-full min-h-screen overflow-x-hidden'>
      <UserStatSection/>
      <CodeforcesChartsSection/>
    </div>
  )
}

export default UserProfile
