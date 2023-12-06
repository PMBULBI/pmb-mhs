// Biodata Orang Tua
// Inputkan untuk No Handphone Ayah
const hpAyahInput = document.getElementById("hpayah");
// Menambahkan event listener untuk memvalidasi input
hpAyahInput.addEventListener("input", function() {
  // Menghapus karakter selain angka dari input
  const sanitizedInput = hpAyahInput.value.replace(/[^0-9]/g, '');
  // Membatasi panjang input menjadi maksimal 13 angka
  if (sanitizedInput.length > 13) {
    hpAyahInput.value = sanitizedInput.slice(0, 13);
  } else {
    hpAyahInput.value = sanitizedInput;
  }
});

// Inputkan untuk No Handphone Ibu
const hpIbuInput = document.getElementById("hpibu");
// Menambahkan event listener untuk memvalidasi input
hpIbuInput.addEventListener("input", function() {
  // Menghapus karakter selain angka dari input
  const sanitizedInput = hpIbuInput.value.replace(/[^0-9]/g, '');
  // Membatasi panjang input menjadi maksimal 13 angka
  if (sanitizedInput.length > 13) {
    hpIbuInput.value = sanitizedInput.slice(0, 13);
  } else {
    hpIbuInput.value = sanitizedInput;
  }
});