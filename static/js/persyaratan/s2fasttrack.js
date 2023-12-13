import { UrlGetDataPendaftar,UrlFileServicePost,UrlFileServiceMerge } from "../controller/template.js";
import { getValue, setValue, setInnerText, getValueRadio } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { getWithHeader,postFileWithHeader,postWithToken } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.2/croot.js";
import { token } from "../controller/cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetDataPendaftar,"login",token,renderDataPendaftar);
function renderDataPendaftar(result){
  if (result.success){
    setInnerText('nama_mhs_span', result.data.nama_mhs);
  }else{
    window.location.replace("https://pmb.ulbi.ac.id/");
  }
}

let jumlahinput=2;

//upload otomatis setiap pilih file 
const inputFile1 = document.getElementById('pasfoto_input');
inputFile1.addEventListener('change', () => {
  console.log("onchange jalan nih");
    postFileWithHeader(UrlFileServicePost, "login", token, "pasfoto_input", "image", inputRender);
});
const inputFile2 = document.getElementById('ijazahs1_input');
inputFile2.addEventListener('change', () => {
  console.log("onchange jalan nih");
    postFileWithHeader(UrlFileServicePost, "login", token, "ijazahs1_input", "image", inputRender);
});
const inputFile3 = document.getElementById('transkrip_input');
inputFile3.addEventListener('change', () => {
  console.log("onchange jalan nih");
    postFileWithHeader(UrlFileServicePost, "login", token, "transkrip_input", "image", inputRender);
});
const inputFile4 = document.getElementById('dokumen_input');
inputFile4.addEventListener('change', () => {
  console.log("onchange jalan nih");
    postFileWithHeader(UrlFileServicePost, "login", token, "dokumen_input", "image", inputRender);
});
const inputFile5 = document.getElementById('dokumen_input2');
inputFile5.addEventListener('change', () => {
  console.log("onchange jalan nih");
    postFileWithHeader(UrlFileServicePost, "login", token, "dokumen_input2", "image", inputRender);
});
function inputRender(result) {
  console.log(result);
  if (result.status) {
    jumlahinput--;
  }else{
    Swal.fire({
            icon : 'error',
            title : 'Berkas Tidak Valid',
            text : 'Pastikan berukuran kurang dari 2MB dengan format gambar'
        });
  }
}

// Event listener for the "Submit" button
//pasfoto_input dan ijazahskl_input
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
  console.log("klik tombol submit");
  if(jumlahinput===0){
    postWithToken(UrlFileServiceMerge,"login",token,"",renderToHtml);
  }else{
    Swal.fire({
            icon : 'error',
            title : 'Berkas Sedang Upload',
            text : 'silahkan klik beberapa detik lagi'
        });
  }
});


function renderToHtml(result) {
  if (result.success) {
        Swal.fire({
            icon : 'success',
            title : 'Sukses!',
            text : result.status,
            showConfirmButton : false,
            timer : 1500
        }).then(() => {
            window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/pembayaran/bayarregistrasi.html");
        });
    } else {
        Swal.fire({
            icon : 'error',
            title : 'Oops...',
            text : result.status
        });
    }

};
