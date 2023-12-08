// Import function or library
import { UrlGetJalurPendaftaran, UrlGetTahunLulusan } from "../controller/template.js";
import { get } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { setValue, getValue, setInnerText} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.2/croot.js";
import { token } from "../controller/cookies.js";

// let cookielog = getCookie("login");
// if (cookielog === "") {
//     window.location.replace("https://pmb.ulbi.ac.id/");
// }

// Untuk Get Referal
var referral = getCookie("referal")
if (referral === undefined || referral === null || referral === "") {
    setValue("referral", "none");
} else {
    setValue("referral", referral);
}

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

// Event listener untuk tombol "Submit"
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    const tahunLulus = document.getElementById('selecttahunlulus').value;
    const jalurPendaftaran = document.getElementById('selectjalur').value;
    if (!tahunLulus || !jalurPendaftaran) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Semua field harus diisi!',
        });
        return;
    }
    // Add additional validation if needed
    Swal.fire({
        title: 'Submit Jalur Pendaftaran?',
        text: 'Apakah anda yakin ingin submit jalur pendaftaran?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            submitJalurPendaftaran();
        }
    });
});

// Untuk POST Jalur Pendaftaran
// Membuat fungsi untuk mengirimkan data jalur pendaftaran ke API
function submitJalurPendaftaran() {
    // Ambil Tahun Lulus
    const tahunLulus = document.querySelector("#selecttahunlulus");
    const statusLulus = tahunLulus ? tahunLulus.value : "";
    // Ambil Jalur Pendaftaran
    const jalurPendaftaran = document.querySelector("#selectjalur");
    const statusJalur = jalurPendaftaran ? jalurPendaftaran.value : "";
    const referralInput = getValue("referral");
    
    const postData = {
        id_jalur : parseInt(statusJalur),
        tahun_lulus : parseInt(statusLulus),
        kode_ref : referralInput
    };

    fetch(`https://komarbe.ulbi.ac.id/biodata/jalur`, {
        method : "POST",
        headers : header,
        body : JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon : 'success',
                title : 'Sukses!',
                text : 'Jalur pendaftaran berhasil disubmit.',
                showConfirmButton : false,
                timer : 1500
            }).then(() => {
                // // Menangkap data dari respons JSON
                // const jalurPendaftar = data.id_jalur;
                // // Simpan data dalam cookie
                // document.cookie = `id_jalur=${jalurPendaftar}; path=/`;
                window.location.href = 'pilihprodi.html';
            });
        } else {
            Swal.fire({
                icon : 'error',
                title : 'Oops...',
                text : 'Jalur pendaftaran gagal disubmit.'
            })
        }
    })
    .catch(error => {
        console.error("Error saat melakukan POST Data : ", error);
    });
}

// Get Data Cookies
// Get Untuk Data di Navbar dan Form
document.addEventListener("DOMContentLoaded", function() {
    var namaMhs = getCookie('namaMhs');
  
    if (namaMhs) {
        setInnerText('nama_mhs_span', namaMhs);
    }
});

// Jalur Pendaftaran
// Membuat fungsi untuk fetch data ke dropdown jalur
function fetchDataJalur() {
    fetch(UrlGetJalurPendaftaran)
        .then(response => response.json())
        .then(data => {
            populateDropdown(data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Membuat fungsi dropdown jalur pendaftaran
function populateDropdown(data) {
    const selectDropdown = document.getElementById('selectjalur');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Jalur';
    selectDropdown.appendChild(defaultOption);

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id_jalur;
        option.text = item.nama_jalur;
        selectDropdown.appendChild(option);
    });
}
fetchDataJalur();

// Get Tahun Lulusan
function fetchDataTahunLulusan() {
    get(UrlGetTahunLulusan, populateDropdownTahunLulusan);
}
// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownTahunLulusan(data) {
    const selectDropdown = document.getElementById('selecttahunlulus');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Tahun Lulusan';
    selectDropdown.appendChild(defaultOption);

    data.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.tahun;
        option.text = item.tahun;
        selectDropdown.appendChild(option);
    })
}
fetchDataTahunLulusan();