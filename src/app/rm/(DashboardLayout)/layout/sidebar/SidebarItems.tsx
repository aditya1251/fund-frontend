import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { Sidebar as MUI_Sidebar, Menu, MenuItem } from "react-mui-sidebar";
import Menuitems from "./MenuItems";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Submenu } from "./Submenu";
import { useGetApplicationsQuery } from "@/redux/services/applicationApi";
import { useGetLoansByRmIdQuery } from "@/redux/services/loanApi";
import { useSession } from "next-auth/react";

const usePendingCounts = () => {
	const { data: session } = useSession();
	const {
		data: loansData,
		isLoading: isLoanCountLoading,
		error: loanCountError,
	} = useGetLoansByRmIdQuery(session?.user?.id || "");

	const {
		data: applicationsData = [],
		isLoading: isAppsLoading,
		error: appsError,
	} = useGetApplicationsQuery(undefined);

	const pendingAppCount = useMemo(() => {
		if (isAppsLoading || appsError) return null;
		return applicationsData.filter((app: any) => app.status === "pending")
			.length;
	}, [applicationsData, isAppsLoading, appsError]);

	const pendingData = useMemo(() => {
		if (isLoanCountLoading || loanCountError) return null;
		return loansData?.reduce(
			(acc: any, loan: any) => {
				if (loan.status === "pending") {
					if (["private", "government", "insurance"].includes(loan.loanType)) {
						acc.applications += 1;
					}
					if (loan.loanType === "quick") {
						acc.quickApplications += 1;
					}
					if (loan.loanType === "tax") {
						acc.taxApplications += 1;
					}
				}
				return acc;
			},
			{ applications: 0, quickApplications: 0, taxApplications: 0 }
		);
	}, [loansData, isLoanCountLoading, loanCountError]);

	return {
		pendingLoanCount: pendingData?.applications ?? 0,
		pendingQuickLoanCount: pendingData?.quickApplications ?? 0,
		pendingTaxationCount: pendingData?.taxApplications ?? 0,
		pendingAppCount,
		isLoading: isLoanCountLoading || isAppsLoading,
		hasError: loanCountError || appsError,
	};
};

const renderMenuItems = (items: any[], pathDirect: string) => {
	const {
		pendingLoanCount,
		pendingAppCount,
		pendingQuickLoanCount,
		pendingTaxationCount,
		hasError,
	} = usePendingCounts();

	return items.map((item) => {
		if (item.subheader) {
			// Display Subheader
			return (
				<Box sx={{ margin: "0 -24px" }} key={item.subheader}>
					<Menu subHeading={item.subheader} key={item.subheader}>
						<></>
					</Menu>
				</Box>
			);
		}

		//If the item has children (submenu)
		if (item.children) {
			return (
				<Submenu
					key={item.id}
					title={item.title}
					icon={
						item.icon ? (
							<Icon icon={"solar:" + item.icon} width="24" height="24" />
						) : (
							<Icon icon="mdi:circle" width="6" height="6" />
						)
					}
					defaultOpen={item.href ? pathDirect.startsWith(item.href) : false}
					href={item.href}
				>
					{renderMenuItems(item.children, pathDirect)}
				</Submenu>
			);
		}

		// If the item has no children, render a MenuItem
		return (
			<MenuItem
				key={item.id}
				isSelected={pathDirect === item?.href}
				icon={
					item.icon ? (
						<Icon
							icon={"solar:" + item.icon}
							color="#000"
							width="24"
							height="24"
						/>
					) : (
						<Icon icon="mdi:circle" width="6" color="#000" height="6" />
					)
				}
				component="div"
				link={item.href && item.href !== "" ? item.href : undefined}
				badge={
					item.chip ||
					item.title in
						["Loan Applications", "Contacts", "Quick Loan", "Taxation"]
						? true
						: false
				}
				badgeContent={
					item.title === "Loan Applications"
						? pendingLoanCount
						: item.title === "Contacts"
						? pendingAppCount
						: item.title === "Quick Loan"
						? pendingQuickLoanCount
						: item.title === "Taxation"
						? pendingTaxationCount
						: item.chip || "0"
				}
				badgeColor={
					hasError &&
					item.title in
						["Loan Applications", "Contacts", "Quick Loan", "Taxation"]
						? "error"
						: item.chipColor || "secondary"
				}
				badgeTextColor="#000"
				disabled={item.disabled}
				badgeType={item.variant || "filled"}
			>
				<Link
					href={item.href}
					target={
						item.href && item.href.startsWith("https") ? "_blank" : "_self"
					}
				>
					<Typography
						fontFamily={"Plus Jakarta Sans"}
						color={pathDirect === item?.href ? "#000" : "inherit"}
					>
						{item.title}
						{item.subtitle && (
							<Typography variant="caption" display="block">
								{item.subtitle}
							</Typography>
						)}
					</Typography>
				</Link>
			</MenuItem>
		);
	});
};

const SidebarItems = () => {
	const pathname = usePathname();
	const pathDirect = pathname;

	return (
		<Box sx={{ px: "20px", overflowX: "hidden" }}>
			<MUI_Sidebar
				width={"100%"}
				showProfile={false}
				themeColor={"#FFDF6B"}
				themeSecondaryColor={"#FFD4391a"}
			>
				<Box sx={{ margin: "0 -24px" }}>
					<Typography variant="h6" sx={{ padding: "16px 24px 8px 24px" }}>
						Fund Raizer
					</Typography>
				</Box>
				{renderMenuItems(Menuitems, pathDirect)}
			</MUI_Sidebar>
		</Box>
	);
};

export default SidebarItems;
