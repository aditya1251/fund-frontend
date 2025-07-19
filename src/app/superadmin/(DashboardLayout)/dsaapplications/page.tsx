"use client";
import React, { useState } from "react";
import { useGetLoansQuery, useUpdateLoanMutation } from "@/redux/adminApi";
import { Button, Paper, Snackbar, Alert, Typography, Box } from "@mui/material";

interface LoanApplication {
  _id: string;
  values: Record<string, any>;
  status: "pending" | "approved" | "rejected";
  createdAt?: string;
  [key: string]: any;
}

const DsaApplicationsPage = () => {
  const { data: loansData = [], isLoading, error, refetch } = useGetLoansQuery({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateLoan] = useUpdateLoanMutation();
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [showRejectionInput, setShowRejectionInput] = useState<string | null>(null);

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
        <Box display="flex" flexDirection="column" gap={2}>
          {loansData.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: "center" }}>No loan applications found.</Paper>
          ) : (
            loansData.map((loan: LoanApplication) => (
              <Paper key={loan._id} sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Applicant: {loan.values?.Name || "-"}
                </Typography>
                <Typography variant="body2">Email: {loan.values?.Email || "-"}</Typography>
                <Typography variant="body2">Phone: {loan.values?.Phone || "-"}</Typography>
                <Typography variant="body2">Status: <b>{loan.status}</b></Typography>
                <Typography variant="body2">Submitted: {loan.createdAt ? new Date(loan.createdAt).toLocaleString() : "-"}</Typography>
                <Box mt={1} display="flex" gap={2}>
                  <Button
                    variant="contained"
                    color="success"
                    disabled={loan.status === "approved" || updatingId === loan._id}
                    onClick={() => handleUpdateStatus(loan._id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    disabled={loan.status === "rejected" || updatingId === loan._id}
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
                    >
                      Confirm Reject
                    </Button>
                  </Box>
                )}
              </Paper>
            ))
          )}
        </Box>
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