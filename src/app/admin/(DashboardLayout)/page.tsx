'use client'
import { Grid, Box } from '@mui/material'
import PageContainer from '@/app/admin/(DashboardLayout)/components/container/PageContainer'
// components
import ProfitExpenses from '@/app/admin/(DashboardLayout)/components/dashboard/ProfitExpenses'
import TrafficDistribution from '@/app/admin/(DashboardLayout)/components/dashboard/TrafficDistribution'
import UpcomingSchedules from '@/app/admin/(DashboardLayout)/components/dashboard/UpcomingSchedules'
import TopPayingClients from '@/app/admin/(DashboardLayout)/components/dashboard/TopPayingClients'
import Blog from '@/app/admin/(DashboardLayout)/components/dashboard/Blog'
import ProductSales from '@/app/admin/(DashboardLayout)/components/dashboard/ProductSales'

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
