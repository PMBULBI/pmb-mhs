// Import function or library
import { UrlGetJalurPendaftaran } from "../static/js/controller/template.js";
import {getCookie} from "https://jscroot.github.io/cookie/croot.js";
import { token } from "../static/js/controller/cookies.js";

let cookielog = getCookie("login");
if (cookielog === "") {
    window.location.replace("https://pmb.ulbi.ac.id/");
}

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

let referal = getCookie("referal");

// Jalur Pendaftaran
// Membuat fungsi untuk fetch data ke dropdown jalur
function fetchData() {
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
fetchData();

// Untuk POST Jalur Pendaftaran
// Membuat fungsi untuk mengirimkan data jalur pendaftaran ke API
function submitJalurPendaftaran() {
    // Ambil Tahun Lulus
    const tahunLulus = document.querySelector("#selecttahunlulus");
    const statusLulus = tahunLulus ? tahunLulus.value : "";
    // Ambil Jalur Pendaftaran
    const jalurPendaftaran = document.querySelector("#selectjalur");
    const statusJalur = jalurPendaftaran ? jalurPendaftaran.value : "";
    const referralInput = document.querySelector("#referral");
    
    const postData = {
        id_jalur : parseInt(statusJalur),
        tahun_lulus : parseInt(statusLulus),
        kode_ref : referal
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

// Event listener untuk tombol "Submit"
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    const tahunLulus = document.getElementById('selecttahunlulus').value;
    const jalurPendaftaran = document.getElementById('selectjalur').value;
    const referralInput = document.getElementById('referral').value;

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