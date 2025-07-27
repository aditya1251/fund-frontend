import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { Sidebar as MUI_Sidebar, Menu, MenuItem } from "react-mui-sidebar";
import Menuitems from "./MenuItems";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Submenu } from "./Submenu";
import { useGetLoansQuery } from "@/redux/services/loanApi";
import { useGetApplicationsQuery } from "@/redux/services/applicationApi";

// Custom hook to manage the pending counts
const usePendingCounts = () => {
	const {
		data: loansData = [],
		isLoading: isLoansLoading,
		error: loansError,
	} = useGetLoansQuery({});
	const {
		data: quickLoansData = [],
		isLoading: isQuickLoansLoading,
		error: quickLoansError,
	}	= useGetLoansQuery({loanType: "quick"});
	const {
		data: taxationData = [],
		isLoading: isTaxationLoading,
		error: taxationError,
	}	= useGetLoansQuery({loanType: "taxation"});

	const {
		data: applicationsData = [],
		isLoading: isAppsLoading,
		error: appsError,
	} = useGetApplicationsQuery(undefined);

	// Used useMemo to avoid recalculating on every render
	const pendingLoanCount = useMemo(() => {
		if (isLoansLoading || loansError) return null;
		return loansData.filter((loan: any) => loan.status === "pending").length;
	}, [loansData, isLoansLoading, loansError]);

	const pendingAppCount = useMemo(() => {
		if (isAppsLoading || appsError) return null;
		return applicationsData.filter((app: any) => app.status === "pending")
			.length;
	}, [applicationsData, isAppsLoading, appsError]);

	const pendingQuickLoanCount = useMemo(() => {
		if (isQuickLoansLoading || quickLoansError) return null;
		return quickLoansData.filter((loan: any) => loan.status === "pending").length;
	}, [quickLoansData, isQuickLoansLoading, quickLoansError]);

	const pendingTaxationCount = useMemo(() => {
		if (isTaxationLoading || taxationError) return null;
		return taxationData.filter((loan: any) => loan.status === "pending").length;
	}, [taxationData, isTaxationLoading, taxationError]);

	return {
		pendingLoanCount,
		pendingAppCount,
		pendingQuickLoanCount,
		pendingTaxationCount,
		isLoading: isLoansLoading || isAppsLoading,
		hasError: loansError || appsError,
	};
};

const renderMenuItems = (items: any[], pathDirect: string) => {
	const { pendingLoanCount, pendingAppCount, pendingQuickLoanCount, pendingTaxationCount, hasError } = usePendingCounts();

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
					item.chip || item.title === "Applications" || item.title === "Contacts" || item.title === "Quick Applications"
						? true
						: false
				}
				badgeContent={
					item.title === "Applications"
						? pendingLoanCount
						: item.title === "Contacts"
						? pendingAppCount
						: item.title === "Quick Applications"
						? pendingQuickLoanCount
						: item.title === "Tax Applications"
						? pendingTaxationCount
						: item.chip || ""
				}
				badgeColor={
					hasError &&
					(item.title === "Applications" || item.title === "Contacts")
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
