import { useState, type ReactNode } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  BookOpen,
  BookCopy,
  Tag,
  PenLine,
  Building2,
  ClipboardList,
  AlertCircle,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearAuth } from "@/features/auth/slices/authSlice";
import { ROUTES } from "@/shared/constants/routes";

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
  color: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
    path: ROUTES.ADMIN_DASHBOARD,
    color: "bg-violet-500",
  },
  {
    label: "Buku Publik",
    icon: <BookOpen className="w-4 h-4" />,
    path: ROUTES.HOME,
    color: "bg-blue-500",
  },
  {
    label: "Buku Admin",
    icon: <BookCopy className="w-4 h-4" />,
    path: ROUTES.ADMIN_BUKU,
    color: "bg-indigo-500",
  },
  {
    label: "Jenis Buku",
    icon: <Tag className="w-4 h-4" />,
    path: ROUTES.ADMIN_JENIS_BUKU,
    color: "bg-pink-500",
  },
  {
    label: "Penulis",
    icon: <PenLine className="w-4 h-4" />,
    path: ROUTES.ADMIN_PENULIS,
    color: "bg-green-500",
  },
  {
    label: "Penerbit",
    icon: <Building2 className="w-4 h-4" />,
    path: ROUTES.ADMIN_PENERBIT,
    color: "bg-orange-500",
  },
  {
    label: "Peminjaman",
    icon: <ClipboardList className="w-4 h-4" />,
    path: ROUTES.ADMIN_PEMINJAMAN,
    color: "bg-teal-500",
  },
  {
    label: "Denda",
    icon: <AlertCircle className="w-4 h-4" />,
    path: ROUTES.ADMIN_DENDA,
    color: "bg-red-500",
  },
];

const pageTitles: Record<string, string> = {
  [ROUTES.ADMIN_DASHBOARD]: "🏠 Dashboard",
  [ROUTES.HOME]: "📚 Buku",
  [ROUTES.ADMIN_BUKU]: "📖 Kelola Buku",
  [ROUTES.ADMIN_JENIS_BUKU]: "🏷️ Jenis Buku",
  [ROUTES.ADMIN_PENULIS]: "✍️ Penulis",
  [ROUTES.ADMIN_PENERBIT]: "🏢 Penerbit",
  [ROUTES.ADMIN_PEMINJAMAN]: "📋 Peminjaman",
  [ROUTES.ADMIN_DENDA]: "⚠️ Denda",
};

const SidebarNav = ({
  collapsed = false,
  onClose,
}: {
  collapsed?: boolean;
  onClose?: () => void;
}) => {
  const location = useLocation();

  return (
    <nav className="flex flex-col gap-1 px-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return collapsed ? (
          <Tooltip key={item.path}>
            <TooltipTrigger asChild>
              <NavLink
                to={item.path}
                onClick={onClose}
                className={`flex items-center justify-center w-10 h-10 rounded-xl mx-auto transition-all ${isActive ? "ring-2 ring-white/50 scale-110" : "hover:scale-105"}`}
              >
                <span className={`${item.color} text-white p-2 rounded-xl`}>
                  {item.icon}
                </span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ) : (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${isActive ? "bg-white/20 text-white font-semibold" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
          >
            <span
              className={`${item.color} text-white p-1.5 rounded-lg flex-shrink-0`}
            >
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
  <div className="flex flex-col h-full bg-gradient-to-b from-violet-600 via-purple-600 to-pink-600">
    <div className="p-4 flex items-center gap-3">
      <span className="text-3xl">📚</span>
      <div>
        <p className="font-bold text-white text-lg leading-tight">Indekstat</p>
        <p className="text-purple-200 text-xs">Library Manager</p>
      </div>
    </div>
    <Separator className="bg-white/20 mx-4" />
    <div className="flex-1 py-4 overflow-y-auto">
      <SidebarNav onClose={onClose} />
    </div>
    <div className="p-4 text-center text-purple-200 text-xs">
      <span>✨ Semangat belajar! ✨</span>
    </div>
  </div>
);

export const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAppSelector((s) => s.auth.user);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate(ROUTES.LOGIN);
  };

  const pageTitle = pageTitles[location.pathname] ?? "📚 Admin";
  const initials = (user ?? "A").slice(0, 2).toUpperCase();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className="hidden md:flex w-64 flex-shrink-0 flex-col shadow-xl">
        <SidebarContent />
      </aside>

      <div className="flex flex-col flex-1 min-w-0">
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  {mobileOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SidebarContent onClose={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>
            <h1 className="font-bold text-gray-800 text-lg">{pageTitle}</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:bg-gray-50 rounded-xl px-3 py-2 transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-pink-500 text-white text-xs font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user ?? "Admin"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer gap-2"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
