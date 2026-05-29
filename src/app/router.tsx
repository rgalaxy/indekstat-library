import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { AdminLayout } from "@/pages/AdminLayout";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { DashboardPage } from "@/pages/DashboardPage";
import { BukuPage } from "@/pages/BukuPage";
import { JenisBukuPage } from "@/pages/admin/JenisBukuPage";
import { PenulisPage } from "@/pages/admin/PenulisPage";
import { BukuAdminPage } from "@/pages/admin/BukuAdminPage";
import { PenerbitPage } from "@/pages/admin/PenerbitPage";
import { PeminjamanPage } from "@/pages/admin/PeminjamanPage";
import { DendaPage } from "@/pages/admin/DendaPage";
import { ROUTES } from "@/shared/constants/routes";

export const router = createBrowserRouter([
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  {
    path: ROUTES.HOME,
    element: <BukuPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: ROUTES.ADMIN_DASHBOARD, element: <DashboardPage /> },
          { path: ROUTES.ADMIN_BUKU, element: <BukuAdminPage /> },
          { path: ROUTES.ADMIN_JENIS_BUKU, element: <JenisBukuPage /> },
          { path: ROUTES.ADMIN_PENULIS, element: <PenulisPage /> },
          { path: ROUTES.ADMIN_PENERBIT, element: <PenerbitPage /> },
          { path: ROUTES.ADMIN_PEMINJAMAN, element: <PeminjamanPage /> },
          { path: ROUTES.ADMIN_DENDA, element: <DendaPage /> },
        ],
      },
    ],
  },
]);
