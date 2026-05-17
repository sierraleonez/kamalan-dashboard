import React from 'react';
import StaticPage from './StaticPage';

const content = `
## Apa itu Kamalan?

Kamalan adalah platform gift registry digital yang memungkinkan kamu membuat daftar keinginan hadiah untuk berbagai acara spesial seperti pernikahan, ulang tahun, dan acara lainnya. Teman dan keluargamu bisa melihat daftar tersebut dan mereservasi hadiah yang ingin mereka berikan.

---

## Bagaimana cara membuat registry?

1. Daftar atau masuk ke akun Kamalan kamu.
2. Klik tombol **"Buat Registry"** di halaman beranda atau menu.
3. Pilih jenis acara dan isi informasi acara kamu.
4. Cari dan tambahkan produk ke dalam daftar hadiah.
5. Lengkapi informasi pengiriman.
6. Bagikan link registry-mu kepada teman dan keluarga.

---

## Bagaimana cara berbagi registry saya?

Setelah registry selesai dibuat, kamu akan mendapatkan link unik yang bisa kamu bagikan melalui WhatsApp, media sosial, atau undangan. Siapa pun yang memiliki link tersebut bisa melihat daftar hadiahmu.

---

## Bagaimana cara mereservasi hadiah?

Tamu yang membuka link registry-mu bisa memilih hadiah dan mengklik tombol **"Reservasi"**. Reservasi ini menandai hadiah tersebut agar tidak dibeli ganda oleh tamu lain.

---

## Apakah Kamalan gratis digunakan?

Ya, membuat dan berbagi registry di Kamalan sepenuhnya gratis.

---

## Bagaimana jika saya ingin mengubah daftar hadiah?

Kamu bisa menambah atau menghapus produk dari registry kapan saja sebelum acara berlangsung melalui halaman **"Registry-Ku"**.

---

## Siapa yang bisa saya hubungi jika ada masalah?

Hubungi kami melalui Instagram [@kamalan.registry](https://www.instagram.com/kamalan.registry/) atau email ke **hello@kamalan.id**. Kami siap membantu!
`;

export default function FaqPage() {
    return <StaticPage title="FAQ" content={content} />;
}
