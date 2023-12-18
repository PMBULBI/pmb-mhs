// Import function or library
import { UrlGetJalurPendaftaran, UrlGetTahunLulusan,UrlGetJalurByTahun,UrlGetDataPendaftar, UrlGetBiodataJalurWithToken } from "../controller/template.js";
import { get, postWithToken, getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.2/croot.js";
import { getCookie, setCookieWithExpireHour } from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import { setValue, getValue, setInnerText, show, hide, getTextSelect} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.8/croot.js";
import { token } from "../controller/cookies.js";


// Get Untuk Data di Navbar dan 
export function renderDataPendaftarforNavbar(result){
    if (result.success){
      setInnerText('nama_mhs_span', result.data.nama_mhs);
    }else{
      window.location.replace("https://pmb.ulbi.ac.id/");
    }
}

export async function renderDataJalurFromDB(result) {
    if (result.success) {
        //await setValue('selecttahunlulus', result.data.tahun_lulus);
        await $('#selecttahunlulus').val(result.data.tahun_lulus).trigger('change');
        let tahunllulus={
            "tahun":parseInt(result.data.tahun_lulus)
            }
        await postWithToken(UrlGetJalurByTahun,"login",token,tahunllulus,populateDropdown);
        await setCookieWithExpireHour("jalur2",result.data.id_jalur,16);
    }
}

export function setRefferal() {
    var referral = getCookie("referal");
    if (referral === undefined || referral === null || referral === "") {
        setValue("referral", "none");
    } else {
        setValue("referral", referral);
    }
}


export function onChangeTahunLulus(sel) {
    let thnstr=sel.options[sel.selectedIndex].text;
    
    let tahunllulus={
    "tahun":parseInt(thnstr)
    }
    postWithToken(UrlGetJalurByTahun,"login",token,tahunllulus,populateDropdown);
    setCookieWithExpireHour("lulusantahun",thnstr,16);
    console.log(thnstr);
}

export function onChangeSelectJalur(sel) {
    let thn=getCookie("lulusantahun");
    let tahunllulus={
    "tahun":parseInt(thn)
    }
    
    let pilihan=parseInt(sel.options[sel.selectedIndex].value);
    console.log(sel.options[sel.selectedIndex].value);
    console.log("onChangeSelectJalur");
    if (pilihan ===4){
        show("jalur2");
        postWithToken(UrlGetJalurByTahun,"login",token,tahunllulus,populateDropdown2);
    } else{
        hide("jalur2");
    }
    setCookieWithExpireHour("jalur2",sel.options[sel.selectedIndex].value,16);
    
}

export function onChangeSelectJalurByPilihan(pilihan) {
    let thn=getCookie("lulusantahun");
    let tahunllulus={
    "tahun":parseInt(thn)
    }
    console.log("masuk ke dalam onChangeSelectJalurByPilihan");
    console.log(pilihan);
    if (pilihan === "4"){
        show("jalur2");
        postWithToken(UrlGetJalurByTahun,"login",token,tahunllulus,populateDropdown2);
    } else{
        hide("jalur2");
    }
    setCookieWithExpireHour("jalur2",pilihan,16);
    
}

// Event listener untuk tombol "Submit"
export function onClickSubmitButton() {
    const tahunLulus = getValue('selecttahunlulus');
    const jalurPendaftaran = getValue('selectjalur');
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
}

// Untuk POST Jalur Pendaftaran
// Membuat fungsi untuk mengirimkan data jalur pendaftaran ke API
export function submitJalurPendaftaran() {
    // Ambil Tahun Lulus
    const tahunLulus = getValue('selecttahunlulus');
    // Ambil Jalur Pendaftaran
    const jalurPendaftaran = getValue('selectjalur');
    const referralInput = getValue("referral");
    // jika ambil jalur ikatan dinas simpan cookies untuk langkah selanjutnya
    let jalurPendaftaran2 ="";
    if (parseInt(statusJalur) === 4){
        jalurPendaftaran2 = getValue('selectjalur2');
        setCookieWithExpireHour("jalurreguler2",statusJalur2,16);
    }
    var header = new Headers();
    header.append("login", token);
    header.append("Content-Type", "application/json");
    const postData = {
        id_jalur : parseInt(jalurPendaftaran),
        tahun_lulus : parseInt(tahunLulus),
        id_jalur2: parseInt(jalurPendaftaran2),
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
                text : data.status
            })
        }
    })
    .catch(error => {
        console.error("Error saat melakukan POST Data : ", error);
    });
}


// Jalur Pendaftaran
// Membuat fungsi untuk fetch data ke dropdown jalur

// Membuat fungsi dropdown jalur pendaftaran
export function populateDropdown(response) {
    const selectDropdown = document.getElementById('selectjalur');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Jalur';
    selectDropdown.appendChild(defaultOption);

    response.data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id_jalur;
        option.text = item.nama_jalur;
        selectDropdown.appendChild(option);
    });
}
export function populateDropdown2(response) {
    const selectDropdown = document.getElementById('selectjalur2');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Jalur';
    selectDropdown.appendChild(defaultOption);

    response.data.forEach(item => {
        if (item.id_jalur!==4){
            const option = document.createElement('option');
            option.value = item.id_jalur;
            option.text = item.nama_jalur;
            selectDropdown.appendChild(option);
        }
    });
}

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