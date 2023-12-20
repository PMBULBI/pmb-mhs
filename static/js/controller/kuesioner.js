import { postWithToken, getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.2/croot.js";
import { setInnerText, getValueRadio, onClick, setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.0/croot.js";
import { UrlGetDataPendaftar, UrlGetKuesionerWithToken } from "./template.js";
import { BaseUrl } from "../constant.js";
import { token } from "./cookies.js";

// Cek Pengisian Kuesioner
getWithHeader(UrlGetKuesionerWithToken, "login", token, ResponseGetKuesioner)

function ResponseGetKuesioner(value) {
    const bgWarning = "py-[18px] px-6 font-normal font-Inter text-sm rounded-md bg-warning-500 text-white dark:bg-warning-500 dark:text-slate-300 mb-2";
    const bgSuccess = "py-[18px] px-6 font-normal font-Inter text-sm rounded-md bg-success-500 text-white dark:bg-success-500 dark:text-slate-300 mb-2";
    if (value.success) {
        setInner('alertKuesioner', '<b>Sudah Isi Kuesioner!</b> Terima kasih kamu mengisi kuesioner dengan baik dan benar.');
        document.getElementById("colorAlert").className = bgSuccess;
        console.log(value);
    } else {
        setInner('alertKuesioner', 'Silahkan <b>isi kuesioner</b> dengan baik dan benar.');
    document.getElementById("colorAlert").className = bgWarning;
    }
}

//Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetDataPendaftar,"login",token,renderDataPendaftar);
function renderDataPendaftar(result){
  if (result.success){
    setInnerText('nama_mhs_span', result.data.nama_mhs);
  }else{
    window.location.replace("https://pmb.ulbi.ac.id/");
  }
}

const main = () => {
    onClick("buttonSave", runAll);
}

const runAll = async () =>{
    const data_json = await getData();
    console.log(data_json);
    await postWithToken(`${BaseUrl}/kuesioner/`, "LOGIN", token, data_json, responseKuesioner);
    return;
}


const responseKuesioner = (res) => {
    if (!res.success){
        Swal.fire({
            icon: 'error',
            title: 'Penyimpanan Gagal',
            text: res.status
          });
        return;
    }
    Swal.fire({
        icon: 'success',
        title: 'Kuisoner Tersimpan',
        text: 'Anda berhasil menyimpan kuisioner!',
        showConfirmButton: false,
        timer: 1500
      })
      .then(() => {
        window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/index_backup.html");
      })

    // success state
    return;
}


const getData = async () => {

    const acc1 = document.getElementsByName('arrayCheckbox6');
    const acc2 = document.getElementsByName('arrayCheckbox7');
    const acc3 = document.getElementsByName('arrayCheckbox8');

    const list_pertanyaan6 = [];
    const list_pertanyaan7 = [];
    const list_pertanyaan8 = [];

    acc1.forEach((data) => {
        if (data.checked){
            list_pertanyaan6.push(data.value);
        }
    });

    acc2.forEach((data) => {
        if (data.checked){
            list_pertanyaan7.push(data.value);
        }
    });


    acc3.forEach((data) => {
        if (data.checked){
            list_pertanyaan8.push(data.value);
        }
    });

    const data = {
        "pertanyaan_1": getValueRadio("basicradios1"),
        "pertanyaan_2": getValueRadio("basicradios2"),
        "pertanyaan_3": getValueRadio("basicradios3"),
        "pertanyaan_4": getValueRadio("basicradios4"),
        "pertanyaan_5": getValueRadio("basicradios5"),
        "pertanyaan_6": list_pertanyaan6,
        "pertanyaan_7": list_pertanyaan7,
        "pertanyaan_8": list_pertanyaan8,
        "pertanyaan_9": getValueRadio("basicradios6"),
    }    
    return data;
}


main();