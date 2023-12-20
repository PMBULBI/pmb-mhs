import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.2/croot.js";
import { setInnerText } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.0/croot.js";
import { UrlGetDataPendaftar, UrlGetKuesionerWithToken } from "./template.js";
import { token } from "./cookies.js";

//Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetDataPendaftar, "login", token, renderDataPendaftar);
function renderDataPendaftar(result){
  if (result.success){
    setInnerText('nama_mhs_span', result.data.nama_mhs);
  }else{
    window.location.replace("https://pmb.ulbi.ac.id/");
  }
}

// Cek Pengisian Kuesioner
getWithHeader(UrlGetKuesionerWithToken, "login", token, ResponseGetKuesioner)

function ResponseGetKuesioner(value) {
    if (value.success) {
        window.location.replace('https://pmb.ulbi.ac.id/pmb-mhs/kuesioner/konfirmasikuesioner.html');
    } else {
        console.log(value);
    }
}