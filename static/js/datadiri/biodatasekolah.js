
import { UrlGetKecamatanByIdKotaNmKec, UrlGetKelurahanByIdKecNmKel, UrlGetTahunLulusan, UrlGetKotaByIdProvNmKota, UrlGetProvinsi, UrlPostDataSekolah, UrlGetJenisSekolah, UrlGetAsalJurusan,UrlGetDataPendaftar, UrlGetBiodataSekolahWithToken, UrlGetBiodataJalurWithToken } from "../controller/template.js";
import { CihuyPost, CihuyGet } from "https://c-craftjs.github.io/api/api.js";
import { getValue, setValue, setInnerText } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.2/croot.js";
import {get,getWithHeader} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { token } from "../controller/cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

// Get Data dan Simpan di Form ketika sudah isi
await getWithHeader(UrlGetBiodataSekolahWithToken, "login", token, inputDataSekolah);

async function inputDataSekolah(result) {
    if (result.success) {
        await setValue('selectjenis', result.data.jenis_sekolah);
        await setValue('selectjurusan', result.data.asal_jurusan);
        await setValue('tahun', result.data.tahun_lulus);
        setValue('nisn', result.data.nisn);
        setValue('alamat', result.data.alamat_sekolah);
        setValue('provinsi-biodata', result.data.provinsi_sekolah);
        setValue('kota-biodata', result.data.kota_sekolah);
        setValue('kecamatan-biodata', result.data.kecamatan_sekolah);
        setValue('kelurahan-biodata', result.data.kelurahan_sekolah);
        setValue('kodepos', result.data.kode_pos_sekolah);
        console.log(result)
    } else {
        console.log(result)
    }
}

// Get Data dan Simpan di Form ketika sudah isi
await getWithHeader(UrlGetBiodataJalurWithToken, "login", token, inputTahunLulus);

async function inputTahunLulus(result) {
  if (result.success) {
    setValue('tahun', result.data.tahun_lulus);
  }
}

// Get Data Cookies
// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetDataPendaftar,"login",token,renderDataPendaftar);
function renderDataPendaftar(result){
  if (result.success){
    setValue('akred', result.data.asal_sekolah);
    setInnerText('nama_mhs_span', result.data.nama_mhs);
  }
  // else{
  //   window.location.replace("https://pmb.ulbi.ac.id/");
  // }
}

// Untuk POST prodi & fakultas
// Membuat fungsi untuk mengirimkan data pilih prodi ke API
function SubmitBiodataOrtu() {
  const nisn = getValue('nisn');
  const asal_jurusan = getValue('selectjurusan');
  const asal_sekolah = "SMA";
  const alamat = getValue('alamat');
  const provinsi_sekolah = getValue('provinsi-biodata');
  const kota_sekolah = getValue('kota-biodata');
  const kecamatan = getValue('kecamatan-biodata');
  const kelurahan = getValue('kelurahan-biodata');
  const kode_pos_sekolah = getValue('kodepos');
  const jenis_sekolah = getValue('selectjenis');
  const akreditasi_sekolah = getValue('akred');
  const tahun_lulus = getValue('tahun');

  const studentData = {
      "nisn": nisn,
      "asal_jurusan": asal_jurusan,
      "asal_sekolah": asal_sekolah,
      "alamat_sekolah": alamat,
      "provinsi_sekolah": provinsi_sekolah,
      "kota_sekolah": kota_sekolah,
      "kecamatan_sekolah": kecamatan,
      "kelurahan_sekolah": kelurahan,
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
              text : 'Biodata sekolah berhasil disubmit.',
              showConfirmButton : false,
              timer : 1500
          }).then(() => {
              window.location.href = 'https://pmb.ulbi.ac.id/pmb-mhs/persyaratan/';
          });
      } else {
          Swal.fire({
              icon : 'error',
              title : 'Oops...',
              text : 'Biodata sekolah gagal disubmit.'
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
  const nisn = getValue('nisn');
  const namasekolah = getValue('akred');
  const jenissekolah = getValue('selectjenis');
  const jurusan = getValue('selectjurusan');
  const tahunlulus = getValue('tahun');
  const alamatsekolah = getValue('alamat');
  const provinsi = getValue('provinsi-biodata');
  const kota = getValue('kota-biodata');
  const kodepos = getValue('kodepos');

  if (!nisn || !namasekolah || !jenissekolah || !jurusan || !tahunlulus || !alamatsekolah || !provinsi || !kota || !kodepos ) {
      Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Semua field harus diisi!',
      });
      return;
  }
  // Add additional validation if needed
  Swal.fire({
      title: 'Submit Biodata Sekolah?',
      text: 'Apakah anda yakin ingin submit biodata sekolah?',
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

// Get Pekerjaan Jenis Sekolah
function fecthDataJenisSekolah() {
  get(UrlGetJenisSekolah, populateDropdownJenisSekolah);
}
// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownJenisSekolah(data) {
  const selectDropdown = document.getElementById('selectjenis');
  selectDropdown.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = 'Pilih Jenis Sekolah';
  selectDropdown.appendChild(defaultOption);

  data.data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.nama_jenis_sekolah;
      option.text = item.nama_jenis_sekolah;
      selectDropdown.appendChild(option);
  })
}
fecthDataJenisSekolah();
console.log(fecthDataJenisSekolah);

