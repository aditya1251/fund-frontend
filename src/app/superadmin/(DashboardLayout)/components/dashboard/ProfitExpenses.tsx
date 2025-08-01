"use client";
import React from "react";
import {
  MenuItem,
  Box,
  IconButton,
  Menu,
  Select,
  FormControl,
  InputLabel,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/superadmin/(DashboardLayout)/components/shared/DashboardCard";
import dynamic from "next/dynamic";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGetDsaAnaliticsQuery } from "@/redux/services/analyticsApi";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProfitExpenses = () => {
  const theme = useTheme();
  const primary = "#FFD439"; // Light yellow
  const secondary = "#111111"; // Black

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const [mode, setMode] = React.useState<"daily" | "weekly">("daily");

  const { data = [], isLoading } = useGetDsaAnaliticsQuery(mode);

  const handleModeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMode(event.target.value as "daily" | "weekly");
  };

  const filteredData = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter((item: any) =>
      mode === "weekly"
        ? /W\d{4}Y$/.test(item.date)
        : /^\d{4}-\d{2}-\d{2}$/.test(item.date)
    );
  }, [data, mode]);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: "#555",
      toolbar: { show: false },
      height: 350,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 6,
      },
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: filteredData.map((item) => item.date),
      labels: {
        rotate: -30,
        style: {
          fontSize: "11px",
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
    legend: {
      position: "top",
      fontSize: "13px",
      fontWeight: 500,
    },
  };

  const chartSeries = [
    {
      name: "Total Loans",
      data: filteredData.map((item) => item.totalLoans),
    },
    {
      name: "Active DSAs",
      data: filteredData.map((item) => item.activeDSAs),
    },
  ];

  return (
    <DashboardCard
      title="DSA Activity (Loans vs DSAs)"
      action={
        <>
          <FormControl variant="standard" sx={{ minWidth: 100, mr: 1 }}>
            <InputLabel id="mode-label">Mode</InputLabel>
            <Select
              labelId="mode-label"
              value={mode}
              onChange={handleModeChange}
              label="Mode"
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
          </FormControl>
          <IconButton
            aria-label="more"
            onClick={handleClick}
            aria-controls={open ? "long-menu" : undefined}
            aria-haspopup="true"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{ list: { "aria-labelledby": "long-button" } }}
          >
            <MenuItem onClick={handleClose}>Export</MenuItem>
            <MenuItem onClick={handleClose}>Download</MenuItem>
            <MenuItem onClick={handleClose}>Refresh</MenuItem>
          </Menu>
        </>
      }
    >
      <Box className="rounded-bars">
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: "100%", height: "350px", borderRadius: 2 }}
          />
        ) : (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height="350px"
          />
        )}
      </Box>
    </DashboardCard>
  );
};

export default ProfitExpenses;
