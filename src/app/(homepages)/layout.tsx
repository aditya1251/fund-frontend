import React from "react";
import NavigationHeader from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavigationHeader />
            {children}
            <Footer />
        </>
    );
}
