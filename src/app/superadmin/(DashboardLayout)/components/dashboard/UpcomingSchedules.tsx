import DashboardCard from '@/app/superadmin/(DashboardLayout)/components/shared/DashboardCard'
import { useGetNotificationsQuery } from '@/redux/services/notificationApi'
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab'
import { Box, Skeleton, Typography } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'

const NotificationsCard = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useGetNotificationsQuery({ userId, page: 1, limit: 4 })

  return (
    <DashboardCard title='Notifications'>
      <Timeline
        className='theme-timeline'
        sx={{
          p: 0,
          '& .MuiTimelineConnector-root': {
            width: '1px',
            backgroundColor: '#efefef',
          },
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.4,
            paddingLeft: 0,
            fontSize: '14px',
            color: 'text.secondary',
          },
        }}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <TimelineItem key={i}>
                <TimelineOppositeContent>
                  <Skeleton width={60} />
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{ borderColor: '#FFD700', borderWidth: 2 }}
                    variant='outlined'
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Skeleton width='90%' />
                  <Skeleton width='60%' />
                </TimelineContent>
              </TimelineItem>
            ))
          : data?.notifications.map((notification) => (
              <TimelineItem key={notification._id}>
                <TimelineOppositeContent>
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{ borderColor: '#FFD700', borderWidth: 2 }}
                    variant='outlined'
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 0.5 }}>
                    {notification.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {notification.message}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
      </Timeline>
    </DashboardCard>
  )
}

export default NotificationsCard
