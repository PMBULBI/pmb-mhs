import { UrlCekPembayaranVAReg } from "../controller/template.js";
import { postWithToken }  from "https://jscroot.github.io/api/croot.js";
import { token } from "../controller/cookies.js";

// Cek Pembayaran VA Registrasi
postWithToken(UrlCekPembayaranVAReg, "LOGIN", token, "test", ResponseVAReg)

function ResponseVAReg(value) {
  if (!value.success) {
    window.location.replace("bayarregistrasi.html");
  }
}

// Event listener untuk tombol "Saya Setuju"
document.getElementById('buttonSetujuPembayaran').addEventListener('click', function() {
    // Tampilkan SweetAlert dengan opsi konfirmasi
    Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin sudah setuju dengan isi dari pernyataan pada layar Anda? Data yang sudah diinput tidak dapat diubah.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Lanjutkan!'
    }).then((result) => {
      // Jika pengguna mengklik "Ya", arahkan ke halaman pembayaran.html
      if (result.isConfirmed) {
        window.location.href = 'metodepembayaran.html';
      }
    });
  });