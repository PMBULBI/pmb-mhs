import { UrlGetDataPendaftar,UrlFileServicePost } from "../controller/template.js";
import { getValue, setValue, setInnerText, getValueRadio } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { getWithHeader,postFileWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.2/croot.js";
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


// Event listener for the "Submit" button
//pasfoto_input dan ijazahskl_input
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    postFileWithHeader(UrlFileServicePost, "login", token, "pasfoto_input", "image", renderToHtml);
    //postFileWithHeader(UrlFileServicePost, "login", token, "ijazahskl_input", "image", renderToHtml);
});


function renderToHtml(result) {
  if (result.status) {
        Swal.fire({
            icon : 'success',
            title : 'Sukses!',
            text : result.status,
            showConfirmButton : false,
            timer : 1500
        }).then(() => {
            //window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/pembayaran/bayarregistrasi.html");
            console.log(result)
        });
    } else {
        Swal.fire({
            icon : 'error',
            title : 'Oops...',
            text : result.status
        })
    }
  console.log(result);
};