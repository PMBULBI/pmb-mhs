import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getValue, getValueRadio } from "https://jscroot.github.io/element/croot.js";
import { BaseUrl } from "../constant.js";
import { token } from "./cookies.js";

// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetDataPendaftar,"login",token,renderDataPendaftar);
function renderDataPendaftar(result){
  if (result.success){
    setInnerText('nama_mhs_span', result.data.nama_mhs);
  }
//   else{
//     window.location.replace("https://pmb.ulbi.ac.id/");
//   }
}

const main = async () =>{
    const data_json = await getValue();
    postWithToken(`${BaseUrl}/kuesioner`, "LOGIN", token, data_json, responseKuesioner)
}


const responseKuesioner = (res) => {
    if (!res.success){
        // error state
        return;
    }
    

    // success state
    return;
}


const getValueRadio = async () => {
    const data = {
        "pertanyaan_1": getValueRadio("basicradios1"),
        "pertanyaan_2": getValueRadio("basicradios2"),
        "pertanyaan_3": getValueRadio("basicradios3"),
        "pertanyaan_4": getValueRadio("basicradios4"),
        "pertanyaan_5": getValueRadio("basicradios5"),
        "pertanyaan_6": getValueRadio(""),
        "pertanyaan_7": getValueRadio(""),
        "pertanyaan_8": getValueRadio(""),
        "pertanyaan_9": getValueRadio("basicradios6"),
    }    
    return data;
}

main();