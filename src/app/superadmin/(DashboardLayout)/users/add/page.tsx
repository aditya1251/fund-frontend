"use client";
import { useGetPlansQuery } from '@/redux/services/plansApi';
import { useCreateAdminMutation } from '@/redux/services/superadminApi';
import { Alert, Button, Paper, Box, Grid, Snackbar, TextField, Typography, MenuItem } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const page = () => {
    const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });
    const [form, setForm] = useState({ name: "", email: "", password: "", planId: "" });
    const { data: plans = [], isLoading: plansLoading, error: plansError } = useGetPlansQuery();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name as string]: value });
    };

    const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, planId: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;
        if (!form.planId) {
            setSnackbar({ open: true, message: "Please select a plan", severity: "error" });
            return;
        }
        try {
            await createAdmin({ ...form, role: "DSA", type: "adminCreation" }).unwrap();
            setSnackbar({ open: true, message: "Admin created successfully!", severity: "success" });
            setForm({ name: "", email: "", password: "", planId: "" });
        } catch (error: any) {
            setSnackbar({ open: true, message: error?.data?.error.message || "Failed to create admin", severity: "error" });
        }
    };
    return (
        <Box p={4}>
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" mb={2}>Register New Admin</Typography>
                <form className='space-y-2' onSubmit={handleSubmit}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required size="small" type="email" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField label="Password" name="password" value={form.password} onChange={handleChange} fullWidth required size="small" type="password" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            select
                            label="Select Plan"
                            name="planId"
                            value={form.planId}
                            onChange={handlePlanChange}
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
                                [<MenuItem value="" key="empty">Select a plan</MenuItem>,
                                ...plans.filter((plan: any) => plan.isActive).map((plan: any) => (
                                    <MenuItem value={plan._id} key={plan._id}>{plan.name}</MenuItem>
                                ))]
                            )}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button type="submit"  variant="contained" color="primary" disabled={isCreating}>Register Admin</Button>
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

export default page