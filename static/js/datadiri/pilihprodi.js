// Import function or library
import { CookieName, UrlGetFakultas, UrlGetProgramStudi, UrlBiodataJalur, TokenHeader } from "../controller/template.js";
import { getWithHeader } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { token } from "../controller/cookies.js";
import { setInnerText } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.2/croot.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

// Untuk POST prodi & fakultas
// Membuat fungsi untuk mengirimkan data pilih prodi ke API
function submitPilihProdi() {
    const prodiSatu = document.querySelector('#selectprog');
    const statusProdiSatu = prodiSatu ? prodiSatu.value : "";
    const prodiKedua = document.querySelector('#selectprog2');
    const statusProdiKedua = prodiKedua ? prodiKedua.value : "";

    const postData = {
        prodi1 : parseInt(statusProdiSatu),
        prodi2 : parseInt(statusProdiKedua),
    };

    fetch(`https://komarbe.ulbi.ac.id/biodata/prodi`, {
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
                text : 'Program studi berhasil disubmit.',
                showConfirmButton : false,
                timer : 1500
            }).then(() => {
                window.location.href = 'biodatadiri.html';
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

// Event listener untuk tombol "submit"
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    const prodiSatu = document.getElementById('selectprog').value;
    const prodiKedua = document.getElementById('selectprog2').value;

    if (!prodiSatu || !prodiKedua) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Semua field harus diisi!',
        });
        return;
    }
    // Add additional validation if needed
    Swal.fire({
        title: 'Submit Program Studi?',
        text: 'Apakah anda yakin ingin submit program studi?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            submitPilihProdi();
        }
    });
})

// Get Data Cookies
// Get Untuk Data di Navbar dan Form
document.addEventListener("DOMContentLoaded", function() {
    var namaMhs = getCookie('namaMhs');
  
    if (namaMhs) {
        setInnerText('nama_mhs_span', namaMhs);
    }
});

// Untuk Get Data Biodata Jalur
let dataJalur;
const setValue = ( res ) =>{
    if (res.data == null){
        return;
    };
    dataJalur = res;
    return
} 
function fetchDataBiodataJalur(){
    getWithHeader(UrlBiodataJalur, TokenHeader, getCookie(CookieName), setValue);
}
fetchDataBiodataJalur();

// Get Program Studi 1
// Membuat fungsi untuk fetch data prodi
function fetchDataProdi1() {
    fetch(UrlGetProgramStudi)
        .then(response => response.json())
        .then(data => {
            populateDropdownProdi1(data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownProdi1(data) {
    const selectDropdown = document.getElementById('selectprog');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Program Studi 1';
    selectDropdown.appendChild(defaultOption);

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.kode_program_studi;
        option.text = item.program_studi;
        selectDropdown.appendChild(option);
    })
}
fetchDataProdi1();

// Get Program Studi 2
// Membuat fungsi untuk fetch data prodi
function fetchDataProdi2() {
    fetch(UrlGetProgramStudi)
        .then(response => response.json())
        .then(data => {
            populateDropdownProdi2(data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownProdi2(data) {
    const selectDropdown = document.getElementById('selectprog2');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Program Studi 2';
    selectDropdown.appendChild(defaultOption);

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.kode_program_studi;
        option.text = item.program_studi;
        selectDropdown.appendChild(option);
    })
}
fetchDataProdi2();
