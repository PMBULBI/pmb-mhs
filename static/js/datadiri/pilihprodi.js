// Import function or library
import { CookieName, UrlGetFakultas, UrlGetProgramStudi, UrlBiodataJalur, TokenHeader ,UrlGetDataPendaftar,UrlGetProdiByJalur, UrlGetBiodataProdiWithToken} from "../controller/template.js";
import { get,postWithToken,getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.2/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { token } from "../controller/cookies.js";
import { setInner,setInnerText,setValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.2/croot.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");


// Jalankan ketia page html sudah di load semua
document.addEventListener('DOMContentLoaded', function() {
    // Get Data dan Simpan di Form ketika sudah isi
    getWithHeader(UrlGetBiodataProdiWithToken, "login", token, inputDataJalur);
}, false);

function inputDataJalur(result) {
    if (result.success) {
        $('#selectprog').val(result.data.prodi2).trigger('change');
        $('#selectprog2').val(result.data.prodi1).trigger('change');
        console.log(result)
    } else {
        console.log(result)
    }
}

// Get Data Cookies
// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetDataPendaftar,"login",token,renderDataPendaftar);
function renderDataPendaftar(result){
  if (result.success){
    setInnerText('nama_mhs_span', result.data.nama_mhs);
  }else{
    window.location.replace("https://pmb.ulbi.ac.id/");
  }
}

//jika ikatan dinas maka judulnya di replace
if(getCookie("jalur2")==="4"){
    console.log("ikatan dinas");
    setInner("pil1","Program Studi Ikatan Dinas*");
    setInner("pil2","Program Studi Jalur Reguler*");
}

// Untuk POST data pilihan prodi
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

// Get Program Studi 1
// Membuat fungsi untuk fetch data prodi
let jalur1={
    "jalur":parseInt(getCookie("jalur2"))
    }
postWithToken(UrlGetProdiByJalur,"login",token,jalur1,populateDropdownProdi1);

// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownProdi1(res) {
    const selectDropdown = document.getElementById('selectprog');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Program Studi 1';
    selectDropdown.appendChild(defaultOption);

    res.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.prodi;
        option.text = item.program_studi;
        selectDropdown.appendChild(option);
    })
}

// Get Program Studi 2
// Membuat fungsi untuk fetch data prodi
let jalurreg2=getCookie("jalurreguler2");
console.log(jalurreg2);
if (jalurreg2){
    let jalur2={
    "jalur":parseInt(jalurreg2)
    }
    postWithToken(UrlGetProdiByJalur,"login",token,jalur2,populateDropdownProdi2);
}else{
    postWithToken(UrlGetProdiByJalur,"login",token,jalur1,populateDropdownProdi2);   
}

// Membuat fungsi dropdown jalur pendaftaran
function populateDropdownProdi2(res) {
    const selectDropdown = document.getElementById('selectprog2');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Program Studi 2';
    selectDropdown.appendChild(defaultOption);

    res.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.prodi;
        option.text = item.program_studi;
        selectDropdown.appendChild(option);
    })
}

