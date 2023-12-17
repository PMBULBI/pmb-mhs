import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.8/croot.js";
import { getCookie } from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";


const jalurdipilih= await getCookie("jalur2");
const dpath ="https://pmb.ulbi.ac.id/pmb-mhs/persyaratan/"

switch(jalurdipilih){
    case "1"://undangan
        window.location.replace(dpath+"undangan.html");
        break;
    case "2"://Jalur Rapor Gelombang 1
        window.location.replace(dpath+"rapor.html");
        break;
    case "3"://CBT
        window.location.replace(dpath+"mandiri.html");
        break;
    case "4"://Ikatan DInas
        window.location.replace(dpath+"mandiri.html");
        break;
    case "5"://Reguler Magister
        window.location.replace(dpath+"s2reguler.html");
        break;
    case "6"://Fast Track Magister
        window.location.replace(dpath+"s2fasttrack.html");
        break;
    case "7"://Kelas Karyawan
        window.location.replace(dpath+"nonrpl.html");
        break;
    case "9"://utbk
        window.location.replace(dpath+"utbk.html");
        break;
    default:
        //window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/");
        console.log(jalurdipilih);
        setInner("demo","Jalur Tidak Ditemukan");
}