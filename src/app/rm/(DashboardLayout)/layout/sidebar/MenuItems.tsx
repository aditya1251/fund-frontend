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
    href: "/rm/loans",
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
    title: "Loans",
    icon: "dollar-line-duotone",
    href: "/rm/loans",

    children: [
      {
        id: uniqueId(),
        title: "Applications",
        chip: "",
        chipColor: "primary",
        href: "/rm/loans/applications",
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
    chip: "",
    chipColor: "primary",
    icon: "book-line-duotone",
    href: "/rm/contacts",
  },
];

export default Menuitems;
