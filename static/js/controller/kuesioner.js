import { postWithToken} from "https://jscroot.github.io/api/croot.js";
import {getValue, addChild} from "https://jscroot.github.io/element/croot.js";
import { BaseUrl } from "../constant.js";
import { token } from "./cookies.js";



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


const getValue = async () => {
    const data = {
        "pertanyaan_1": getValue(""),
        "pertanyaan_2": getValue(""),
        "pertanyaan_3": getValue(""),
        "pertanyaan_4": getValue(""),
        "pertanyaan_5": getValue(""),
        "pertanyaan_6": getValue(""),
        "pertanyaan_7": getValue(""),
        "pertanyaan_8": getValue(""),
        "pertanyaan_9": getValue(""),
    }    
    return data;
}

main();