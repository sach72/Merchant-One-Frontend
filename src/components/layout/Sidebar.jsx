import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ClipboardList,
  Users,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/providers/AuthProvider";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    allowedRoles: [
      "ROLE_ADMIN",
      "ROLE_USER",
      "ROLE_CASHIER",
      "ROLE_BRANCH_MANAGER",
      "ROLE_STORE_MANAGER",
      "ROLE_STORE_ADMIN",
      "ROLE_BRANCH_CASHIER",
    ],
  },
  {
    label: "Orders",
    path: "/orders",
    icon: ShoppingCart,
    allowedRoles: [
      "ROLE_ADMIN",
      "ROLE_CASHIER",
      "ROLE_BRANCH_MANAGER",
      "ROLE_STORE_MANAGER",
      "ROLE_STORE_ADMIN",
      "ROLE_BRANCH_CASHIER",
    ],
  },
  {
    label: "Products",
    path: "/products",
    icon: Package,
    allowedRoles: [
      "ROLE_ADMIN",
      "ROLE_STORE_MANAGER",
      "ROLE_STORE_ADMIN",
      "ROLE_BRANCH_MANAGER",
    ],
  },
  {
    label: "Inventory",
    path: "/inventory",
    icon: ClipboardList,
    allowedRoles: [
      "ROLE_ADMIN",
      "ROLE_STORE_MANAGER",
      "ROLE_STORE_ADMIN",
      "ROLE_BRANCH_MANAGER",
    ],
  },
  {
    label: "Customers",
    path: "/customers",
    icon: Users,
    allowedRoles: [
      "ROLE_ADMIN",
      "ROLE_CASHIER",
      "ROLE_BRANCH_MANAGER",
      "ROLE_STORE_MANAGER",
      "ROLE_STORE_ADMIN",
      "ROLE_BRANCH_CASHIER",
    ],
  },
  {
    label: "Employees",
    path: "/employees",
    icon: UserCog,
    allowedRoles: [
      "ROLE_ADMIN",
      "ROLE_STORE_ADMIN",
      "ROLE_STORE_MANAGER",
      "ROLE_BRANCH_MANAGER",
    ],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
    allowedRoles: [
      "ROLE_ADMIN",
      "ROLE_STORE_ADMIN",
      "ROLE_STORE_MANAGER",
      "ROLE_BRANCH_MANAGER",
    ],
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    allowedRoles: [
      "ROLE_ADMIN",
      "ROLE_STORE_ADMIN",
      "ROLE_STORE_MANAGER",
    ],
  },
];

function Sidebar() {
  const { user, logout } = useAuth();

  const userRole = user?.roles;

  const visibleMenuItems = menuItems.filter((item) =>
  item.allowedRoles.includes(userRole)
);

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-background">

      {/* Brand */}
      <div className="flex h-16 items-center border-b px-6">
        <div>
          <h1 className="text-lg font-bold">
            Merchant Mart
          </h1>

          <p className="text-xs text-muted-foreground">
            POS Management
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {visibleMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t p-4">

        {/* User Information */}
        <div className="mb-3 rounded-md bg-muted/50 p-3">
          <p className="truncate text-sm font-semibold">
            {user?.fullName || "User"}
          </p>

          <p className="mt-1 truncate text-xs text-muted-foreground">
            {user?.roles || "User"}
          </p>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-5 w-5" />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;