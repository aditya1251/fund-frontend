'use client'
import { Grid, Box } from '@mui/material'
import PageContainer from '@/app/superadmin/(DashboardLayout)/components/container/PageContainer'
// components
import ProfitExpenses from '@/app/superadmin/(DashboardLayout)/components/dashboard/ProfitExpenses'
import TrafficDistribution from '@/app/superadmin/(DashboardLayout)/components/dashboard/TrafficDistribution'
import UpcomingSchedules from '@/app/superadmin/(DashboardLayout)/components/dashboard/UpcomingSchedules'
import TopPayingClients from '@/app/superadmin/(DashboardLayout)/components/dashboard/TopPayingClients'
import Blog from '@/app/superadmin/(DashboardLayout)/components/dashboard/Blog'
import ProductSales from '@/app/superadmin/(DashboardLayout)/components/dashboard/ProductSales'
import { useSession } from 'next-auth/react'

const Dashboard = () => {
  const { data: session } = useSession();
    const userId = session?.user?.id || "";
  return (
    <PageContainer title='Dashboard' description='this is Dashboard'>
      <Box>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}>
            <ProfitExpenses />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <TrafficDistribution />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4.5,
            }}>
            <UpcomingSchedules userId={userId} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 7,
            }}>
            <TopPayingClients />
          </Grid>
          {/* <Grid size={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard
