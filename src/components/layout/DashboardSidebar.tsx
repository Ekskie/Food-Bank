
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Users,
  Package,
  FileText,
  Settings,
  Gift,
  Map,
  BarChart,
  Warehouse,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
} from "lucide-react";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

function NavItem({ icon: Icon, label, href, isActive, isCollapsed }: NavItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
      )}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}

interface SidebarNavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    links: {
      title: string;
      label?: string;
      icon: React.ElementType;
      href: string;
      role: string[];
    }[];
  }[];
}

function SidebarNav({ links, isCollapsed }: SidebarNavProps) {
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <ScrollArea className="flex-1 px-3">
      <div className={cn("flex flex-col gap-2 py-2", isCollapsed && "items-center")}>
        {links.map((group, i) => {
          // Filter links based on user role
          const roleBasedLinks = group.links.filter(link => 
            user && link.role.includes(user.role)
          );

          // Only show groups that have at least one link for the user's role
          if (roleBasedLinks.length === 0) return null;

          return (
            <div key={i} className="flex flex-col gap-2">
              {!isCollapsed && (
                <h4 className="mb-1 ml-3 text-xs font-semibold text-muted-foreground">
                  {group.title}
                </h4>
              )}
              {roleBasedLinks.map((link, j) => (
                <NavItem
                  key={j}
                  icon={link.icon}
                  label={link.title}
                  href={link.href}
                  isActive={pathname === link.href}
                  isCollapsed={isCollapsed}
                />
              ))}
              {i < links.length - 1 && !isCollapsed && (
                <div className="my-2 h-px bg-border" />
              )}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationLinks = [
    {
      title: "Overview",
      links: [
        {
          title: "Dashboard",
          icon: Home,
          href: "/dashboard",
          role: ["admin", "donor", "volunteer"],
        },
        {
          title: "My Profile",
          icon: User,
          href: "/profile",
          role: ["admin", "donor", "volunteer"],
        },
      ],
    },
    {
      title: "Management",
      links: [
        {
          title: "Manage Users",
          icon: Users,
          href: "/manage-users",
          role: ["admin"],
        },
        {
          title: "Food Banks",
          icon: Warehouse,
          href: "/food-banks",
          role: ["admin", "donor", "volunteer"],
        },
        {
          title: "Food Bank Locator",
          icon: Map,
          href: "/food-bank-locator",
          role: ["admin", "donor", "volunteer"],
        },
        {
          title: "Inventory",
          icon: Package,
          href: "/inventory",
          role: ["admin", "volunteer"],
        },
        {
          title: "Beneficiaries",
          icon: UserPlus,
          href: "/beneficiaries",
          role: ["admin", "volunteer"],
        },
      ],
    },
    {
      title: "Donations",
      links: [
        {
          title: "Donate Food",
          icon: Gift,
          href: "/donate",
          role: ["donor"],
        },
        {
          title: "Donation History",
          icon: Clock,
          href: "/donation-history",
          role: ["donor", "volunteer"],
        },
        {
          title: "Schedule Pickup",
          icon: Calendar,
          href: "/schedule-pickup",
          role: ["donor"],
        },
      ],
    },
    {
      title: "Assistance",
      links: [
        {
          title: "Request Assistance",
          icon: UserPlus,
          href: "/request-assistance",
          role: ["volunteer"],
        },
      ],
    },
    {
      title: "Analytics",
      links: [
        {
          title: "Analytics",
          icon: BarChart,
          href: "/analytics",
          role: ["admin"],
        },
        {
          title: "Reports",
          icon: FileText,
          href: "/reports",
          role: ["admin"],
        },
      ],
    },
    {
      title: "Rewards",
      links: [
        {
          title: "Reward System",
          icon: Gift,
          href: "/rewards",
          role: ["donor"],
        },
      ],
    },
    {
      title: "Settings",
      links: [
        {
          title: "Settings",
          icon: Settings,
          href: "/settings",
          role: ["admin", "donor", "volunteer"],
        },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex h-14 items-center justify-between px-3 border-b">
        {!isCollapsed && (
          <span className="text-lg font-semibold tracking-tight">GivingGroceries</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", isCollapsed && "mx-auto")}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <SidebarNav links={navigationLinks} isCollapsed={isCollapsed} />
    </div>
  );
}
