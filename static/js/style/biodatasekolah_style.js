// Inputkan untuk NISN
const nisnInput = document.getElementById("nisn");
// Menambahkan event listener untuk memvalidasi input
nisnInput.addEventListener("input", function() {
  // Menghapus karakter selain angka dari input
  const sanitizedInput = nisnInput.value.replace(/[^0-9]/g, '');
  // Membatasi panjang input menjadi maksimal 10 angka
  if (sanitizedInput.length > 10) {
    nisnInput.value = sanitizedInput.slice(0, 10);
  } else {
    nisnInput.value = sanitizedInput;
  }
});

// Inputkan untuk Kode Pos
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