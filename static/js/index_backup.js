import { UrlGetBiodataJalurWithToken, UrlGetDataPendaftar } from "./controller/template.js";
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { setInnerText } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { token } from "./controller/cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetBiodataJalurWithToken, "login", token, responseData);
function responseData(result){
  if (!result.success){
    window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/datadiri/jalurpendaftaran.html");
  }
}

// Get Data untuk Tampilan Di Dashboard
getWithHeader(UrlGetDataPendaftar,"login", token, responseDataPendaftar);
function responseDataPendaftar(result) {
  if (result.success){
    setInnerText('nama_mhs_span', result.data.nama_mhs);
    setInnerText('nama_mhs', result.data.nama_mhs);
    setInnerText('email_mhs', result.data.email_mhs);
    setInnerText('no_hp', result.data.email_mhs);
  } else{
    window.location.replace("https://pmb.ulbi.ac.id/");
  }
}

getWithHeader(UrlGetBiodataJalurWithToken, "login", token, responseDataJalur);
function responseDataJalur(result) {
  if(result.success) {
    setInnerText('jalur_pendaftaran', result.data.id_jalur);
  } else {
    window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/datadiri/jalurpendaftaran.html");
  }
}
