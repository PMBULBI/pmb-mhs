import { postWithToken} from "https://jscroot.github.io/api/croot.js";
import {getValue, addChild} from "https://jscroot.github.io/element/croot.js";
import { BaseUrl } from "../constant.js";
import { token } from "./cookies.js";



const main = async () =>{
    postWithToken(`${BaseUrl}/kuesioner`, "LOGIN", token, "test", responseKuesioner)
}


const responseKuesioner = (res) => {
    if (!res.success){
        // error state
        return;
    }
    

    // success state
    return;
}


main();