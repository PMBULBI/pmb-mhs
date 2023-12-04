import {get} from "https://jscroot.github.io/api/croot.js";
import { token } from "./cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

var requestOptions = {
    method: 'POST',
    headers: header
  };
  
function fetchVA() {
    fetch("https://komarbe.ulbi.ac.id/va/create", requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
}

fetchVA();