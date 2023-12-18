import { UrlGetBiodataJalurWithToken } from "./controller/template.js";
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { token } from "./controller/cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");
// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetBiodataJalurWithToken, "login", token, responseData);
function responseData(result){
  if (result.success){
    window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/index_backup.html");
  } else {
    window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/datadiri/jalurpendaftaran.html");
  }
}