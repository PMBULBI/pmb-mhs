import { postWithToken, getWithHeader } from "https://jscroot.github.io/api/croot.js";
import { getValue, getValueRadio, onClick } from "https://jscroot.github.io/element/croot.js";
import { UrlGetDataPendaftar } from "../controller/template.js";
import { token } from "./cookies.js";


const main = async () => {
    if (token === "") {
        return;
    }

    await getWithHeader(UrlGetDataPendaftar, "LOGIN", token, set_data)
    // setInner("emailadmin", res.data.email);
}

const set_data = async (res) =>{

    if (!res.success){
        window.location.replace("../");
    }
    
    setInner("nama_mhs", res.data.nama_mhs);
    setInner("hp_mhs", res.data.hp_mhs);
}
main();
