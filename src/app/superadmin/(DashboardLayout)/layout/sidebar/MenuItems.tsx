import { uniqueId } from "lodash";

interface MenuitemsType {
	[x: string]: any;
	id?: string;
	navlabel?: boolean;
	subheader?: string;
	title?: string;
	subtitle?: string;
	icon?: any;
	href?: string;
	children?: MenuitemsType[];
	bgcolor?: any;
	chip?: string | number;
	chipColor?: string;
	variant?: string;
	external?: boolean;
}

const Menuitems: MenuitemsType[] = [
	{
		navlabel: true,
		subheader: "HOME",
	},

	{
		id: uniqueId(),
		title: "Dashboard",
		icon: "screencast-2-line-duotone",
		href: "/superadmin",
	},
	{
		id: uniqueId(),
		title: "Loans",
		icon: "dollar-line-duotone",
		href: "/superadmin/loans",
	},
	{
		id: uniqueId(),
		title: "Users",
		icon: "user-line-duotone",
		href: "/superadmin/users",
	},
	{
		id: uniqueId(),
		title: "Plans",
		icon: "box-line-duotone",
		href: "/superadmin/plans",
	},

	{
		navlabel: true,
		subheader: "Loans",
	},

	{
		id: uniqueId(),
		title: "Loans",
		icon: "dollar-line-duotone",
		href: "/superadmin/loans",

		children: [
			{
				id: uniqueId(),
				title: "Applications",
				chip: "0",
				chipColor: "primary",
				href: "/superadmin/loans/applications",
			},
			{
				id: uniqueId(),
				title: "Private Loans",
				href: "/superadmin/loans/private",
			},
			{
				id: uniqueId(),
				title: "Government Loans",
				href: "/superadmin/loans/government",
			},
			{
				id: uniqueId(),
				title: "Insurance",
				href: "/superadmin/loans/insurance",
			},
			{
				id: uniqueId(),
				title: "Quick Loans",
				href: "/superadmin/loans/quick",
			},
		],
	},
	{
		navlabel: true,
		subheader: "USERS",
	},

	{
		id: uniqueId(),
		title: "Users",
		icon: "user-line-duotone",
		href: "/superadmin/users",

		children: [
			{
				id: uniqueId(),
				title: "Add User",
				href: "/superadmin/users/add",
			},
		],
	},
	{
		navlabel: true,
		subheader: "Withdraw Requests",
	},
	{
		id: uniqueId(),
		title: "Withdraw Requests",
		icon: "card-line-duotone",
		href: "/superadmin/withdrawreq",
	},
	{
		navlabel: true,
		subheader: "CONTACTS",
	},
	{
		id: uniqueId(),
		title: "Contacts",
		chip: "0",
		chipColor: "primary",
		icon: "book-line-duotone",
		href: "/superadmin/contacts",
	},

	{
		navlabel: true,
		subheader: "PLANS",
	},

	{
		id: uniqueId(),
		title: "Plans",
		icon: "box-line-duotone",
		href: "/superadmin/plans",
		children: [
			{
				id: uniqueId(),
				title: "Add Plan",
				href: "/superadmin/plans/add",
			},
		],
	},

	{
		navlabel: true,
		subheader: "Others",
	},

	{
		id: uniqueId(),
		title: "Quick Loans",
		icon: "stopwatch-line-duotone",
		href: "/superadmin/loans/quick",
	},
	{
		id: uniqueId(),
		title: "Quick Applications",
		icon: "bolt-line-duotone",
		chip: "0",
		chipColor: "primary",
		href: "/superadmin/loans/quick-applications",
	},
	{
		id: uniqueId(),
		title: "Taxation",
		icon: "calculator-line-duotone",
		href: "/superadmin/taxation",
	},
	{
		id: uniqueId(),
		title: "Tax Applications",
		icon: "clipboard-list-line-duotone",
		chip: "0",
		chipColor: "primary",
		href: "/superadmin/tax-applications",
	},
	{
		id: uniqueId(),
		title: "Issue Reports",
		icon: "dialog-2-line-duotone",
		href: "/superadmin/reports",
	},
];

export default Menuitems;
