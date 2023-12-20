import { UrlGetBiodataDiriWithToken,  UrlGetBiodataProdiWithToken, UrlGetDataPendaftar } from "../controller/template.js";
import { token } from "../controller/cookies.js";
import { setValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";

// Get Untuk Data Diri
getWithHeader(UrlGetDataPendaftar,"login",token,responseDataDiri);
function responseDataDiri(result){
  if (result.success){
    setValue('nama', result.data.nama_mhs);
    setValue('no_hp', result.data.hp_mhs);
    setValue('email', result.data.email_mhs);
  }
}

// Get Untuk NIK
getWithHeader(UrlGetBiodataDiriWithToken,"login",token,responseNik);
function responseNik(result){
  if (result.success){
    setValue('nik', result.data.nik);
  }
}

// Get Untuk Jalur
// Map program codes to program names
const programMap = {
    14: "S1 Terapan - Teknik Informatika",
    34: "S1 Terapan - Akuntansi Keuangan",
    44: "S1 Terapan - Manajemen Bisnis",
    54: "S1 Terapan - Logistik Bisnis",
    13: "D3 - Teknik Informatika",
    33: "D3 - Akuntansi",
    23: "D3 - Sistem Informasi",
    43: "D3 - Manajemen Bisnis",
    53: "D3 - Manajemen Logistik",
    81: "S1 - Manajemen Transportasi Logistik",
    82: "S1 - Manajemen Logistik",
    74: "S1 Terapan - E-Commerce Logistics",
    84: "S1 - Sains Data",
    85: "S1 - Manajemen Rekayasa",
    83: "S1 - Bisnis Digital",
    11: "S2 - Magister Manajemen Logistik"
  };
  
  // Function to get program name based on program code
  function getProgramName(programCode) {
    return programMap[programCode] || "Tidak Ada Jalur";
  }
  
  getWithHeader(UrlGetBiodataProdiWithToken, "login", token, responseJalur);
  
  function responseJalur(result) {
    if (result.success) {
      const programStudi1 = result.data.prodi1;
      const programStudi2 = result.data.prodi2;
  
      const prodi1 = getProgramName(programStudi1);
      const prodi2 = getProgramName(programStudi2);
  
      setValue('prodi1', prodi1);
      setValue('prodi2', prodi2);
    }
  }