import { UrlGetKelurahan, UrlGetKecamatan, UrlGetKota, UrlGetProvinsi, UrlPostDataOrtu, UrlPostDataSekolah, UrlPostDatadiri } from "./template.js";
import { get } from "https://jscroot.github.io/api/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { token } from "./cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

// Get Data Kelurahan JSCroot
function fetchDataKelurahan() {
    get(UrlGetKelurahan, populateDropdownKelurahan);
}
// Membuat fungsi dropdown data kelurahan
function populateDropdownKelurahan(data) {
    const selectDropdown = document.getElementById('selectkec');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Kelurahan';
    selectDropdown.appendChild(defaultOption);

    data.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.nama_kelurahan;
        option.text = item.nama_kelurahan;
        selectDropdown.appendChild(option);
    })
}
fetchDataKelurahan();

// Get Data Kecamatan JSCroot
function fetchDataKecamatan() {
    get(UrlGetKecamatan, populateDropdownKecamatan);
}
// Membuat fungsi dropdown data kecamatan
function populateDropdownKecamatan(data) {
    const selectDropdown = document.getElementById('selectkec');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Kecamatan';
    selectDropdown.appendChild(defaultOption);

    data.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.nama_kecamatan;
        option.text = item.nama_kecamatan;
        selectDropdown.appendChild(option);
    })
}
fetchDataKecamatan();

// Get Data Provinsi JSCroot
function fetchDataProvinsi() {
    get(UrlGetProvinsi, populateDropdownProvinsi);
}
// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownProvinsi(data) {
    const selectDropdown = document.getElementById('selectprov');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Provinsi';
    selectDropdown.appendChild(defaultOption);

    data.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.nama_provinsi;
        option.text = item.nama_provinsi;
        selectDropdown.appendChild(option);
    })
}
fetchDataProvinsi();


function fetchDataKota() {
    get(UrlGetKota, populateDropdownKota);
}
// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownKota(data) {
    const selectDropdown = document.getElementById('selectkota');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Kota';
    selectDropdown.appendChild(defaultOption);

    data.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.nama_kota;
        option.text = item.nama_kota;
        selectDropdown.appendChild(option);
    })
}
fetchDataKota();

// Untuk POST prodi & fakultas
// Membuat fungsi untuk mengirimkan data pilih prodi ke API
function SubmitBiodataOrtu() {
    const nisn = getValue('nisn');
    const asal_jurusan = getValue('jurusan');
    const asal_sekolah = "SMA";
    const alamat = getValue('alamat');
    const provinsi_sekolah = getValue('selectprov');
    const kota_sekolah = getValue('selectkota');
    const kode_pos_sekolah = getValue('kodepos');
    const jenis_sekolah = getValue('selectjenis');
    // const jurusan = getValue('jurusan');
    const akreditasi_sekolah = getValue('akred');
    const tahun_lulus = getValue('tahun');

    const studentData = {
        "nisn": nisn,
        "asal_jurusan": asal_jurusan,
        "asal_sekolah": asal_sekolah,
        "alamat_sekolah": alamat,
        "provinsi_sekolah": provinsi_sekolah,
        "kota_sekolah": kota_sekolah,
        "kode_pos_sekolah": kode_pos_sekolah,
        "jenis_sekolah": jenis_sekolah,
        "jurusan": "jurusan",
        "akreditasi_sekolah": akreditasi_sekolah,
        "tahun_lulus": parseInt(tahun_lulus),
        "guru_bk": "Nama BK",
        "hp_guru_bk": "0981381283122"
    };
    
    // Now 'studentData' is a constant containing the given JSON object
    console.log(studentData);
    

    fetch(UrlPostDataSekolah, {
        method : "POST",
        headers : header,
        body : JSON.stringify(studentData)
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
                window.location.href = 'persyaratan.html';
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
    // const provinsi = getValue('selectprovince');
    // const religion = getValue('selectreligion');
    // const kotakab = getValue('selectkotakab');

    // if (!provinsi || !religion || !kotakab ) {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Oops...',
    //         text: 'Semua field harus diisi!',
    //     });
    //     return;
    // }
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
            SubmitBiodataOrtu();
        }
    });
});