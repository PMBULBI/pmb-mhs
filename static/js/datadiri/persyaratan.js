import { UrlFilePost, UrlGetDataPendaftar } from "../controller/template.js";
import { setInnerText } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.2/croot.js";
import { token } from "../controller/cookies.js";
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { postFileWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.2/croot.js";

// Get Data Cookies
// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetDataPendaftar,"login",token,renderDataPendaftar);
function renderDataPendaftar(result){
  if (result.success){
    setInnerText('nama_mhs_span', result.data.nama_mhs);
  }
}

// Event listener for the "Submit" button
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    postFileWithHeader(UrlFilePost, "login", token, "file_input", "file", renderToHtml);
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
          })
      }
    console.log(result);
};
