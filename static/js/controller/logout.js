// Membuat fungsi logout
function logout() {
    // Dapatkan semua cookie yang ada
    var cookies = document.cookie.split(";");

    // Loop melalui setiap cookie dan hapus
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    // Arahkan ke halaman https://pmb.ulbi.ac.id
    window.location.href = "https://pmb.ulbi.ac.id";
}

// Tambahkan event listener untuk mengaitkan fungsi dengan tombol logout
document.getElementById("logoutBtn").addEventListener("click", logout);