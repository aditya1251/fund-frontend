import { useMediaQuery, Box, Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";
import React, { useContext } from "react";
import { DashboardContext } from "@/app/superadmin/context/DashboardContext";
import Scrollbar from "@/app/superadmin/(DashboardLayout)/components/custom-scroll/Scrollbar";


export const SidebarContext = React.createContext({
  width: "270px",
  collapsewidth: "80px",
  textColor: "#000000",
  isCollapse: false,
  themeColor: "#FFDD5F",
});

const Sidebar = (
) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const { isMobileSidebar, setIsMobileSidebar } = useContext(DashboardContext);

  const sidebarWidth = "270px";

  if (lgUp) {
    return (
      <Box

        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}>
        <Drawer
          anchor="left"
          open
          variant="permanent"
          slotProps={{
            paper: {
              sx: {
                width: sidebarWidth,
                boxShadow: '0 9px 17.5px rgb(0, 0, 0, 0.05)!important',
              },
            }
          }}
        >
 

          <Scrollbar sx={{ height: "calc(100%)" }}>
            <SidebarItems />
          </Scrollbar>


        </Drawer>
      </Box >
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebar}
      onClose={() => setIsMobileSidebar(!isMobileSidebar)}
      variant="temporary"
      slotProps={{
        paper: {
          sx: {
            width: sidebarWidth,
            boxShadow: '0 9px 17.5px rgb(0, 0, 0, 0.05)!important',
  overflowX: 'hidden'
          },
        }
      }}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <Scrollbar sx={{ height: "calc(100% - 73px)", overflowX: 'hidden' }}>
        <SidebarItems />
      </Scrollbar>
    </Drawer>
  );
};

export default Sidebar;

