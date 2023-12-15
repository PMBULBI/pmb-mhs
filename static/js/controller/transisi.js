import { GetPendaftarByToken } from "../helper/pendaftar.js";
import { token } from "./cookies.js";

const main = async () => {

    if (token === "") {
        return;
    }

    const data_pendaftar = await GetPendaftarByToken(token);

    if (!data_pendaftar.success){
        window.location.replace("../");
    }
    
    setInner("nama_mhs", res.data.nama_mhs);
    setInner("hp_mhs", res.data.hp_mhs);
    // setInner("emailadmin", res.data.email);
}

main();
