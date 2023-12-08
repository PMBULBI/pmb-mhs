function showJalurInput() {
    var selectJalur = document.getElementById("selectjalur");
    var jalurInputArea = document.getElementById("jalurPendaftarNew");

    if (selectJalur.value === "Ikatan Dinas") {
        jalurInputArea.style.display = "none";
    } else {
        jalurInputArea.style.display = "block";
    }
}