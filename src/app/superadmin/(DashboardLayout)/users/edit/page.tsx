"use client";
import { useEffect, useState } from "react";
import { useGetPlansQuery } from '@/redux/services/plansApi';
import { useUpdateAdminMutation, useGetAdminByIdQuery } from '@/redux/services/superadminApi';
import { Alert, Button, Paper, Box, Grid, Snackbar, TextField, Typography, MenuItem } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';

const EditUserPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get('id');
  const { data: plans = [], isLoading: plansLoading, error: plansError } = useGetPlansQuery();
  const { data: user, isLoading: userLoading, error: userError } = useGetAdminByIdQuery(userId!, { skip: !userId });
  const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });
  const [form, setForm] = useState({ name: "", email: "", role: "", planId: "" });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
        planId: user.planId,
      });
    }
  }, [userLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    if (!form.planId) {
      setSnackbar({ open: true, message: "Please select a plan", severity: "error" });
      return;
    }
    try {
      const update: any = { id: userId, type: "adminUpdation" };
      if (form.name !== user.name) update.name = form.name;
      if (form.email !== user.email) update.email = form.email;
      if (form.role !== user.role) update.role = form.role;
      if (form.planId !== user.planId) update.planId = form.planId;
      await updateAdmin({id:userId,body:update}).unwrap();
      setSnackbar({ open: true, message: "Admin updated successfully!", severity: "success" });
      setTimeout(() => router.push('/superadmin/users'), 1200);
    } catch (error: any) {
      setSnackbar({ open: true, message: error?.data?.error?.message || "Failed to update admin", severity: "error" });
    }
  };

  if (userLoading) return <Box p={4}><Typography>Loading user...</Typography></Box>;
  if (userError) return <Box p={4}><Alert severity="error">Failed to load user.</Alert></Box>;

  return (
    <Box p={4}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>Edit Admin</Typography>
        <form className='space-y-2' onSubmit={handleSubmit}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required size="small" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required size="small" type="email" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth
              required
              size="small"
            >
              <MenuItem value="SUPERADMIN">SUPERADMIN</MenuItem>
              <MenuItem value="DSA">DSA</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              label={`Select Plan ${user && user.planName ? ` (Current: ${user.planName})` : ''}`}
              name="planId"
              value={form.planId}
              onChange={handleChange}
              fullWidth
              required
              size="small"
              disabled={plansLoading}
              error={!!plansError}
              helperText={plansError ? "Failed to load plans" : ""}
            >
              {plansLoading ? (
                <MenuItem value="">Loading...</MenuItem>
              ) : (
                plans
                  .filter((plan: any) => plan.isActive)
                  .map((plan: any) => (
                    <MenuItem value={plan._id} key={plan._id}>
                      {plan.name}
                      {plan._id === user.planId ? " (Current Plan)" : ""}
                    </MenuItem>
                  ))
              )}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary" disabled={isUpdating}>Update Admin</Button>
            </Box>
          </Grid>
        </form>
      </Paper>
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
  )
}

export default EditUserPage; 