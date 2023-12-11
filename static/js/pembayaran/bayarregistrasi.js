import { postWithToken} from "https://jscroot.github.io/api/croot.js";
import { getValue, addChild } from "https://jscroot.github.io/element/croot.js";
import { token } from "../controller/cookies.js";
import { setValue, setInnerText } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
  
function fetchVA() {
    postWithToken("https://komarbe.ulbi.ac.id/va/create", "LOGIN", token,  "test" ,Response)
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