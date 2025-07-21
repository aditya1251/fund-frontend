"use client";
import { useState } from "react";
import {
  Box,
  Typography,
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
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import {
  useGetAdminsQuery,
  useDeleteAdminMutation,
} from "@/redux/services/superadminApi";

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  planName: string;
  createdAt: string;
  isDeleted?: boolean;
}

export default function ManageAdmins() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });
  const router = useRouter();

  const {
    data: admins = [],
    isLoading,
    isError,
    refetch,
  } = useGetAdminsQuery(undefined,);
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deleteAdmin(id).unwrap();
      setSnackbar({ open: true, message: "Admin deleted", severity: "success" });
      refetch();
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to delete admin", severity: "error" });
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/superadmin/users/edit?id=${id}`);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={2}>Manage Admins</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Admin Profiles</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || isDeleting ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Failed to load admins.
                  </TableCell>
                </TableRow>
              ) : (
                admins.map((admin: Admin) => (
                  <TableRow key={admin._id}>
                    <TableCell>{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.planName}</TableCell>
                    <TableCell>{admin.role}</TableCell>
                    <TableCell>{new Date(admin.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      {admin.isDeleted ? <Chip label="Deleted" color="error" size="small" /> : <Chip label="Active" color="success" size="small" />}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <span>
                          <IconButton color="primary" onClick={() => handleEdit(admin._id)} disabled={isDeleting || admin.role === "SUPERADMIN" || admin.isDeleted}>
                            <EditIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <span>
                          <IconButton color="error" onClick={() => handleDelete(admin._id)} disabled={isDeleting || admin.role === "SUPERADMIN" || admin.isDeleted}>
                            <DeleteIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Snackbar open={snackbar.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 