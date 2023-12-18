import { UrlGetBiodataJalurWithToken, UrlGetBiodataJalurWithToken } from "./controller/template.js";
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";

// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetBiodataJalurWithToken, "login", token, responseData);
function responseData(result){
  if (result.success){
    window.location.replace("https://pmb.ulbi.ac.id/datadiri/jalurpendaftaran.html");
  } else {
    window.location.replace("https://pmb.ulbi.ac.id/index_backup.html");
  }
}