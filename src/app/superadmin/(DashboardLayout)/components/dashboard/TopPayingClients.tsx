"use client";

import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Divider,
} from "@mui/material";
import DashboardCard from "@/app/superadmin/(DashboardLayout)/components/shared/DashboardCard";
import { useState } from "react";
import { useGetTopUsersQuery } from "@/redux/services/analyticsApi";
import GroupIcon from "@mui/icons-material/Groups";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const LIGHT_YELLOW = "#FFF9C4";
const BLACK = "#212121";

const TopUsersTable = () => {
  const [mode, setMode] = useState<"dsa" | "rm">("dsa");
  const { data, isLoading } = useGetTopUsersQuery(mode);

  const users = mode === "dsa" ? data?.topDSAs || [] : data?.topRMs || [];

  const handleChange = (_: any, newMode: "dsa" | "rm" | null) => {
    if (newMode) setMode(newMode);
  };

  return (
    <DashboardCard
      title={
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h5" fontWeight={600}>
            Top Working {mode === "dsa" ? "DSAs" : "RMs"}
          </Typography>

          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleChange}
            size="small"
            sx={{
              backgroundColor: "#f7f7f7",
              borderRadius: "8px",
              "& .MuiToggleButton-root": {
                border: "none",
                px: 2,
                py: 0.5,
                fontWeight: 600,
                color: "#333",
                "&.Mui-selected": {
                  backgroundColor: LIGHT_YELLOW,
                  color: BLACK,
                },
              },
            }}>
            <ToggleButton value="dsa">
              <GroupIcon fontSize="small" sx={{ mr: 0.5 }} />
              DSA
            </ToggleButton>
            <ToggleButton value="rm">
              <ManageAccountsIcon fontSize="small" sx={{ mr: 0.5 }} />
              RM
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      }>
      <Box sx={{ overflowX: "auto" }}>
        <Box
          mt={2}
          sx={{
            width: "100%",
            display: "table",
            tableLayout: "fixed",
            minHeight: 320,
          }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {[
                  "Rank",
                  "Name",
                  "Email",
                  "Loan Count",
                  mode === "dsa" ? "Plan" : "DSAs Assigned",
                ].map((header) => (
                  <TableCell key={header}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {header}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <TableRow key={idx}>
                      {Array.from({ length: 5 }).map((__, i) => (
                        <TableCell key={i}>
                          <Skeleton variant="text" height={24} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : users.map((user: any, index: number) => (
                    <TableRow key={user._id || index}>
                      <TableCell>{user.rank ?? index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.loanCount ?? 0}</TableCell>
                      <TableCell>
                        {mode === "dsa" ? (
                          <Chip
                            label={user.planName || "N/A"}
                            size="small"
                            sx={{
                              backgroundColor: LIGHT_YELLOW,
                              color: BLACK,
                              fontWeight: 600,
                              borderRadius: "6px",
                            }}
                          />
                        ) : (
                          <Typography fontWeight={500}>
                            {user.dsaAssignedCount || 0}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default TopUsersTable;
