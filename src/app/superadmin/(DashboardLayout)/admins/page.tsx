"use client";
import { useState, useEffect } from "react";
import axios from "axios";
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

interface Admin {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function ManageAdmins() {
  const { data: session } = useSession();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin", {
        headers: session?.user?.token ? { Authorization: `Bearer ${session.user.token}` } : {},
      });
      setAdmins(res.data);
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to load admins", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/admin/register",
        {
          ...form,
          role: "admin",
          type: "adminCreation",
        },
        {
          headers: session?.user?.token ? { Authorization: `Bearer ${session.user.token}` } : {},
        }
      );
      setSnackbar({ open: true, message: "Admin created successfully!", severity: "success" });
      setForm({ name: "", email: "", password: "" });
      fetchAdmins();
    } catch (error: any) {
      setSnackbar({ open: true, message: error?.response?.data?.message || "Failed to create admin", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/admin/${id}`, {
        headers: session?.user?.token ? { Authorization: `Bearer ${session.user.token}` } : {},
      });
      setSnackbar({ open: true, message: "Admin deleted", severity: "success" });
      fetchAdmins();
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to delete admin", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={2}>Manage Admins</Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>Register New Admin</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required size="small" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required size="small" type="email" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField label="Password" name="password" value={form.password} onChange={handleChange} fullWidth required size="small" type="password" />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>Register Admin</Button>
            </Grid>
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
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{new Date(admin.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDelete(admin.id)} disabled={loading}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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