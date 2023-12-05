import { UrlGetKelurahan, UrlGetKecamatan, UrlGetKota, UrlGetProvinsi, UrlPostDatadiri } from "../static/js/controller/template.js";
import { get } from "https://jscroot.github.io/api/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { token } from "../static/js/controller/cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

// Get Data untuk Navbar
document.addEventListener("DOMContentLoaded", function() {
    // Ambil nilai dari cookie dengan nama 'namaMhs'
    var namaMhsCookie = getCookieData('namaMhs');
    // Cek apakah cookie ada
    if (namaMhsCookie) {
        // Set nilai cookie ke dalam elemen dengan ID 'nama_mhs_span'
        document.getElementById('nama_mhs_span').innerText = namaMhsCookie;
    }
});
// Fungsi untuk mendapatkan nilai cookie berdasarkan nama
function getCookieData(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Get Data Kelurahan JSCroot
function fetchDataKelurahan() {
    get(UrlGetKelurahan, populateDropdownKelurahan);
}
// Membuat fungsi dropdown data kelurahan
function populateDropdownKelurahan(data) {
    const selectDropdown = document.getElementById('selectkel');
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
console.log(fetchDataKelurahan);

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
console.log(fetchDataKecamatan);

// Get Data Provinsi JSCroot
function fetchDataProvinsi() {
    get(UrlGetProvinsi, populateDropdownProvinsi);
}
// Membuat fungsi dropdown data provinsi
function populateDropdownProvinsi(data) {
    const selectDropdown = document.getElementById('selectprovince');
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
console.log(fetchDataProvinsi);

// Get Data Kota JSCroot
function fetchDataKota() {
    get(UrlGetKota, populateDropdownKota);
}
// Membuat fungsi dropdown data kota
function populateDropdownKota(data) {
    const selectDropdown = document.getElementById('selectkotakab');
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
console.log(fetchDataKota);

// Untuk POST prodi & fakultas
// Membuat fungsi untuk mengirimkan data pilih prodi ke API
function SubmitBiodatadiri() {
    const provinsi = getValue('selectprovince');
    const religion = getValue('selectreligion');
    const kotakab = getValue('selectkotakab');
    const nik = getValue('nik');
    const tanggal_lahir = getValue('date');
    const tempat_lahir = getValue('tempat');
    const alamat = getValue('alamat');
    const kecamatan = getValue('kecamatan');
    const kelurahan = getValue('kelurahan');
    const kodepos = getValue('kodepos');

    const myData = {
        "jenis_kelamin": getRadioValue(),
        "nik": nik,
        "tanggal_lahir": tanggal_lahir,
        "tempat_lahir": tempat_lahir,
        "agama": religion,
        "alamat": alamat,
        "provinsi": provinsi,
        "kota": kotakab,
        "kecamatan": kecamatan,
        "kelurahan": kelurahan,
        "kode_pos": kodepos
    };
    
    // Now 'myData' is a constant containing the given JSON object
    console.log(myData);
    

    fetch(UrlPostDatadiri, {
        method : "POST",
        headers : header,
        body : JSON.stringify(myData)
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
                window.location.href = 'biodataorangtua.html';
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
    const provinsi = getValue('selectprovince');
    const religion = getValue('selectreligion');
    const kotakab = getValue('selectkotakab');

    if (!provinsi || !religion || !kotakab ) {
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
            SubmitBiodatadiri();
        }
    });
});


function getRadioValue() {
    // Use document.querySelector to get the selected radio button
    const selectedRadioButton = document.querySelector('input[name="basicradios"]:checked');

    // Check if a radio button is selected
    if (selectedRadioButton) {
      // Access the value property to get the selected value
      const selectedValue = selectedRadioButton.value;

      // Log or use the selected value as needed
      console.log(selectedValue);
    } else {
      // Handle the case where no radio button is selected
      console.log("No radio button selected");
    }
  }