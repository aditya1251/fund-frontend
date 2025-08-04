"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Box, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DashboardCard from "@/app/rm/(DashboardLayout)/components/shared/DashboardCard";
import { useSession } from "next-auth/react";
import { useGetLoansByRmIdQuery } from "@/redux/services/loanApi";

// Dynamically import ApexCharts (client-side only)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const menuOptions = ["Export", "Download", "Print"];

const ServiceCategoryChart = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const session = useSession();
  const rmId = session.data?.user?.id;
  
  // Fetch all loan data
  const { data: loansData = [], isLoading } = useGetLoansByRmIdQuery(rmId || "");
  
  // State for chart data
  const [chartData, setChartData] = React.useState({
    approved: [0, 0, 0, 0, 0], // [Private, Government, Insurance, Quick Loan, Taxation]
    pending: [0, 0, 0, 0, 0],
    rejected: [0, 0, 0, 0, 0],
  });
  
  // Process loan data for the chart
  React.useEffect(() => {
    if (loansData && loansData.length > 0) {
      // Initialize counters
      const counts = {
        approved: [0, 0, 0, 0, 0], // [Private, Government, Insurance, Quick Loan, Taxation]
        pending: [0, 0, 0, 0, 0],
        rejected: [0, 0, 0, 0, 0],
      };
      
      // Process each loan
      loansData.forEach((loan: any) => {
        let categoryIndex = 0; // Default to Private
        
        // Determine category index
        if (loan.loanType?.toLowerCase() === 'government') {
          categoryIndex = 1;
        } else if (loan.loanType?.toLowerCase() === 'insurance') {
          categoryIndex = 2;
        }
        else if (loan.loanType?.toLowerCase() === 'quick loan') {
          categoryIndex = 3;
        } else if (loan.loanType?.toLowerCase() === 'taxation') {
          categoryIndex = 4;
        }
        
        // Count by status
        if (loan.status.toLowerCase() === 'approved') {
          counts.approved[categoryIndex]++;
        } else if (loan.status.toLowerCase() === 'pending') {
          counts.pending[categoryIndex]++;
        } else if (loan.status.toLowerCase() === 'rejected') {
          counts.rejected[categoryIndex]++;
        }
      });
      
      // Update chart data
      setChartData(counts);
    }
  }, [loansData]);

  const primary = "#FFD439"; // your website's yellow
  const secondary = "#111111"; // black
  const tertiary = "#EF4444"; // red for rejection

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { 
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      },
      foreColor: "#333",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: isMobile ? "60%" : "45%",
        distributed: false,
      },
    },
    colors: [primary, secondary, tertiary],
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: ["Private", "Government", "Insurance", "Quick Loan", "Taxation"],
      axisBorder: { show: false },
      labels: {
        style: { 
          fontWeight: 600,
          fontSize: isMobile ? "10px" : "12px"
        },
      },
    },
    yaxis: {
      labels: {
        style: { 
          fontWeight: 600,
          fontSize: isMobile ? "10px" : "12px"
        },
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      fontWeight: 500,
      fontSize: isMobile ? "12px" : "14px",
      markers: {
        size: isMobile ? 4 : 6,
      },
      itemMargin: {
        horizontal: isMobile ? 8 : 12,
      }
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      style: {
        fontSize: isMobile ? "12px" : "14px"
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "60%",
            }
          },
          chart: {
            height: 350
          },
          legend: {
            position: "top",
            horizontalAlign: "center",
            fontSize: "12px",
            offsetY: 0,
            itemMargin: {
              horizontal: 6,
            }
          }
        }
      },
      {
        breakpoint: 480,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "70%",
            }
          },
          chart: {
            height: 300
          },
          legend: {
            fontSize: "10px",
            markers: {
              size: 5
            }
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "9px"
              }
            }
          }
        }
      }
    ]
  };

  const chartSeries = [
    {
      name: "Approved",
      data: chartData.approved,
    },
    {
      name: "Pending",
      data: chartData.pending,
    },
    {
      name: "Rejected",
      data: chartData.rejected,
    },
  ];

  return (
    <DashboardCard
      title="Services Category Comparison"
      action={
        <>
          <IconButton
            aria-label="more"
            id="chart-options"
            aria-controls={open ? "chart-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            size={isMobile ? "small" : "medium"}
          >
            <MoreVertIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
          <Menu
            id="chart-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: { "aria-labelledby": "chart-options" },
            }}
          >
            {menuOptions.map((option) => (
              <MenuItem key={option} onClick={handleClose} dense={isMobile}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>
      }
    >
      <Box>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={isMobile ? 300 : 350}
        />
      </Box>
    </DashboardCard>
  );
};

export default ServiceCategoryChart;