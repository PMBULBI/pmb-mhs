// Event listener untuk button Pembayaran Lunas
document.getElementById('buttonLunas').addEventListener('click', function() {
    // Tampilkan SweetAlert dengan opsi konfirmasi
    Swal.fire({
      title: 'Konfirmasi',
      text: 'Saya setuju dengan segala konsekuensi serta patuh dan tunduk pada ketentuan yang berlaku',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Saya Yakin!'
    }).then((result) => {
      // Jika pengguna mengklik "Ya", arahkan ke halaman pembayaran.html
      if (result.isConfirmed) {
        window.location.href = 'metodepembayaran.html';
      }
    });
  });

// Event listener untuk button Pembayaran Cicilan
document.getElementById('buttonCicilan').addEventListener('click', function() {
    // Tampilkan SweetAlert dengan opsi konfirmasi
    Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin sudah setuju dengan isi dari pernyataan pada layar Anda? Data yang sudah diinput tidak dapat diubah.',
      icon: 'warning',
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