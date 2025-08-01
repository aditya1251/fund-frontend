'use client'

import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material/styles'
import { Grid, Stack, Typography, Avatar, Skeleton } from '@mui/material'
import { IconArrowUpLeft } from '@tabler/icons-react'

import DashboardCard from '@/app/superadmin/(DashboardLayout)/components/shared/DashboardCard'
import { useGetPlanAnalyticsQuery } from '@/redux/services/analyticsApi'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const TrafficDistribution = () => {
  const theme = useTheme()
  const lightYellow = '#FFEB3B'
  const black = '#212121'

  // Fetch plan analytics data
  const { data, isLoading } = useGetPlanAnalyticsQuery()

  const colors = [lightYellow, black, theme.palette.secondary.light]

  // Prepare chart data
  const planNames = data?.map((item) => item.planName) || []
  const planCounts = data?.map((item) => item.count) || []

  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 170,
    },
    colors: colors,
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: planNames,
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  }

  return (
    <div className=' -z-50 relative'>
    <DashboardCard  title='Current Plan Usage'>
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid
          item
          xs={6}
          sm={7}
        >
          {isLoading ? (
            <>
              <Skeleton variant='text' width={120} height={35} />
              <Skeleton variant='text' width={160} height={20} />
              <Skeleton variant='rectangular' height={40} width={120} />
              <Skeleton variant='text' width={100} height={20} sx={{ mt: 2 }} />
            </>
          ) : (
            <>
              <Typography variant='h3' sx={{ fontWeight: '700' }}>
                {planCounts.reduce((a, b) => a + b, 0)} Users
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
                sx={{ mt: 1, alignItems: 'center' }}
              >
                {/* <Stack direction='row'>
                  <Avatar sx={{ bgcolor: '#e0f7fa', width: 21, height: 21 }}>
                    <IconArrowUpLeft width={18} color='#39B69A' />
                  </Avatar>
                  <Typography variant='subtitle2' sx={{ fontWeight: '600' }}>
                    +9%
                  </Typography>
                </Stack>
                <Typography variant='subtitle2' color='textSecondary'>
                  since last month
                </Typography> */}
              </Stack>
              <Stack spacing={2} sx={{ mt: 3 }}>
                {planNames.map((name, idx) => (
                  <Stack
                    key={name}
                    direction='row'
                    spacing={1}
                    alignItems='center'
                  >
                    <Avatar
                      sx={{
                        width: 9,
                        height: 9,
                        bgcolor: colors[idx % colors.length],
                        svg: { display: 'none' },
                      }}
                    />
                    <Typography
                      variant='subtitle2'
                      color='textSecondary'
                      sx={{ fontSize: '12px' }}
                    >
                      {name}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </>
          )}
        </Grid>

        {/* Right Column - Chart */}
        <Grid item xs={6} sm={5} >
          {isLoading ? (
            <Skeleton variant='circular' width='150px' height='150px' />
          ) : (
            <Chart
              options={optionscolumnchart}
              series={planCounts}
              type='donut'
              width='100%'
              height='150px'
            />
          )}
        </Grid>
      </Grid>
    </DashboardCard>
    </div>
  )
}

export default TrafficDistribution
