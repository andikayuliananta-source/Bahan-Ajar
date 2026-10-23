# Aplikasi Guru AI (Andika AI / EdAdmin Pro)

> Sistem Administrasi Guru Digital Terpadu terintegrasi Asisten AI Gemini dan Cloud Database Firebase.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%26%20Auth-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI%20SDK-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)

---

## 📋 Tentang Aplikasi

**Aplikasi Guru AI** adalah platform administrasi pendidikan modern yang dirancang untuk membantu guru dalam mengelola seluruh keperluan administrasi sekolah, absensi siswa berbasis QR Code, penilaian akademik, jurnal agenda harian, bimbingan wali kelas, penyusunan perangkat ajar Kurikulum Merdeka otomatis dengan AI, serta pencetakan laporan resmi berformat PDF dan ekspor data spreadsheet Excel (.xlsx).

---

## ✨ Fitur Unggulan

### 1. 👥 Manajemen Data Siswa & Kelas
- **Kelola Siswa**: Tambah, edit, cari, dan hapus data siswa per kelas.
- **Import & Export Excel**: Impor data siswa massal menggunakan template Excel `.xlsx` dan ekspor data siswa.
- **Cetak Kartu Pelajar QR & Barcode**: Pembuatan kartu identitas pelajar digital siap cetak dengan QR Code dan Barcode unik.

### 2. 📅 Akademik & Jadwal Pelajaran
- **Jadwal Mengajar**: Pengaturan jadwal mengajar harian guru per hari, jam, kelas, dan mata pelajaran.
- **Kelola Mapel**: Manajemen daftar mata pelajaran beserta alokasi semester dan tahun ajaran.

### 3. 📝 Presensi & Absensi Digital
- **Input Presensi Harian**: Pencatatan kehadiran (Hadir, Izin, Sakit, Alpa) dengan fitur *Set Semua Hadir*.
- **Scan QR Kamera**: Pemindaian otomatis kartu pelajar siswa menggunakan kamera perangkat atau barcode scanner.
- **Riwayat & Rekapitulasi Presensi**: Statistik presensi interaktif, filter tanggal/kelas/mapel, serta ekspor ke file Excel (.xlsx).

### 4. 📊 Penilaian & Evaluasi Akademik
- **Input Nilai Akademik**: Penginputan nilai Ulangan Harian (UH), Tugas, PTS/UTS, dan PAS/UAS per mata pelajaran.
- **Rekap & Analisis Nilai**: Perhitungan otomatis nilai rata-rata, nilai tertinggi, dan nilai terendah kelas.
- **Leger Nilai Matriks**: Matriks nilai lengkap dengan perhitungan rata-rata, predikat, dan ketuntasan.

### 5. 📖 Jurnal Mengajar & Bimbingan Konseling
- **Agenda Mengajar Harian**: Pencatatan materi pembelajaran yang terlaksana dan catatan ketercapaian kelas.
- **Bimbingan Guru Wali**: Log konseling penanganan kasus siswa (akademik, pribadi, sosial) beserta tindak lanjut solusi.

### 6. 🖨️ Pusat Cetak Laporan & Arsip Digital
- **Cetak Laporan PDF Resmi**: Dokumen resmi dilengkapi Kop Surat Sekolah, logo instansi, tabel data, dan blok tanda tangan Kepala Sekolah & Guru.
- **Ekspor Dokumen Excel (.xlsx)**:
  - Rekapitulasi Absensi Siswa (.xlsx)
  - Leger Nilai Akademik (.xlsx)
  - Riwayat Harian Presensi (.xlsx)
  - Riwayat Input Nilai Siswa (.xlsx)

### 7. 🤖 Generator AI & Kurikulum Merdeka
- **Generator Perangkat Ajar AI**: Pembuatan RPP, ATP, Prota, dan Prosem otomatis sesuai capaian pembelajaran.
- **Modul Ajar Deep Learning AI**: Penyusunan Modul Ajar Kurikulum Merdeka dengan pendekatan Mindful, Meaningful, & Joyful Learning.
- **Modul Kokurikuler AI**: Perencanaan kegiatan kokurikuler lintas mapel dan dimensi Profil Pelajar.
- **Generator LKPD AI**: Pembuatan Lembar Kerja Peserta Didik interaktif berbasis studi kasus dan aktivitas siswa.
- **Generator Soal AI**: Pembuatan naskah soal ujian (Pilihan Ganda & Uraian), kisi-kisi, Lembar Jawaban Siswa (LJS), dan kunci jawaban siap cetak.
- **Asisten Guru AI**: Chatbot konsultasi materi pembelajaran, metode pengajaran, dan asesmen pendidikan.

### 8. 🔒 Autentikasi & Pengaturan
- **Login Akun Google (Firebase Auth)**: Autentikasi aman terintegrasi Google Identity Services.
- **Login Alternatif Kredensial Guru**: Akses masuk langsung dengan username & password guru / master admin.
- **Pengaturan Profil & Kop Surat**: Penyesuaian nama guru, NIP, nama sekolah, NIP kepala sekolah, dan logo kop dinas.

---

## 🛠️ Arsitektur & Teknologi

