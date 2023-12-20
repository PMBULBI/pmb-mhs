import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.2/croot.js";
import { UrlGetKuesionerWithToken } from "../controller/template.js";
import { token } from "../controller/cookies.js";

// Cek Pengisian Kuesioner
await getWithHeader(UrlGetKuesionerWithToken, "login", token, ResponseGetKuesioner)

function ResponseGetKuesioner(value) {
    if (value.success) {
        window.location.replace('https://pmb.ulbi.ac.id/pmb-mhs/kuesioner/konfirmasikuesioner.html');
    } else {
        window.location.replace('https://pmb.ulbi.ac.id/pmb-mhs/kuesioner/kuesioner.html')
    }
}