'use client'
import { Paper, Box, Grid } from '@mui/material'
import PageContainer from '@/app/rm/(DashboardLayout)/components/container/PageContainer'
import DashboardCard from '@/app/rm/(DashboardLayout)/components/shared/DashboardCard'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { darkTheme, lightTheme } from '@/utils/theme/modes';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}))

const Shadow = () => {
  return (
    <PageContainer title='Shadow' description='this is Shadow'>
      <DashboardCard title='Shadow'>
        <Grid container spacing={2}>
          {[lightTheme, darkTheme].map((theme, index) => (
            <Grid key={index} size={6}>
              <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                  }}>
                  {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
                    <Item key={elevation} elevation={elevation}>
                      {`elevation=${elevation}`}
                    </Item>
                  ))}
                </Box>
              </ThemeProvider>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </PageContainer>
  )
}

export default Shadow
