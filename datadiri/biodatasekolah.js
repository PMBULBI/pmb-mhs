import { UrlGetKelurahan, UrlGetKecamatan, UrlGetKota, UrlGetProvinsi, UrlPostDataOrtu, UrlPostDataSekolah, UrlPostDatadiri } from "../static/js/controller/template.js";
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

// Get Data Provinsi Untuk Dropdown
// Buat variabel untuk get id element
const provinsiSuggestion = document.getElementById('provinsi-suggestions');
const inputProvinsi = document.getElementById("provinsi-biodata");
let selectedProvinsiId;

// Listener untuk suggestion
inputProvinsi.addEventListener("input", async () => {
  const provinsiValue = inputProvinsi.value;
  const body = {
    nama_provinsi: provinsiValue
  };

  try {
    const inputValue = inputProvinsi.value.trim();

    if (inputValue === '') {
      provinsiSuggestion.innerHTML = '';
      provinsiSuggestion.style.display = 'none';
      inputProvinsi.disabled = false;
    } else if (inputValue.length < 2) {
      provinsiSuggestion.textContent = 'Masukkan setidaknya 2 karakter';
      provinsiSuggestion.style.display = 'block';
    } else {
      const data = await CihuyPost(UrlGetProvinsi, body);

      if (data.success == false) {
        provinsiSuggestion.textContent = data.status;
        provinsiSuggestion.style.display = 'block';
      } else {
        provinsiSuggestion.textContent = '';
        const provinceNames = data.data.map(provinsi => provinsi.nama_provinsi);
        provinsiSuggestion.innerHTML = "";

        provinceNames.forEach(provinceNames => {
          const elementProvinsi = document.createElement("div");
          elementProvinsi.className = "provinsi";
          elementProvinsi.textContent = provinceNames;

          const selectedProvinsi = data.data.find(provinsi => provinsi.nama_provinsi === provinceNames);
          if (selectedProvinsi) {
            elementProvinsi.addEventListener("click", () => {
              inputProvinsi.value = provinceNames;  // Mengatur nilai input saat suggestion di klik
              provinsiSuggestion.innerHTML = "";
              selectedProvinsiId = selectedProvinsi.id_provinsi; // Menyimpan ID provinsi yang dipilih
              inputProvinsi.disabled = false;
            });
          }

          provinsiSuggestion.appendChild(elementProvinsi);

          if (provinceNames.length > 0) {
            provinsiSuggestion.style.display = "block";
          } else {
            provinsiSuggestion.style.display = "none";
          }
        });
      }

      provinsiSuggestion.classList.add('dropdown');
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan GET:", error);
  }
});

// Get Data Kota Untuk Dropdown
// Buat variabel untuk get id element
const kotaSuggestion = document.getElementById('kota-suggestions');
const inputKota = document.getElementById("kota-biodata");
let selectedKecamatanId;

// Listener untuk suggestion
inputKota.addEventListener("input", async () => {
  const kotaValue = inputKota.value;
  const body = {
    nama_kota: kotaValue
  };

  try {
    const inputValue = inputKota.value.trim();

    if (inputValue === '') {
      kotaSuggestion.innerHTML = '';
      kotaSuggestion.style.display = 'none';
      inputKota.disabled = false;
    } else if (inputValue.length < 2) {
      kotaSuggestion.textContent = 'Masukkan setidaknya 2 karakter';
      kotaSuggestion.style.display = 'block';
    } else {
      const data = await CihuyPost(UrlGetKotaByIdProvNmKota, body);

      if (data.success == false) {
        kotaSuggestion.textContent = data.status;
        kotaSuggestion.style.display = 'block';
      } else {
        kotaSuggestion.textContent = '';
        const kotaNames = data.data.map(kota => kota.nama_kota);
        kotaSuggestion.innerHTML = "";

        kotaNames.forEach(kotaNames => {
          const elementKota = document.createElement("div");
          elementKota.className = "kota";
          elementKota.textContent = kotaNames;

          const selectedKota = data.data.find(kota => kota.nama_kota === kotaNames);
          if (selectedKota) {
            elementKota.addEventListener("click", () => {
              inputKota.value = kotaNames;  // Mengatur nilai input saat suggestion di klik
              kotaSuggestion.innerHTML = "";
              selectedKecamatanId = selectedKota.id_kota; // Menyimpan ID provinsi yang dipilih
              inputKota.disabled = false;
            });
          }

          kotaSuggestion.appendChild(elementKota);

          if (kotaNames.length > 0) {
            kotaSuggestion.style.display = "block";
          } else {
            kotaSuggestion.style.display = "none";
          }
        });
      }

      kotaSuggestion.classList.add('dropdown');
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan GET:", error);
  }
});

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