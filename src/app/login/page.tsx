"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FormControlLabel,
  Button,
  TextField,
  Checkbox,
  FormLabel,
  Typography,
  Box,
  InputAdornment,
  IconButton
} from "@mui/material";
import DashboardCard from "@/app/superadmin/(DashboardLayout)/components/shared/DashboardCard";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.replace("/");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F0F5F9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DashboardCard>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" fontWeight={700} color="#0085db" mb={0.5} letterSpacing={1}>
            Fund Raizer
          </Typography>
          <Typography variant="subtitle2" color="#707a82" mb={2}>
            Sign in to your account
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="email-address" sx={{ color: "#111c2d", fontWeight: 500 }}>
            Email
          </FormLabel>
          <TextField
            id="email-address"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ mt: "8px", mb: "16px" }}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <FormLabel htmlFor="ordinary-outlined-password-input" sx={{ color: "#111c2d", fontWeight: 500 }}>
            Password
          </FormLabel>
          <TextField
            id="ordinary-outlined-password-input"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ mt: "8px", mb: "16px" }}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
                name="checkedB"
                color="primary"
              />
            }
            label={<span style={{ color: "#707a82" }}>Remember me</span>}
            sx={{ mb: 2 }}
          />
          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          <Button
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              borderRadius: "25px",
              boxShadow: "0 4px 20px 0 rgba(0,133,219,0.08)",
              backgroundColor: "#0085db",
              '&:hover': { backgroundColor: '#0070b3' },
            }}
          >
            Sign In
          </Button>
        </form>
      </DashboardCard>
    </Box>
  );
} 