# Phone Tracker - Prototype Google Maps

Aplikasi web untuk melacak dan menyimpan lokasi kontak dengan nomor telepon menggunakan Google Maps.

## Fitur

- 📍 **Peta Interaktif** - Google Maps untuk menampilkan lokasi kontak
- 👥 **Manajemen Kontak** - Tambah, lihat, dan hapus kontak
- 🔍 **Pencarian** - Cari kontak berdasarkan nama atau nomor telepon
- 📱 **Responsive Design** - Tampilan optimal di semua perangkat
- 💾 **Local Storage** - Data tersimpan di browser
- 📌 **Markers** - Setiap kontak ditampilkan sebagai marker di peta
- 🎯 **Auto Location** - Gunakan lokasi saat ini untuk kontak baru

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Google Maps API Key

Untuk menggunakan Google Maps, Anda perlu API key dari Google Cloud Console:

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang ada
3. Enable **Maps JavaScript API**
4. Buat API key di **Credentials**
5. Buka file `components/Map.tsx` dan ganti `YOUR_API_KEY_HERE` dengan API key Anda:

```typescript
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE`;
```

### 3. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Cara Menggunakan

### Menambah Kontak

1. Klik tombol **"+ Tambah Kontak Baru"**
2. Isi form:
   - **Nama**: Nama kontak
   - **Nomor Telepon**: Nomor telepon kontak
   - **Latitude & Longitude**: Koordinat lokasi
   - **Alamat** (opsional): Alamat lengkap
3. Atau klik **"📍 Gunakan Lokasi Saat Ini"** untuk menggunakan lokasi Anda
4. Klik **"Simpan"**

### Melihat Kontak di Peta

- Semua kontak akan muncul sebagai marker di peta
- Klik marker untuk melihat detail kontak
- Klik kontak di sidebar untuk fokus ke lokasi di peta

### Mencari Kontak

- Gunakan search bar di sidebar
- Ketik nama atau nomor telepon
- Hasil akan difilter secara real-time

### Menghapus Kontak

- Klik ikon tempat sampah (🗑️) di kartu kontak
- Kontak akan dihapus dari daftar dan peta

## Teknologi

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Google Maps JavaScript API** - Peta interaktif
- **Local Storage** - Penyimpanan data

## Build untuk Production

```bash
npm run build
npm start
```

## Catatan

- Data kontak disimpan di browser (Local Storage)
- Untuk production, pertimbangkan menggunakan database
- API key Google Maps harus di-restrict untuk keamanan
- Aplikasi memerlukan izin lokasi untuk fitur "Gunakan Lokasi Saat Ini"

## Contoh Koordinat (Indonesia)

- Jakarta: -6.2088, 106.8456
- Bandung: -6.9175, 107.6191
- Surabaya: -7.2575, 112.7521
- Yogyakarta: -7.7956, 110.3695
- Bali: -8.3405, 115.0920

## License

MIT
