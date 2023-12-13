import { UrlGetDataPendaftar, UrlPostVA } from "../controller/template.js";
import { postWithToken}  from "https://jscroot.github.io/api/croot.js";
import { token } from "../controller/cookies.js";
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { setValue, setInnerText } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";

// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetDataPendaftar,"login",token,renderDataPendaftar);
function renderDataPendaftar(result){
  if (result.success){
    setInnerText('nama_mhs_span', result.data.nama_mhs);
  }
}

function fetchVA() {
    postWithToken(UrlPostVA, "LOGIN", token,  "test" ,Response)
}

function Response(value){
  if (value.success){
    setValue('nameInput', value.data.name);
    setValue('jalurInput', value.data.description);
    setValue('emailInput', value.data.email),
    setValue('nohpInput', value.data.phone)
    setValue('vaInput', value.data.virtual_account);
    setInnerText('nominalRegis1', value.data.amount);
    setInnerText('nominalRegis2', value.data.amount);
    setInnerText('expiredDateInput', value.data.datetime_expired);
    setInnerText('nominalAlert', value.data.amount)
  } else {
    Swal.fire({ 
      icon : 'error',
      title : 'Oops...',
      text : value.status
    })
    console.log(value);
  }
}

fetchVA();