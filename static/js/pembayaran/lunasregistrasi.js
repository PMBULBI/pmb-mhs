import { UrlGetDataPendaftar, UrlCekPembayaranVAReg } from "../controller/template.js";
import { token } from "../controller/cookies.js";
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { postWithToken}  from "https://jscroot.github.io/api/croot.js";
import { setInnerText } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";

// Cek Pembayaran VA Registrasi
postWithToken(UrlCekPembayaranVAReg, "LOGIN", token, "test", ResponseVAReg)
function ResponseVAReg(value) {
  if (!value.success) {
    window.location.replace("bayarregistrasi.html");
  }
}

// Get Untuk Data
getWithHeader(UrlGetDataPendaftar,"login",token,renderDataPendaftar);
function renderDataPendaftar(result){
  if (result.success){
    setInnerText('nama_mhs_span', result.data.nama_mhs);
  }
}