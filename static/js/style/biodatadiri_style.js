// Biodata Diri
// Inputkan untuk NIK
const nikInput = document.getElementById("nik");
// Menambahkan event listener untuk memvalidasi input
nikInput.addEventListener("input", function() {
  // Menghapus karakter selain angka dari input
  const sanitizedInput = nikInput.value.replace(/[^0-9]/g, '');
  // Membatasi panjang input menjadi maksimal 13 angka
  if (sanitizedInput.length > 13) {
    nikInput.value = sanitizedInput.slice(0, 13);
  } else {
    nikInput.value = sanitizedInput;
  }
});

// Inputkan untuk No Handphone
const noHpInput = document.getElementById("hp");
// Menambahkan event listener untuk memvalidasi input
noHpInput.addEventListener("input", function() {
  // Menghapus karakter selain angka dari input
  const sanitizedInput = noHpInput.value.replace(/[^0-9]/g, '');
  // Membatasi panjang input menjadi maksimal 13 angka
  if (sanitizedInput.length > 13) {
    noHpInput.value = sanitizedInput.slice(0, 13);
  } else {
    noHpInput.value = sanitizedInput;
  }
});