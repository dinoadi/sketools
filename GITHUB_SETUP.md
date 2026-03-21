# GitHub Repository Setup Guide

## Cara Membuat Repository GitHub Baru

### Langkah 1: Buat Repository di GitHub

1. Buka [GitHub.com](https://github.com) dan login
2. Klik tombol **+** di pojok kanan atas
3. Pilih **New repository**
4. Isi form:
   - **Repository name**: `sketools`
   - **Description**: `All-in-One Automation OS for Content Creators - Reels Downloader, YouTube & TikTok Auto-Upload, TikTok Viewer`
   - **Public/Private**: Pilih sesuai kebutuhan (Public untuk open source)
   - **Initialize this repository**: JANGAN centang "Add a README file", "Add .gitignore", atau "Choose a license" (karena sudah ada di project)
5. Klik **Create repository**

### Langkah 2: Hubungkan Local Repository ke GitHub

Setelah repository dibuat, GitHub akan menampilkan URL repository. Copy URL tersebut (contoh: `https://github.com/username/sketools.git`)

Kemudian jalankan perintah berikut di terminal:

```bash
# Tambahkan remote repository
git remote add origin https://github.com/USERNAME_ANDA/sketools.git

# Ganti USERNAME_ANDA dengan username GitHub Anda
```

### Langkah 3: Push ke GitHub

```bash
# Push ke branch master
git push -u origin master
```

Jika Anda menggunakan branch `main`:

```bash
# Push ke branch main
git push -u origin main
```

### Langkah 4: Verifikasi

Buka repository GitHub Anda, Anda akan melihat semua file sudah terupload.

---

## Cara Alternatif: Menggunakan GitHub CLI

Jika Anda ingin menggunakan GitHub CLI:

### Install GitHub CLI

**Windows:**
```bash
winget install --id GitHub.cli
```

**macOS:**
```bash
brew install gh
```

**Linux:**
```bash
sudo apt install gh
```

### Login ke GitHub

```bash
gh auth login
```

### Buat Repository dan Push

```bash
# Buat repository baru
gh repo create sketools --public --source=. --remote=origin --push

# Untuk private repository
gh repo create sketools --private --source=. --remote=origin --push
```

---

## Troubleshooting

### Error: "remote origin already exists"

Jika muncul error ini, hapus remote yang lama:

```bash
git remote remove origin
git remote add origin https://github.com/USERNAME_ANDA/sketools.git
git push -u origin master
```

### Error: "Authentication failed"

Pastikan Anda sudah login ke GitHub:

```bash
# Jika menggunakan HTTPS
# Masukkan username dan password/token saat diminta

# Jika menggunakan SSH
# Setup SSH key terlebih dahulu:
# https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

### Error: "Updates were rejected"

Jika ada perubahan di GitHub yang tidak ada di local:

```bash
# Pull dulu
git pull origin master --allow-unrelated-histories

# Lalu push
git push origin master
```

---

## Setelah Push Berhasil

### Deploy ke Vercel dari GitHub

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik **Add New Project**
3. Import repository `sketools` dari GitHub
4. Configure environment variables di Vercel:
   - Buka file `.env.example` atau lihat di [`DEPLOYMENT.md`](DEPLOYMENT.md)
   - Copy semua environment variables ke Vercel
5. Klik **Deploy**

### Deploy ke Netlify dari GitHub

1. Buka [Netlify Dashboard](https://app.netlify.com/)
2. Klik **Add new site** → **Import an existing project**
3. Connect GitHub dan pilih repository `sketools`
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables
6. Klik **Deploy site**

---

## Next Steps

Setelah repository dibuat dan code di-push:

1. ✅ Verifikasi semua file ada di GitHub
2. ✅ Setup environment variables di deployment platform
3. ✅ Deploy ke Vercel atau Netlify
4. ✅ Test aplikasi di production
5. ✅ Share repository URL dengan tim

---

## Tips

- **README.md**: Update README dengan deskripsi project yang lebih lengkap
- **.gitignore**: Pastikan file sensitif tidak ter-commit (`.env.local`, `.env`)
- **Branching**: Gunakan feature branches untuk development (`git checkout -b feature/new-feature`)
- **Pull Requests**: Gunakan PR untuk code review sebelum merge ke master/main
- **Tags**: Buat tags untuk releases (`git tag v1.0.0 && git push origin v1.0.0`)

---

## Need Help?

- [GitHub Documentation](https://docs.github.com/)
- [Git Documentation](https://git-scm.com/doc)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/git)
