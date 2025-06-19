import React from 'react'
import WelcomeSection from '../../components/admin/DashboardSections/WelcomeSection'
import GuidelinesSection from '../../components/admin/DashboardSections/GuidelinesSection'
import AnalyticsSection from '../../components/admin/DashboardSections/AnalyticsSection'
import EthicsFaqSection from '../../components/admin/DashboardSections/EthicsFAQSection'

const AdminDashboard = () => {
  return (
    <div className="p-6 min-h-screen">
      <WelcomeSection/>
      <GuidelinesSection/>
      <AnalyticsSection/>
      <EthicsFaqSection/>
    </div>
  )
}

export default AdminDashboard
