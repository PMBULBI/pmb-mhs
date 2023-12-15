import { postWithToken, getWithHeader } from "https://jscroot.github.io/api/croot.js";
import { setValue, setInner } from "https://jscroot.github.io/element/croot.js";
import { UrlGetDataPendaftar, UrlCekPembayaranVAReg } from "../controller/template.js";
import { token } from "./cookies.js";
import { FormatDate } from "../helper/pendaftar.js";


const main = async () => {
    if (token === "") {
        return;
    }

    await getWithHeader(UrlGetDataPendaftar, "LOGIN", token, set_data_diri);
    await postWithToken(UrlCekPembayaranVAReg, "LOGIN", token, "test", set_data_va);
    // setInner("emailadmin", res.data.email);
}

const set_data_diri = async (res) =>{

    if (!res.success){
        window.location.replace("../");
    }
    
    setInner("nama_mhs", res.data.nama_mhs);
    setInner("hp_mhs", res.data.hp_mhs);
}

const set_data_va = async (res) => {
    setInner("tglEXpire", FormatDate(res.data.datetime_expired))
    setValue("jumlahVa", res.data.total_amount);
    setValue("vaNumber", res.data.virtual_account);
}


main();
