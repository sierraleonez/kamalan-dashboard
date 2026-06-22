import React from 'react';
import StaticPage from './StaticPage';

const content = `## Tentang Kami: Cerita di Balik Kamalan
Selamat datang di Kamalan, ruang di mana setiap niat baik bersemi menjadi hadiah yang tepat.

Kami percaya bahwa memberi hadiah adalah salah satu cara terbaik untuk merayakan hubungan antarmanusia. Namun, sering kali tradisi yang indah ini disertai dengan sedikit kebingungan. Dari sanalah cerita kami dimulai.

### Background Story: Seni Memberi yang Sering Membingungkan
Pernahkah Anda menghabiskan waktu berhari-hari memikirkan hadiah apa yang benar-benar dibutuhkan oleh sahabat yang akan menikah? Atau sebagai tuan rumah acara, apakah Anda pernah menerima tiga unit rice cooker yang sama di hari pernikahan Anda?

Inilah masalah klasik yang sering kita hadapi. Di satu sisi, pemberi hadiah kerap merasa cemas apakah kado yang mereka bawa akan berguna atau justru berakhir di sudut gudang. Di sisi lain, penerima hadiah sering kali sungkan untuk mengatakan apa yang sebenarnya mereka butuhkan, demi menjaga kesopanan.

Ada kesenjangan keinginan (desire gap) antara si pemberi dan si penerima. Kamalan hadir untuk menjembatani kesenjangan tersebut.

### Solusi Kami: Menghubungkan Keinginan dan Kebahagiaan
Kamalan adalah platform Gift Registry (pendaftaran hadiah) digital yang dirancang untuk menyederhanakan tradisi memberi kado di berbagai momen spesial Anda—mulai dari pernikahan, syukuran rumah baru, hingga perayaan hari lahir.

Melalui Kamalan, Anda dapat:

**Membuat Daftar Impian (Wishlist):** Pilih dan kurasi barang-barang yang memang Anda butuhkan atau impikan untuk momen spesial Anda.

**Memudahkan Tamu & Kerabat:** Kerabat Anda tidak perlu lagi menebak-nebak. Mereka cukup melihat daftar di Kamalan, memilih hadiah yang sesuai dengan budget mereka, dan membelinya.

**Menghindari Hadiah Ganda:** Sistem kami akan memastikan tidak ada dua orang yang membelikan barang yang sama, kecuali jika memang itu yang Anda harapkan.

Dengan Kamalan, memberi hadiah menjadi lebih praktis, efisien, dan yang terpenting: pasti bermanfaat.

### Proses Kreatif & Motivasi Kami
Nama Kamalan diambil dengan esensi kebaikan dan ketulusan. Dalam proses kreatif merancang platform ini, fokus utama kami bukan sekadar membangun sistem digital, melainkan menciptakan sebuah experience atau pengalaman yang menyenangkan. Kami mengombinasikan kemudahan teknologi dengan kehangatan tradisi berbagi.

Motivasi terbesar kami adalah menghilangkan beban pikiran (stress-free) dari momen-momen perayaan. Kami ingin mengembalikan esensi sejati dari perayaan itu sendiri: yaitu kebahagiaan, kebersamaan, dan rasa syukur.

Kami percaya, hadiah terbaik bukanlah yang paling mahal, melainkan yang paling tepat dan bermakna.

Mari rayakan momen berharga Anda tanpa tebak-tebakan. Mulai buat gift registry Anda bersama Kamalan hari ini.`;

export default function CeritaKamalanPage() {
    return <StaticPage title="Cerita Kamalan" content={content} />;
}
