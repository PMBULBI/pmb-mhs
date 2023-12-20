import { UrlGetBiodataDiriWithToken, UrlGetBiodataJalurWithToken, UrlGetBiodataProdiWithToken, UrlGetDataPendaftar } from "../controller/template.js";
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
getWithHeader(UrlGetBiodataJalurWithToken, "login", token, responseDataJalur);

function responseDataJalur(result) {
  let namaJalur;

  if (result.success) {
    const jalurPendaftar = result.data.id_jalur;

    switch (jalurPendaftar) {
      case 1:
        namaJalur = "Undangan";
        break;
      case 2:
        namaJalur = "Jalur Rapor Gelombang 1";
        break;
      case 3:
        namaJalur = "CBT";
        document.getElementById('onlineTestCard').removeAttribute('hidden');
        break;
      case 4:
        namaJalur = "Ikatan Dinas";
        break;
      case 5:
        namaJalur = "Reguler Magister";
        break;
      case 6:
        namaJalur = "Fast Track Magister";
        break;
      case 7:
        namaJalur = "Kelas Karyawan";
        break;
      case 8:
        namaJalur = "Mandiri";
        break;
      case 9:
        namaJalur = "UTBK";
        break;
      case 10:
        namaJalur = "RPL";
        break;
      default:
        console.log("Tidak Ada Jalur");
        return;
    }

    setValue('jalur', namaJalur);
  } else {
    console.log(result);
  }
}

// Get Untuk Prodi
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
    return programMap[programCode] || "Tidak Ada Program Studi";
  }
  
  getWithHeader(UrlGetBiodataProdiWithToken, "login", token, responseProdi);
  
  function responseProdi(result) {
    if (result.success) {
      const programStudi1 = result.data.prodi1;
      const programStudi2 = result.data.prodi2;
  
      const prodi1 = getProgramName(programStudi1);
      const prodi2 = getProgramName(programStudi2);
  
      setValue('prodi1', prodi1);
      setValue('prodi2', prodi2);
    }
  }