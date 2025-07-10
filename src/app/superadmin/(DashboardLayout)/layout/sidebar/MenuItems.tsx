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
    chip?: string;
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
        href: "/",
    },

    {
        navlabel: true,
        subheader: "UTILITIES",
    },

    {
        id: uniqueId(),
        title: "Icons",
        icon: "smile-circle-linear",
        href: "/icons",
    },

    {
        id: uniqueId(),
        title: "Table",
        icon: "tablet-line-duotone",
        href: "/table",
    },

    {
        id: uniqueId(),
        title: "Applications",
        icon: "window-frame-broken",
        href: "/superadmin/applications",
    },
    {
        id: uniqueId(),
        title: "Manage Admins",
        icon: "user-square-linear",
        href: "/superadmin/admins",
    },
    {
        id: uniqueId(),
        title: "Sample Page",
        icon: "window-frame-broken",
        href: "/sample-page",
    },
    {
        id: uniqueId(),
        title: "Typography",
        icon: "text-bold-square-line-duotone",
        href: "/utilities/typography",
    },
    {
        id: uniqueId(),
        title: "Shadow",
        icon: "box-minimalistic-broken",
        href: "/utilities/shadow",
    },
    {
        navlabel: true,
        subheader: "AUTH",
    },
    {
        id: uniqueId(),
        title: "Login",
        icon: "login-2-broken",
        href: "/authentication/login",
    },
    {
        id: uniqueId(),
        title: "Register",
        icon: "shield-user-linear",
        href: "/authentication/register",
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
        subtitle: "This is the sutitle",
        icon: "square-academic-cap-line-duotone",

        href: "https://spike-nextjs-pro-main.vercel.app/",
    },

    {
        id: uniqueId(),
        title: "Chip",
        icon: "archive-check-line-duotone",
        chip: "9",
        href: "https://spike-nextjs-pro-main.vercel.app/",
        chipColor: "",
    },
    {
        id: uniqueId(),
        title: "Outlined",
        icon: "smile-circle-line-duotone",
        variant: "outlined",
        href: "https://spike-nextjs-pro-main.vercel.app/",
        chip: "outline"
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
