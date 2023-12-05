// Membuat fungsi logout
function logout() {
    // Hapus cookie dengan nama "login"
    document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Arahkan ke halaman https://pmb.ulbi.ac.id
    window.location.href = "https://pmb.ulbi.ac.id";
}

// Tambahkan event listener untuk mengaitkan fungsi dengan tombol logout
document.getElementById("logoutBtn").addEventListener("click", logout);