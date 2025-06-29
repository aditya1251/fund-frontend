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

const Dashboard = () => {
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
              <Grid size={12}>
                <ProductSales />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}>
            <UpcomingSchedules />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}>
            <TopPayingClients />
          </Grid>
          <Grid size={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard
