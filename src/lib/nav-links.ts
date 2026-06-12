export interface NavLink {
  label: string;
  href: string;
}

export const storefrontLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
];

export const adminLink: NavLink = { label: "Admin", href: "/admin" };
