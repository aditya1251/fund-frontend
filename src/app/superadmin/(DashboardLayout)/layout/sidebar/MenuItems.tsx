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
				chip: "3",
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
		subheader: "CONTACTS",
	},
	{
		id: uniqueId(),
		title: "Contacts",
		chip: "5",
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
		subheader: "UTILITIES",
	},

	{
		id: uniqueId(),
		title: "Icons",
		icon: "smile-circle-linear",
		href: "/superadmin/icons",
	},

	{
		id: uniqueId(),
		title: "Table",
		icon: "tablet-line-duotone",
		href: "/superadmin/table",
	},
	{
		id: uniqueId(),
		title: "Typography",
		icon: "text-bold-square-line-duotone",
		href: "/superadmin/utilities/typography",
	},
	{
		id: uniqueId(),
		title: "Shadow",
		icon: "box-minimalistic-broken",
		href: "/superadmin/utilities/shadow",
	},
	{
		navlabel: true,
		subheader: "OTHER",
	},
	{
		id: uniqueId(),
		title: "Menu Level",
		icon: "double-alt-arrow-down-bold-duotone",
		href: "https://spike-nextjs-pro-main.vercel.app/l1",

		children: [
			{
				id: uniqueId(),
				title: "Level 1",
				href: "https://spike-nextjs-pro-main.vercel.app/l1",
			},
			{
				id: uniqueId(),
				title: "Level 1.1",
				href: "https://spike-nextjs-pro-main.vercel.app/l1.1",

				children: [
					{
						id: uniqueId(),
						title: "Level 2",
						href: "https://spike-nextjs-pro-main.vercel.app/l2",
					},
					{
						id: uniqueId(),
						title: "Level 2.1",
						href: "https://spike-nextjs-pro-main.vercel.app/l2.1",

						children: [
							{
								id: uniqueId(),
								title: "Level 3",
								href: "https://spike-nextjs-pro-main.vercel.app/l3",
							},
							{
								id: uniqueId(),
								title: "Level 3.1",
								href: "https://spike-nextjs-pro-main.vercel.app/l3.1",
							},
						],
					},
				],
			},
		],
	},
	{
		id: uniqueId(),
		title: "Disabled",
		icon: "forbidden-circle-line-duotone",
		href: "",
		disabled: true,
	},
	{
		id: uniqueId(),
		title: "SubCaption",
		subtitle: "This is the subtitle",
		icon: "square-academic-cap-line-duotone",

		href: "https://spike-nextjs-pro-main.vercel.app/",
	},
	{
		id: uniqueId(),
		title: "Chip",
		icon: "archive-check-line-duotone",
		chip: "",
		href: "https://spike-nextjs-pro-main.vercel.app/",
		chipColor: "",
	},
	{
		id: uniqueId(),
		title: "Outlined",
		icon: "smile-circle-line-duotone",
		variant: "outlined",
		href: "https://spike-nextjs-pro-main.vercel.app/",
		chip: "outline",
	},
	{
		id: uniqueId(),
		title: "External Link",
		external: true,
		icon: "link-bold-duotone",
		href: "https://google.com",
	},
];

export default Menuitems;
