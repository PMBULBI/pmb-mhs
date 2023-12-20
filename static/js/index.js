import { token } from "./controller/cookies.js";
import { UrlGetBiodataJalurWithToken } from "./controller/template.js";

// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetBiodataJalurWithToken, "login", token, responseData);
function responseData(result){
  if (!result.success){
    window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/datadiri/jalurpendaftaran.html");
  } else {
    window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/index_backup.html");
  }
}