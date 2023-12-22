import { UrlGetBiodataDiriWithToken, UrlGetBiodataJalurWithToken, UrlGetBiodataOrtuWithToken, UrlGetBiodataProdiWithToken, UrlGetBiodataSekolahWithToken } from "../../js/controller/template.js";
import { token } from "../../js/controller/cookies.js";
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";


// Pengkondisian Badge Pada Biodata
// Data Jalur Pendaftaran
getWithHeader(UrlGetBiodataJalurWithToken, "LOGIN", token, responseDataJalur)

function responseDataJalur(value) {
  const bgWarning = 'badge bg-warning-500 absolute text-white capitalize top-0 right-0 mt-1 mr-1';
  const bgSuccess = 'badge bg-success-500 absolute text-white capitalize top-0 right-0 mt-1 mr-1';
  if (value.success) {
    setInner('badgeJalur', 'Sudah Diisi');
    // Show the hidden button 
    document.getElementById("badgeJalur").className = bgSuccess;
  } else {
    setInner('badgeJalur', 'Belum Diisi');
    document.getElementById("badgeJalur").className = bgWarning;
  }
}

// Data Program Studi
getWithHeader(UrlGetBiodataProdiWithToken, "LOGIN", token, responseProdi)

function responseProdi(value) {
  const bgWarning = 'badge bg-warning-500 absolute text-white capitalize top-0 right-0 mt-1 mr-1';
  const bgSuccess = 'badge bg-success-500 absolute text-white capitalize top-0 right-0 mt-1 mr-1';
  if (value.success) {
    setInner('badgeProdi', 'Sudah Diisi');
    // Show the hidden button 
    document.getElementById("badgeProdi").className = bgSuccess;
  } else {
    setInner('badgeProdi', 'Belum Diisi');
    document.getElementById("badgeProdi").className = bgWarning;
  }
}

// Data Biodata Diri
getWithHeader(UrlGetBiodataDiriWithToken, "LOGIN", token, responseBiodataDiri)

function responseBiodataDiri(value) {
  const bgWarning = 'badge bg-warning-500 absolute text-white capitalize top-0 right-0 mt-1 mr-1';
  const bgSuccess = 'badge bg-success-500 absolute text-white capitalize top-0 right-0 mt-1 mr-1';
  if (value.success) {
    setInner('badgeDatadiri', 'Sudah Diisi');
    // Show the hidden button 
    document.getElementById("badgeDatadiri").className = bgSuccess;
  } else {
    setInner('badgeDatadiri', 'Belum Diisi');
    document.getElementById("badgeDatadiri").className = bgWarning;
  }
}

// Data Biodata Orang Tua
getWithHeader(UrlGetBiodataOrtuWithToken, "LOGIN", token, responseOrtu)

function responseOrtu(value) {
  const bgWarning = 'badge bg-warning-500 absolute text-white capitalize top-0 right-0 mt-1 mr-1';
  const bgSuccess = 'badge bg-success-500 absolute text-white capitalize top-0 right-0 mt-1 mr-1';
  if (value.success) {
    setInner('badgeOrtu', 'Sudah Diisi');
    // Show the hidden button 
    document.getElementById("badgeOrtu").className = bgSuccess;
  } else {
    setInner('badgeOrtu', 'Belum Diisi');
    document.getElementById("badgeOrtu").className = bgWarning;
  }
}

// Data Biodata Sekolah
getWithHeader(UrlGetBiodataSekolahWithToken, "LOGIN", token, responseSekolah)

function responseSekolah(value) {
  const bgWarning = 'badge bg-warning-500 absolute text-white capitalize top-0 right-0 mt-1 mr-1';
  const bgSuccess = 'badge bg-success-500 absolute text-white capitalize top-0 right-0 mt-1 mr-1';
  if (value.success) {
    setInner('badgeSekolah', 'Sudah Diisi');
    // Show the hidden button 
    document.getElementById("badgeSekolah").className = bgSuccess;
  } else {
    setInner('badgeSekolah', 'Belum Diisi');
    document.getElementById("badgeSekolah").className = bgWarning;
  }
}

// Data Biodata Persyaratan