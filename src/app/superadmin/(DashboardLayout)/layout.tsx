"use client";
import { styled, Container, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import React from "react";
import Header from "@/app/superadmin/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/superadmin/(DashboardLayout)/layout/sidebar/Sidebar";
import Topbar from "./layout/header/Topbar";
import Footer from "./layout/footer/page";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "25px",
  flexDirection: "column",
  backgroundColor: "transparent",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={baselightTheme}>
      <CssBaseline />
      <MainWrapper className="mainwrapper">
        <PageWrapper className="page-wrapper">
          <Sidebar />
          <Box
            sx={{
              '@media (min-width:1200px)': {
                marginLeft: '270px',
              },
            }}
          >
            <Header />
            <Container
              sx={{
                paddingTop: "20px",
                maxWidth: "1200px",
                minHeight: 'calc(100vh - 229px)'
              }}
            >
              <Box>{children}</Box>
            </Container>
            <Footer />
          </Box>
        </PageWrapper>
      </MainWrapper>
    </ThemeProvider>
  );
}