| Bagian | Teknologi |
| --- | --- |
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Backend / Proxy Server** | [Express](https://expressjs.com/) via [tsx](https://github.com/privatenumber/tsx) |
| **Database & Auth** | [Firebase](https://firebase.google.com/) (Cloud Firestore & Authentication) |
| **Artificial Intelligence** | [@google/genai](https://www.npmjs.com/package/@google/genai) (Google Gemini API) |
| **Spreadsheet Engine** | [XLSX (SheetJS)](https://sheetjs.com/) |
| **PDF Generation** | [jsPDF](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) |
| **QR & Barcode** | [qrcode](https://www.npmjs.com/package/qrcode), [jsQR](https://github.com/cozmo/jsQR), [JsBarcode](https://lindell.me/JsBarcode/) |
| **Alerts & Modal** | [SweetAlert2](https://sweetalert2.github.io/) |

---

## 📁 Struktur Direktori

```text
├── assets/                     # Aset statis & logo
├── firebase-applet-config.json # Konfigurasi Firebase Applet
├── firebase-blueprint.json    # Skema Firestore Blueprint
├── firestore.rules            # Aturan keamanan Cloud Firestore
├── index.html                 # Entry point HTML aplikasi
├── metadata.json              # Metadata aplikasi AI Studio
├── package.json               # Konfigurasi dependensi dan skrip npm
├── server.ts                  # Server backend Express & API proxy
├── src/
│   ├── App.tsx                # Komponen utama & manajemen tab navigasi
│   ├── components/            # Komponen tampilan per modul:
│   │   ├── AgendaMengajarView.tsx
│   │   ├── AsistenGuruAIView.tsx
│   │   ├── BimbinganWaliView.tsx
│   │   ├── CetakKartuQRView.tsx
│   │   ├── DashboardView.tsx
│   │   ├── DownloadPerangkatAjarView.tsx
│   │   ├── GeneratorAILainnyaView.tsx
│   │   ├── GeneratorLkpdAIView.tsx
│   │   ├── GeneratorPerangkatAjarAIView.tsx
│   │   ├── GeneratorSoalAIView.tsx
│   │   ├── Header.tsx
│   │   ├── InputAbsensiView.tsx
│   │   ├── InputPenilaianView.tsx
│   │   ├── JadwalMengajarView.tsx
│   │   ├── KelolaMapelView.tsx
│   │   ├── KelolaSiswaView.tsx
│   │   ├── LoginView.tsx
│   │   ├── ModulAjarAIView.tsx
│   │   ├── ModulKokurikulerAIView.tsx
│   │   ├── PengaturanView.tsx
│   │   ├── PerangkatAjarKBCView.tsx
│   │   ├── PusatLaporanView.tsx
│   │   ├── ResetDatabaseView.tsx
│   │   └── Sidebar.tsx
│   ├── lib/
│   │   ├── excelExport.ts     # Utilitas ekspor absensi & nilai ke Excel (.xlsx)
│   │   ├── firebase.ts        # Inisialisasi Firebase Firestore & Auth
│   │   └── swal.ts            # Notifikasi Toast & SweetAlert konfirmasi
│   ├── types.ts               # Interface dan TypeScript type definitions
│   ├── index.css              # Konfigurasi Tailwind CSS v4 & custom scrollbar
│   └── main.tsx               # Entry point React DOM
├── tsconfig.json              # Konfigurasi TypeScript
└── vite.config.ts             # Konfigurasi Vite
```

---

## 🚀 Panduan Memulai (Getting Started)

### 1. Prasyarat
- [Node.js](https://nodejs.org/) versi 18 atau lebih tinggi
- npm / yarn / bun

### 2. Kloning Repositori
```bash
git clone https://github.com/username/aplikasi-guru-ai.git
cd aplikasi-guru-ai
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Konfigurasi Variabel Lingkungan (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Sesuaikan nilai di dalam `.env`:
```env
# Google Gemini API Key (Diperlukan untuk fitur AI)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Kredensial Login Master Admin Guru
AUTH_USERNAME="www.yefriharyanto.id"
AUTH_PASSWORD="123456"

# Konfigurasi Firebase (Opsi mandiri jika tidak menggunakan firebase-applet-config.json)
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_DATABASE_ID=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
```

### 5. Menjalankan Server Development
```bash
npm run dev
```
Buka browser pada alamat `http://localhost:3000`.

### 6. Membangun untuk Produksi (Build)
```bash
npm run build
npm start
```

---

## 🔐 Kredensial Bawaan (Default Login)
- **Metode 1**: Masuk menggunakan tombol **Lanjutkan dengan Google** (Firebase Auth).
- **Metode 2**: Masuk dengan Kredensial Guru:
  - **Username**: `www.yefriharyanto.id`
  - **Password**: `123456`
*(Dapat diubah kapan saja melalui menu Pengaturan Profil di dalam aplikasi).*

---

## 📄 Lisensi
Proyek ini dikembangkan untuk kebutuhan sistem administrasi guru digital dan pendidikan.
Hak Cipta &copy; 2026 **Drs. Yefri Haryanto, M.Pd.** / **Andika AI**.
