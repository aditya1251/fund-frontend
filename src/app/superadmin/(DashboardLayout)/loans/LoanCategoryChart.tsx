"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Box, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DashboardCard from "@/app/superadmin/(DashboardLayout)/components/shared/DashboardCard";

// Dynamically import ApexCharts (client-side only)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const menuOptions = ["Export", "Download", "Print"];

const LoanCategoryChart = () => {
  const theme = useTheme();

  /* ---------- RESPONSIVE HOOKS ---------- */
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  /* -------------------------------------- */

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  /* ---------- DATA LOGIC (unchanged) ---------- */
  const { useGetLoansQuery } = require("@/redux/services/loanApi");
  const { data: loansData = [], isLoading } = useGetLoansQuery({});
  const [chartData, setChartData] = React.useState({
    approved: [0, 0, 0],
    pending: [0, 0, 0],
    rejected: [0, 0, 0],
  });

  React.useEffect(() => {
    if (!loansData?.length) return;
    const counts = {
      approved: [0, 0, 0],
      pending: [0, 0, 0],
      rejected: [0, 0, 0],
    };
    loansData.forEach((loan: any) => {
      let idx = 0;
      if (loan.loanType?.toLowerCase() === "government") idx = 1;
      else if (loan.loanType?.toLowerCase() === "insurance") idx = 2;
      if (loan.status.toLowerCase() === "approved") counts.approved[idx]++;
      else if (loan.status.toLowerCase() === "pending") counts.pending[idx]++;
      else if (loan.status.toLowerCase() === "rejected") counts.rejected[idx]++;
    });
    setChartData(counts);
  }, [loansData]);

  /* ---------- THEME COLORS ---------- */
  const primary = "#FFD439";
  const secondary = "#111111";
  const tertiary = "#EF4444";

  /* ---------- RESPONSIVE CHART HEIGHT ---------- */
  const chartHeight = isXs ? 220 : isSm ? 280 : isMd ? 320 : 350;

  /* ---------- RESPONSIVE OPTIONS ---------- */
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      foreColor: "#333",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
    plotOptions: {
      bar: {
        borderRadius: isXs ? 4 : 8,
        columnWidth: "45%",
        distributed: false,
      },
    },
    colors: [primary, secondary, tertiary],
    dataLabels: { enabled: false },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: ["Private", "Government", "Insurance"],
      axisBorder: { show: false },
      labels: {
        style: {
          fontWeight: 600,
          fontSize: isXs ? "10px" : "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontWeight: 600,
          fontSize: isXs ? "10px" : "12px",
        },
      },
    },
    legend: {
      show: true,
      position: "top",
      fontWeight: 500,
      fontSize: isXs ? "10px" : "12px",
      markers: { size: isXs ? 8 : 12 },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };

  const chartSeries = [
    { name: "Approved", data: chartData.approved },
    { name: "Pending", data: chartData.pending },
    { name: "Rejected", data: chartData.rejected },
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
      <Box sx={{ width: "100%", height: chartHeight }}>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={chartHeight}
        />
      </Box>
    </DashboardCard>
  );
};

export default LoanCategoryChart;
