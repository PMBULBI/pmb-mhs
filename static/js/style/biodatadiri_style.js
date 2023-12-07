// Biodata Diri
// Inputkan untuk NIK
const nikInput = document.getElementById("nik");
// Menambahkan event listener untuk memvalidasi input
nikInput.addEventListener("input", function() {
  // Menghapus karakter selain angka dari input
  const sanitizedInput = nikInput.value.replace(/[^0-9]/g, '');
  // Membatasi panjang input menjadi maksimal 16 angka
  if (sanitizedInput.length > 16) {
    nikInput.value = sanitizedInput.slice(0, 16);
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

// Inputkan untuk No Handphone
const kodePosInput = document.getElementById("kodepos");
// Menambahkan event listener untuk memvalidasi input
kodePosInput.addEventListener("input", function() {
  // Menghapus karakter selain angka dari input
  const sanitizedInput = kodePosInput.value.replace(/[^0-9]/g, '');
  // Membatasi panjang input menjadi maksimal 5 angka
  if (sanitizedInput.length > 5) {
    kodePosInput.value = sanitizedInput.slice(0, 5);
  } else {
    kodePosInput.value = sanitizedInput;
  }
});