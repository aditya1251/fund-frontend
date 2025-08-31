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
		href: "/rm",
	},
	{
		id: uniqueId(),
		title: "Loans",
		icon: "dollar-line-duotone",
		href: "/rm/loans/applications",
	},
	{
		id: uniqueId(),
		title: "Users",
		icon: "user-line-duotone",
		href: "/rm/users",
	},

	{
		navlabel: true,
		subheader: "Loans",
	},
	{
		id: uniqueId(),
		title: "Loan Applications",
		icon: "dollar-line-duotone",
		chip: "0",
		chipColor: "primary",
		href: "/rm/loans/applications",
	},
	{
		id: uniqueId(),
		title: "Quick Loan",
		icon: "stopwatch-line-duotone",
		chip: "0",
		chipColor: "primary",
		href: "/rm/loans/quick-loan",
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
		href: "/rm/contacts",
	},

	{
		navlabel: true,
		subheader: "Others",
	},
	{
		id: uniqueId(),
		title: "Withdrawal Requests",
		chip: "0",
		chipColor: "primary",
		icon: "money-line-duotone",
		href: "/rm/withdrawreq",
	},
	{
		id: uniqueId(),
		title: "Taxation",
		chip: "0",
		chipColor: "primary",
		icon: "calculator-line-duotone",
		href: "/rm/taxation",
	},
];

export default Menuitems;
