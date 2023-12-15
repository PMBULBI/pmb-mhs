import { postWithToken, getWithHeader } from "https://jscroot.github.io/api/croot.js";
import { getValue, getValueRadio, onClick } from "https://jscroot.github.io/element/croot.js";
import { UrlGetDataPendaftar } from "../controller/template.js";
import { BaseUrl } from "../constant.js";


export const GetPendaftarByToken = async (token) => {
    let data_json;
    getWithHeader(UrlGetDataPendaftar, "LOGIN", token, "", (res) => { data_json = res})
    return data_json;
};
