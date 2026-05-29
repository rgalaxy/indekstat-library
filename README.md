# Indekstat Library Frontend

Frontend aplikasi perpustakaan berbasis React + TypeScript untuk kebutuhan interview. Aplikasi ini menyediakan katalog buku publik dan panel admin untuk mengelola data master perpustakaan seperti buku, jenis buku, penulis, penerbit, peminjaman, dan denda.

Proyek ini dikembangkan sebagai client untuk backend Go REST API dan fokus pada pemisahan feature, state management yang rapi, reusable UI components, dan alur autentikasi admin.

## Project Scope

### Public features

- Menampilkan daftar buku untuk pengunjung
- Pencarian buku dari halaman publik
- Tampilan katalog dengan kartu buku yang ringkas

### Admin features

- Login admin
- Dashboard admin
- CRUD buku
- CRUD jenis buku
- CRUD penulis
- CRUD penerbit
- CRUD peminjaman
- CRUD denda
- Route protection untuk halaman admin

## Tech Stack

- React 19
- TypeScript
- Vite 8
- Redux Toolkit untuk global state management per feature
- React Router untuk routing publik dan protected admin routes
- Axios untuk komunikasi API
- React Hook Form + Zod untuk form state dan validasi
- Tailwind CSS + shadcn/ui components untuk UI
- Lucide React untuk icons
- Sonner untuk toast notifications

## State And Infrastructure

Beberapa hal yang diimplementasikan dalam proyek ini:

- Feature-based folder structure: setiap domain seperti auth, buku, jenisBuku, penulisBuku, penerbitBuku, peminjaman, dan denda memiliki folder API, slice, types, dan components masing-masing.
- Redux Toolkit slices: state dipisahkan per feature agar loading, error, selected item, dan collection state mudah dikelola.
- Protected admin routing: route admin dibungkus `ProtectedRoute`, sehingga user yang belum login diarahkan ke halaman login.
- Centralized API client: request API menggunakan instance Axios bersama dengan `withCredentials`, bearer token injection, dan CSRF header untuk request mutating.
- Reusable shared components: tabel, modal form, confirm dialog, page header, dan loading state dipakai ulang di banyak halaman admin.
- Dev auth middleware: tersedia middleware Vite untuk alur login berbasis cookie/refresh token pada environment development.

## Prerequisites

Sebelum menjalankan frontend ini, pastikan dependency berikut tersedia:

- Git
- Node.js 20 atau lebih baru
- npm 10 atau lebih baru
- Backend API dari repository ini sudah di-clone dan berhasil dijalankan: https://github.com/afrizal423/Golang-Perpustakaan-Restful-API#

## Backend Setup

Frontend ini bergantung pada backend Go API. Jalankan backend terlebih dahulu.

```bash
git clone https://github.com/afrizal423/Golang-Perpustakaan-Restful-API.git
cd Golang-Perpustakaan-Restful-API
```

Lalu ikuti instruksi setup pada repository backend tersebut sampai API berhasil berjalan.

Catatan penting:

- Frontend ini mengasumsikan backend tersedia di `http://localhost:8001`
- Login admin mengikuti akun atau seed data yang disediakan backend, bukan ditentukan dari frontend ini
- Jika backend belum berjalan atau seed admin belum tersedia, halaman admin tidak akan bisa digunakan

## How To Clone And Run This Project

```bash
git clone https://github.com/<your-username>/indekstat-library.git
cd indekstat-library
npm install
```

Buat file `.env` di root project dan isi dengan konfigurasi berikut:

```env
VITE_API_BASE_URL=http://localhost:8001/api
```

Jalankan development server:

```bash
npm run dev
```

Setelah itu buka:

- `http://localhost:5173` untuk halaman publik
- `http://localhost:5173/login` untuk login admin

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Project Structure

```text
src/
  app/              Redux store, hooks, router
  bff/              Development auth middleware
  components/ui/    Reusable UI primitives
  features/         Feature modules per domain
  pages/            Page-level screens
  shared/           Shared constants, components, lib, types
```

## Notes For Interview Review

Hal-hal yang ingin ditonjolkan dari implementasi ini:

- Struktur kode modular dan scalable untuk aplikasi CRUD multi-domain
- Pemisahan concern antara UI, state management, API layer, dan routing
- Reusable component approach untuk mempercepat penambahan fitur admin baru
- Validasi form di sisi client menggunakan schema
- Pengamanan dasar pada alur admin melalui protected route, auth token handling, dan dukungan CSRF header

## UI Preview

<img width="720" alt="Public catalog" src="https://github.com/user-attachments/assets/f92b9baf-ae77-4fe2-a930-ca0c2c406d26" />
<img width="720" alt="Admin dashboard" src="https://github.com/user-attachments/assets/7291ee0a-5e33-48f6-a83f-65e19db14b61" />
<img width="720" alt="Admin table" src="https://github.com/user-attachments/assets/b30ea77b-cb88-47a8-916a-4cb0f59d32f5" />
<img width="720" alt="Admin form" src="https://github.com/user-attachments/assets/f7fd5769-9505-4d2e-9527-8ed74bc4e757" />
