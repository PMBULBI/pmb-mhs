import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.8/croot.js";
import { getCookie } from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";


const jalurdipilih= getCookie("jalur2");
const dpath ="https://pmb.ulbi.ac.id/pmb-mhs/persyaratan/"
setInner("demo","Harap Tunggu Sebentar, anda akan diarahkan ke laman selanjutnya");

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
        window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/");
        setInner("demo","Jalur Tidak Ditemukan");
}

const jalur={
    "code": 200,
    "success": true,
    "status": "Data berhasiL diambil",
    "data": [
        {
            "id": 161,
            "id_jalur": 4,
            "nama_jalur": "Ikatan Dinas",
            "tahun": 2024
        },
        {
            "id": 111,
            "id_jalur": 2,
            "nama_jalur": "Jalur Rapor Gelombang 1",
            "tahun": 2024
        },
        {
            "id": 106,
            "id_jalur": 1,
            "nama_jalur": "Undangan",
            "tahun": 2024
        },
        {
            "id": 116,
            "id_jalur": 3,
            "nama_jalur": "CBT",
            "tahun": 2024
        },
        {
            "id": 35,
            "id_jalur": 5,
            "nama_jalur": "Reguler Magister",
            "tahun": 2024
        },
        {
            "id": 70,
            "id_jalur": 6,
            "nama_jalur": "Fast Track Magister",
            "tahun": 2024
        },
        {
            "id": 105,
            "id_jalur": 7,
            "nama_jalur": "Kelas Karyawan",
            "tahun": 2024
        }
    ]
}