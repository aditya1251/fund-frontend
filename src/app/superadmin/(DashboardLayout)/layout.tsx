"use client";
import { styled, Container, Box, useTheme } from "@mui/material";
import React, { useState } from "react";
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
  const theme = useTheme();
  return (
    <MainWrapper className="mainwrapper">
      <PageWrapper className="page-wrapper">
        <Sidebar />
        <Box
          sx={{
            [theme.breakpoints.up("lg")]: {
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
  );
}

