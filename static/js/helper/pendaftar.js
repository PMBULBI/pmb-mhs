import { postWithToken, getWithHeader } from "https://jscroot.github.io/api/croot.js";
import { getValue, getValueRadio, onClick } from "https://jscroot.github.io/element/croot.js";
import { UrlGetDataPendaftar } from "../controller/template.js";
import { BaseUrl } from "../constant.js";


export const GetPendaftarByToken = async (token) => {
    let data_json;
    getWithHeader(UrlGetDataPendaftar, "LOGIN", token, (res) => {return res})
    return data_json;
};


export const FormatDate = (inputDate) => {
    // Parse the input date string
    const inputDateObj = new Date(inputDate);

    // Define a JSON object with month names
    const monthNames = {
        0: 'Januari', 1: 'Februari', 2: 'Maret', 3: 'April',
        4: 'Mei', 5: 'Juni', 6: 'Juli', 7: 'Agustus',
        8: 'September', 9: 'Oktober', 10: 'November', 11: 'Desember'
    };

    // Get the day, month, and year from the input date
    const day = inputDateObj.getDate();
    const monthIndex = inputDateObj.getMonth();
    const year = inputDateObj.getFullYear();

    // Format the date string
    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

    return formattedDate;
}