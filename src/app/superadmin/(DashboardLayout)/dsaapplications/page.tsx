"use client";
import React, { useState, useMemo } from "react";
import { useGetLoansQuery, useUpdateLoanMutation } from "@/redux/services/loanApi";
import { Button, Paper, Snackbar, Alert, Typography, Box } from "@mui/material";
import { loanApplicationSchema, LoanApplication } from '@/lib/validation/loanSchema';

const DsaApplicationsPage = () => {
  const { data: loansData = [], isLoading, error, refetch } = useGetLoansQuery({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateLoan] = useUpdateLoanMutation();
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [showRejectionInput, setShowRejectionInput] = useState<string | null>(null);

  // Filter/Sort/Search state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  // Filtered and sorted loans
  const filteredLoans = useMemo(() => {
    let loans: LoanApplication[] = loansData;
    // Search by applicant name or email
    if (search) {
      loans = loans.filter((loan: LoanApplication) => {
        const name = typeof loan.values?.Name === 'string' ? loan.values.Name : '';
        const email = typeof loan.values?.Email === 'string' ? loan.values.Email : '';
        return (
          name.toLowerCase().includes(search.toLowerCase()) ||
          email.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    // Status filter
    if (statusFilter) {
      loans = loans.filter((loan: LoanApplication) =>
        typeof loan.status === 'string' && loan.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    // Sort
    loans = loans.slice().sort((a: LoanApplication, b: LoanApplication) => {
      if (sortBy === "date-desc") {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        if (dateA === dateB) {
          return (b._id || "").localeCompare(a._id || "");
        }
        return dateB - dateA;
      }
      if (sortBy === "date-asc") {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        if (dateA === dateB) {
          return (a._id || "").localeCompare(b._id || "");
        }
        return dateA - dateB;
      }
      if (sortBy === "name-asc") {
        const nameA = typeof a.values?.Name === 'string' ? a.values.Name.toLowerCase() : '';
        const nameB = typeof b.values?.Name === 'string' ? b.values.Name.toLowerCase() : '';
        return nameA.localeCompare(nameB);
      }
      if (sortBy === "name-desc") {
        const nameA = typeof a.values?.Name === 'string' ? a.values.Name.toLowerCase() : '';
        const nameB = typeof b.values?.Name === 'string' ? b.values.Name.toLowerCase() : '';
        return nameB.localeCompare(nameA);
      }
      return 0;
    });
    return loans;
  }, [loansData, search, statusFilter, sortBy]);

  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    setUpdatingId(id);
    try {
      if (newStatus === "rejected" && showRejectionInput !== id) {
        setShowRejectionInput(id);
        setUpdatingId(null);
        return;
      }
      await updateLoan({ _id: id, status: newStatus, rejectionMessage: newStatus === "rejected" ? rejectionReason : undefined }).unwrap();
      setSnackbar({ open: true, message: `Loan ${newStatus}`, severity: "success" });
      setShowRejectionInput(null);
      setRejectionReason("");
      refetch();
    } catch (err: any) {
      setSnackbar({ open: true, message: err?.data?.message || "Failed to update status", severity: "error" });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>Loan Applications (CRM Panel)</Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Alert severity="error">Failed to load loan applications.</Alert>
      ) : (
        <>
          {/* Filter/Sort/Search Controls */}
          <Box mb={3} display="flex" flexWrap="wrap" gap={2} alignItems="center">
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border bg-white px-2 py-1 rounded"
              style={{ minWidth: 200 }}
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border bg-white px-2 py-1 rounded"
              style={{ minWidth: 150 }}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border bg-white px-2 py-1 rounded"
              style={{ minWidth: 180 }}
            >
              <option value="date-desc">Sort by Latest</option>
              <option value="date-asc">Sort by Oldest</option>
              <option value="name-asc">Sort by Name (A-Z)</option>
              <option value="name-desc">Sort by Name (Z-A)</option>
            </select>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            {filteredLoans.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: "center" }}>No loan applications found.</Paper>
            ) : (
              filteredLoans.map((loan: LoanApplication) => (
                <Paper key={loan._id} sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" gap={2}>
                    {/* Left Side: Applicant Info */}
                    <Box flex={1} minWidth={200}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Applicant: {typeof loan.values?.Name === 'string' ? loan.values.Name : "-"}
                      </Typography>
                      <Typography variant="body2">Email: {typeof loan.values?.Email === 'string' ? loan.values.Email : "-"}</Typography>
                      <Typography variant="body2">Age: {typeof loan.values?.Age === 'string' ? loan.values.Age : "-"}</Typography>
                      <Typography variant="body2">Phone: {typeof loan.values?.Phone === 'string' ? loan.values.Phone : "-"}</Typography>
                    </Box>
                    {/* Right Side: Admin/Status Info */}
                    <Box flex={1} minWidth={200}>
                      <Typography variant="body2">Subscriber: {loan.subscriber || "-"}</Typography>
                      <Typography variant="body2">Submitted: {loan.createdAt ? new Date(loan.createdAt).toLocaleString() : "-"}</Typography>
                      <Typography variant="body2">Status: <b>{loan.status}</b></Typography>
                    </Box>
                  </Box>
                  {/* Action Buttons */}
                  <Box mt={2} display="flex" gap={2}>
                    <Button
                      variant="contained"
                      color="success"
                      disabled={loan.status !== "pending" || updatingId === loan._id}
                      onClick={() => handleUpdateStatus(loan._id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      disabled={loan.status !== "pending" || updatingId === loan._id}
                      onClick={() => handleUpdateStatus(loan._id, "rejected")}
                    >
                      Reject
                    </Button>
                  </Box>
                  {showRejectionInput === loan._id && (
                    <Box mt={2} display="flex" gap={1} alignItems="center">
                      <input
                        type="text"
                        placeholder="Rejection reason"
                        value={rejectionReason}
                        onChange={e => setRejectionReason(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleUpdateStatus(loan._id, "rejected")}
                        disabled={updatingId === loan._id || !rejectionReason.trim()}
                        style={{ whiteSpace: "nowrap", minWidth: 140 }}
                      >
                        Confirm Reject
                      </Button>
                    </Box>
                  )}
                </Paper>
              ))
            )}
          </Box>
        </>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DsaApplicationsPage;