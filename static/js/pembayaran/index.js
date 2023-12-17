import { UrlCekPembayaranVAReg } from "../controller/template.js";
import { postWithToken }  from "https://jscroot.github.io/api/croot.js";
import { token } from "../controller/cookies.js";

// Cek Pembayaran VA Registrasi
await postWithToken(UrlCekPembayaranVAReg, "LOGIN", token, "test", ResponseVAReg);

function ResponseVAReg(value) {
  if (!value.data.lunas) {
    window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/pembayaran/bayarregistrasi.html");
  }else{
    window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/pembayaran/lunasregistrasi.html");
  }
}