// Get Pekerjaan Asal Jurusan
function fecthDataAsalJurusan() {
  get(UrlGetAsalJurusan, populateDropdownAsalJurusan);
}
// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownAsalJurusan(data) {
  const selectDropdown = document.getElementById('selectjurusan');
  selectDropdown.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = 'Pilih Asal Jurusan';
  selectDropdown.appendChild(defaultOption);

  data.data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.nama_jurusan;
      option.text = item.nama_jurusan;
      selectDropdown.appendChild(option);
  })
}
fecthDataAsalJurusan();
console.log(fecthDataAsalJurusan);

// Get Data Provinsi Untuk Dropdown
// Buat variabel untuk get id element
const provinsiAsalsuggestion = document.getElementById('provinsi-suggestions'); // Perubahan di sini
const inputProvinsiAsal = document.getElementById("provinsi-biodata");
let selectedProvinsiId;

// Membuat Listener untuk suggestions
inputProvinsiAsal.addEventListener("input", async () => {
  const provinsiAsalValue = inputProvinsiAsal.value;
  const body = {
    nama_provinsi: provinsiAsalValue
  };
  try {
    const inputValue = inputProvinsiAsal.value.trim(); // Mendapatkan nilai input dan menghapus spasi
    if (inputValue === '') {
      provinsiAsalsuggestion.innerHTML = ''; // Kosongkan saran jika input kosong
      provinsiAsalsuggestion.style.display = 'none'; // Sembunyikan daftar saran
      inputKotaAsal.disabled = true;
    } else if (inputValue.length < 2) {
      provinsiAsalsuggestion.textContent = 'Masukkan setidaknya 2 karakter';
      provinsiAsalsuggestion.style.display = 'block';
    } else {
      const data = await CihuyPost(UrlGetProvinsi, body);
      // Untuk Cek di console
      console.log("Data yang diterima setelah POST:", data);
      if (data.success == false) {
        // Tampilkan pesan kesalahan
        provinsiAsalsuggestion.textContent = data.status;
        provinsiAsalsuggestion.style.display = 'block';
      } else {
        // provinsiAsalsuggestion.textContent = JSON.stringify(data);
        provinsiAsalsuggestion.textContent = '';
        const provinceNames = data.data.map(provinsi => provinsi.nama_provinsi);
        provinsiAsalsuggestion.innerHTML = "";
        provinceNames.forEach(provinceNames => {
          const elementProvinsi = document.createElement("div");
          elementProvinsi.className = "provinsi"
          elementProvinsi.textContent = provinceNames;
          const selectedProvinsi = data.data.find(provinsi => provinsi.nama_provinsi === provinceNames);
          if (selectedProvinsi) {
            elementProvinsi.addEventListener("click", () => {
              inputProvinsiAsal.value = provinceNames;
              provinsiAsalsuggestion.innerHTML = "";
              selectedProvinsiId = selectedProvinsi.id_provinsi; // Menyimpan ID provinsi yang dipilih
              inputKotaAsal.disabled = false;
            });
          }
          provinsiAsalsuggestion.appendChild(elementProvinsi);
          if (provinceNames.length > 0) {
            provinsiAsalsuggestion.style.display = "block";
          } else {
            provinsiAsalsuggestion.style.display = "none";
          }
        })
      }
      provinsiAsalsuggestion.classList.add('dropdown');
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan GET:", error);
  }
})

// Get Data Kota Untuk Dropdown
// Buat variabel untuk get id element
const kotaAsalsuggestion = document.getElementById('kota-suggestions')
const inputKotaAsal = document.getElementById("kota-biodata");
let selectedKotaId;

// Membuat Listener untuk suggestions
inputKotaAsal.addEventListener("input", async () => {
  try {
    const inputValue = inputKotaAsal.value.trim(); // Mendapatkan nilai input dan menghapus spasi
    if (inputValue === '') {
      kotaAsalsuggestion.innerHTML = ''; // Kosongkan saran jika input kosong
      kotaAsalsuggestion.style.display = 'none'; // Sembunyikan daftar saran
    } else if (inputValue.length < 3) {
      kotaAsalsuggestion.textContent = 'Masukkan setidaknya 3 karakter';
      kotaAsalsuggestion.style.display = 'block';
    } else {
      const body = {
        id_provinsi: selectedProvinsiId, // Menggunakan ID provinsi yang dipilih
        nama_kota: inputValue
      };
      const data = await CihuyPost(UrlGetKotaByIdProvNmKota, body);
      // Untuk Cek di console
      console.log("Data yang diterima setelah GET:", data);
      if (data.success == false) {
        // Tampilkan pesan kesalahan
        kotaAsalsuggestion.textContent = data.status;
        kotaAsalsuggestion.style.display = 'block';
      } else {
        // kotaAsalsuggestion.textContent = JSON.stringify(data);
        kotaAsalsuggestion.textContent = '';
        const cityNames = data.data.map(kota => kota.nama_kota);
        kotaAsalsuggestion.innerHTML = "";
        cityNames.forEach(cityNames => {
          const elementKota = document.createElement("div");
          elementKota.className = "kota"
          elementKota.textContent = cityNames;
          const selectedKota = data.data.find(kota => kota.nama_kota === cityNames);
          if (selectedKota) {
            elementKota.addEventListener("click", () => {
              inputKotaAsal.value = cityNames;
              kotaAsalsuggestion.innerHTML = "";
              selectedKotaId = selectedKota.id_kota; // Menyimpan ID provinsi yang dipilih
              inputKotaAsal.disabled = false;
            });
          }
          kotaAsalsuggestion.appendChild(elementKota);
          if (cityNames.length > 0) {
            kotaAsalsuggestion.style.display = "block";
          } else {
            kotaAsalsuggestion.style.display = "none";
          }
        })
      }
      kotaAsalsuggestion.classList.add('dropdown');
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan GET:", error);
  }
})

// Get Data Kecamatan Untuk Dropdown
// Buat variabel untuk get id element
const kecamatanSuggestion = document.getElementById('kecamatan-suggestions');
const inputKecamatan = document.getElementById("kecamatan-biodata");
let selectedKecamatanId;

// Listener untuk suggestion
inputKecamatan.addEventListener("input", async () => {
  const kecamatanValue = inputKecamatan.value;
  const body = {
    nama_kecamatan: kecamatanValue,
    id_kota: selectedKotaId  // Pass the selected kota ID when fetching kecamatan
  };

  try {
    const inputValue = inputKecamatan.value.trim();

    if (inputValue === '') {
      kecamatanSuggestion.innerHTML = '';
      kecamatanSuggestion.style.display = 'none';
      inputKecamatan.disabled = false;
    } else if (inputValue.length < 2) {
      kecamatanSuggestion.textContent = 'Masukkan setidaknya 2 karakter';
      kecamatanSuggestion.style.display = 'block';
    } else {
      const data = await CihuyPost(UrlGetKecamatanByIdKotaNmKec, body);

      if (data.success == false) {
        kecamatanSuggestion.textContent = data.status;
        kecamatanSuggestion.style.display = 'block';
      } else {
        kecamatanSuggestion.textContent = '';
        const kecamatanNames = data.data.map(kecamatan => kecamatan.nama_kecamatan);
        kecamatanSuggestion.innerHTML = "";

        kecamatanNames.forEach(kecamatanNames => {
          const elementKecamatan = document.createElement("div");
          elementKecamatan.className = "kecamatan";
          elementKecamatan.textContent = kecamatanNames;

          const selectedKecamatan = data.data.find(kecamatan => kecamatan.nama_kecamatan === kecamatanNames);
          if (selectedKecamatan) {
            elementKecamatan.addEventListener("click", () => {
              inputKecamatan.value = kecamatanNames;
              kecamatanSuggestion.innerHTML = "";
              selectedKecamatanId = selectedKecamatan.id_kecamatan;
              inputKecamatan.disabled = false;
            });
          }

          kecamatanSuggestion.appendChild(elementKecamatan);

          if (kecamatanNames.length > 0) {
            kecamatanSuggestion.style.display = "block";
          } else {
            kecamatanSuggestion.style.display = "none";
          }
        });
      }

      kecamatanSuggestion.classList.add('dropdown');
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan GET:", error);
  }
});

// Get Data Kelurahan di Form
// Membuat Variabel untuk mendapatkan id element
const kelurahanSuggestion = document.getElementById('kelurahan-suggestions');
const inputKelurahan = document.getElementById("kelurahan-biodata");
// Membuat Listener untuk suggestions
inputKelurahan.addEventListener("input", async () => {
    try {
      const inputValue = inputKelurahan.value.trim(); // Mendapatkan nilai input dan menghapus spasi
      if (inputValue === '') {
        kelurahanSuggestion.innerHTML = ''; // Kosongkan saran jika input kosong
        kelurahanSuggestion.style.display = 'none'; // Sembunyikan daftar saran
      } else if (inputValue.length < 3) {
        kelurahanSuggestion.textContent = 'Masukkan setidaknya 3 karakter';
        kelurahanSuggestion.style.display = 'block';
      } else {
        const body = {
          id_kecamatan: selectedKecamatanId, // Menggunakan ID kecamatan yang dipilih
          nama_kelurahan: inputValue
        };
        const data = await CihuyPost(UrlGetKelurahanByIdKecNmKel, body);
        // Untuk Cek di console
        console.log("Data yang diterima setelah GET:", data);
        if (data.success === false) { // Mengganti operator equality
          // Tampilkan pesan kesalahan
          kelurahanSuggestion.textContent = data.status;
          kelurahanSuggestion.style.display = 'block';
        } else {
          // kelurahanSuggestion.textContent = JSON.stringify(data);
          kelurahanSuggestion.textContent = '';
          const kelurahanNames = data.data.map(kelurahan => kelurahan.nama_kelurahan);
          kelurahanSuggestion.innerHTML = "";
          kelurahanNames.forEach(kelurahanName => {
            const elementKelurahan = document.createElement("div");
            elementKelurahan.className = "kelurahan";
            elementKelurahan.textContent = kelurahanName;
            elementKelurahan.addEventListener("click", () => {
              inputKelurahan.value = kelurahanName;
              kelurahanSuggestion.innerHTML = "";
            });
            kelurahanSuggestion.appendChild(elementKelurahan);
          });
          if (kelurahanNames.length > 0) {
            kelurahanSuggestion.style.display = "block";
          } else {
            kelurahanSuggestion.style.display = "none";
          }
        }
        kelurahanSuggestion.classList.add('dropdown');
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan GET:", error);
    }
  });
