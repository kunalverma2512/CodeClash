import React from 'react'
import SideBar from '../sections/SideBar'
import DashboardGallery from '../sections/DashboardGallery';
import DashGreet from '../sections/DashGreet';
import CFConnection from '../sections/CFConnection';
import QuoteSection from '../sections/QuoteSection';
import DashboardStatsSection from '../../components/user/DashboardStatsSection';

const Dashboard = () => {
  return (
    <div className='w-full min-h-screen overflow-x-hidden'>
      <DashGreet/>
      <CFConnection/>
      <DashboardStatsSection/>
      <QuoteSection/>
    </div>
  )
}

export default Dashboard
