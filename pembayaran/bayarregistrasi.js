import { postWithToken} from "https://jscroot.github.io/api/croot.js";
import {getValue, addChild} from "https://jscroot.github.io/element/croot.js";
import { token } from "../static/js/controller/cookies.js";
  
function fetchVA() {
    postWithToken("https://komarbe.ulbi.ac.id/va/create", "LOGIN", token,  "test" ,Response)
}

function Response(value){
  // console.log(value)
  if (value.success === false){
    addChild("cek", "h4", "text-3xl font-medium text-slate-900 dark:text-white mb-2", value.status)
  } else {
    addChild("cek", "h4", "text-3xl font-medium text-slate-900 dark:text-white mb-2", value.status)
  }
}

fetchVA();