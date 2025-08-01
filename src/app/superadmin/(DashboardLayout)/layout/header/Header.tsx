"use client";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  styled,
  Stack,
  InputBase,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useEffect, useState, useContext } from "react";
import { DashboardContext } from "@/app/superadmin/context/DashboardContext";
import { useSession } from "next-auth/react";
import NotificationPanel from "@/components/crm/notificationPanel";
import SearchCommand from "./SearchCommand";

const Header = () => {
  const [_height, setHeight] = useState("0px");
  const { data: session } = useSession();
  const userId = session?.user?.id || "";
  const { isMobileSidebar, setIsMobileSidebar } = useContext(DashboardContext);

  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setHeight("0px");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
    zIndex: "unset",
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }));

  return (
    <>
      <AppBarStyled position="sticky" color="default">
        <ToolbarStyled>
          {/* Left: Sidebar toggle & logo */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={() => setIsMobileSidebar(!isMobileSidebar)}
              sx={{ display: { lg: "none", xs: "inline" } }}
            >
              <Icon icon="solar:list-bold" height={24} />
            </IconButton>
            <Typography variant="h6" fontWeight="bold">
              Superadmin Panel
            </Typography>
          </Stack>

          {/* Center: Search launcher */}
          <Box
            sx={{
              maxWidth: 400,
              flexGrow: 1,
              mx: 4,
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              cursor: "pointer",
              px: 2,
              py: 1,
              borderRadius: 2,
              backgroundColor: "rgba(0,0,0,0.05)",
              transition: "background 0.3s",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.1)",
              },
            }}
            onClick={() => setSearchOpen(true)}
          >
            <Icon icon="material-symbols:search" height={20} />
            <InputBase
              placeholder="Search (Ctrl + K)"
              sx={{ ml: 1, flex: 1, pointerEvents: "none" }}
              disabled
            />
            <Box
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 1,
                backgroundColor: "rgba(0,0,0,0.07)",
                fontSize: "0.75rem",
                ml: 1,
              }}
            >
              Ctrl + K
            </Box>
          </Box>

          {/* Right: Notification and user */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <NotificationPanel userId={userId} pane="left" />
          </Stack>
        </ToolbarStyled>
      </AppBarStyled>

      {/* Search command modal */}
      <SearchCommand open={searchOpen} setOpen={setSearchOpen} />
    </>
  );
};

export default Header;
