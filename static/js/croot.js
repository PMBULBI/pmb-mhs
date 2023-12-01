import { token } from "./controller/cookies.js";
import { getWithHeader } from "https://jscroot.github.io/api/croot.js";
import { setInner } from "https://jscroot.github.io/element/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

if (token === "") {
    window.location.replace("https://pmb.ulbi.ac.id");
}

function main(){
    getWithHeader("https://komarbe.ulbi.ac.id/pendaftar/pendaftar/token", "LOGIN", getCookie("login"), setDataMhs);
}

function setDataMhs(result){
    setInner("email_mhs", result.data.email_mhs);
    setInner("no_hp", result.data.hp_mhs);
    setInner("nama_mhs", result.data.nama_mhs);
    setInner("nama_mhs_span", result.data.nama_mhs);
}

main();