// Seleksi jalur untuk form ikatan dinas 
function showHideForm() {
    var selectedValue = document.getElementById("selectjalur").value;
    var formInput = document.getElementById("jalurPendaftarNew");

    // Tampilkan form input jika opsi "Ikatan Dinas" dipilih, sembunyikan jika opsi lainnya dipilih
    formInput.style.display = (selectedValue === "Ikatan Dinas") ? "block" : "none";
}