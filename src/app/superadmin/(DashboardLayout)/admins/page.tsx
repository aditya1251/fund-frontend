"use client";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSession } from "next-auth/react";
import {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
} from "@/lib/superadminApi";

interface Admin {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function ManageAdmins() {
  const { data: session } = useSession();
  console.log("Session:", session);
  console.log("Token:", session?.user?.token);
  const token = session?.user?.token;
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  const {
    data: admins = [],
    isLoading,
    isError,
    refetch,
  } = useGetAdminsQuery(undefined, {
    skip: !token,
    extra: { token },
  });
  const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      await createAdmin({ ...form, role: "admin", type: "adminCreation" }, { extra: { token } }).unwrap();
      setSnackbar({ open: true, message: "Admin created successfully!", severity: "success" });
      setForm({ name: "", email: "", password: "" });
      refetch();
    } catch (error: any) {
      setSnackbar({ open: true, message: error?.data?.message || "Failed to create admin", severity: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deleteAdmin(id, { extra: { token } }).unwrap();
      setSnackbar({ open: true, message: "Admin deleted", severity: "success" });
      refetch();
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to delete admin", severity: "error" });
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={2}>Manage Admins</Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>Register New Admin</Typography>
        <form onSubmit={handleSubmit}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required size="small" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required size="small" type="email" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label="Password" name="password" value={form.password} onChange={handleChange} fullWidth required size="small" type="password" />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button type="submit" variant="contained" color="primary" disabled={isCreating}>Register Admin</Button>
          </Grid>
        </form>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Admin Profiles</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || isDeleting ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Failed to load admins.
                  </TableCell>
                </TableRow>
              ) : (
                admins.map((admin: Admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{new Date(admin.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDelete(admin.id)} disabled={isDeleting}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 