import { UrlGetDataPendaftar, UrlPostVA, UrlCekPembayaranVAReg } from "../controller/template.js";
import { postWithToken}  from "https://jscroot.github.io/api/croot.js";
import { token } from "../controller/cookies.js";
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { setValue, setInnerText, setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";

// Cek Pembayaran VA Registrasi
postWithToken(UrlCekPembayaranVAReg, "LOGIN", token, "test", ResponseVAReg)

function ResponseVAReg(value) {
  const bgWarning = 'py-[18px] px-6 font-normal font-Inter text-sm rounded-md bg-warning-500 text-white dark:bg-warning-500 dark:text-slate-300 mb-2';
  const bgSuccess = 'py-[18px] px-6 font-normal font-Inter text-sm rounded-md bg-success-500 text-white dark:bg-success-500 dark:text-slate-300 mb-2';

  if (value.success) {
    setInner('alertPembayaran', 'Pembayaran Registrasi Anda Telah Lunas');
    // Show the hidden button
    document.getElementById('alertPembayaran').classList.replace(bgWarning, bgSuccess);
    document.getElementById('buttonCetakInvoice').classList.remove('hidden');
  } else {
    setInner('alertPembayaran', 'Silahkan Selesaikan Pembayaran Registrasi Anda');
    document.getElementById('alertPembayaran').classList.replace(bgSuccess, bgWarning);

  }
}

// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetDataPendaftar,"login",token,renderDataPendaftar);
function renderDataPendaftar(result){
  if (result.success){
    setInnerText('nama_mhs_span', result.data.nama_mhs);
  }
}


postWithToken(UrlPostVA, "LOGIN", token,  "test" ,Response)


function Response(value){
  if (value.success){
    setValue('nameInput', value.data.name);
    setValue('jalurInput', value.data.jalur);
    setValue('emailInput', value.data.email),
    setValue('nohpInput', value.data.phone)
    setValue('vaInput', value.data.virtual_account);
    setInnerText('nominalRegis1', value.data.amount);
    setInnerText('expiredDateInput', value.data.datetime_expired);
  } else {
    Swal.fire({ 
      icon : 'error',
      title : 'Oops...',
      text : value.status
    })
    console.log(value);
  }
}