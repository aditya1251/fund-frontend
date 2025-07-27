"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DashboardCard from "@/app/rm/(DashboardLayout)/components/shared/DashboardCard";

// Dynamically import ApexCharts (client-side only)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const menuOptions = ["Export", "Download", "Print"];

const LoanCategoryChart = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Import the hook at the component level
  const { useGetLoansQuery } = require('@/redux/services/loanApi');
  const { data: loansData = [], isLoading } = useGetLoansQuery({});
  
  // State for chart data
  const [chartData, setChartData] = React.useState({
    approved: [0, 0, 0], // [Private, Government, Insurance]
    pending: [0, 0, 0],
    rejected: [0, 0, 0],
  });
  
  // Process loan data for the chart
  React.useEffect(() => {
    if (loansData && loansData.length > 0) {
      // Initialize counters
      const counts = {
        approved: [0, 0, 0], // [Private, Government, Insurance]
        pending: [0, 0, 0],
        rejected: [0, 0, 0],
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

  const theme = useTheme();

  const primary = "#FFD439"; // your website's yellow
  const secondary = "#111111"; // black
  const tertiary = "#EF4444"; // red for rejection

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      foreColor: "#333",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "45%",
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
      categories: ["Private", "Government", "Insurance"],
      axisBorder: { show: false },
      labels: {
        style: { fontWeight: 600 },
      },
    },
    yaxis: {
      labels: {
        style: { fontWeight: 600 },
      },
    },
    legend: {
      show: true,
      position: "top",
      fontWeight: 500,
      markers: {
        size: 12,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
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
      title="Loan Category Comparison"
      action={
        <>
          <IconButton
            aria-label="more"
            id="chart-options"
            aria-controls={open ? "chart-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
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
              <MenuItem key={option} onClick={handleClose}>
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
          height={350}
        />
      </Box>
    </DashboardCard>
  );
};

export default LoanCategoryChart;
