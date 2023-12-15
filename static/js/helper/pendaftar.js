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
        1: 'Januari', 2: 'Februari', 3: 'Maret', 4: 'April',
        5: 'Mei', 6: 'Juni', 7: 'Juli', 8: 'Agustus',
        9: 'September', 10: 'Oktober', 11: 'November', 12: 'Desember'
    };

    // Get the day, month, and year from the input date
    const day = inputDateObj.getDate();
    const monthIndex = inputDateObj.getMonth();
    const year = inputDateObj.getFullYear();

    // Format the date string
    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

    return formattedDate;
}