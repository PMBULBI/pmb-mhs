import { UrlFilePost, UrlGetDataPendaftar } from "../controller/template.js";
import { getValue, setInnerText } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.2/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { token } from "../controller/cookies.js";
import {setInner, show,hide,getValue,getFileSize} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { postFile} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.2/croot.js";

window.uploadFile = uploadFile;

function uploadFile() {
    if (!getValue("file_input")) {
        alert('Please select an image file');
        return;
    }
    hide("inputfile");
    let besar=getFileSize("file_input");
    setInner("isi",besar);
    postFileWithHeader(UrlFilePost, "login", token,"file_input","file",renderToHtml);
}

function renderToHtml(result){
    console.log(result);
    // setInner("isi",result.content);
    // show("inputfile");
}

// Get Data Cookies
// Get Untuk Data di Navbar dan Form
getWithHeader(UrlGetDataPendaftar,"login",token,renderDataPendaftar);
function renderDataPendaftar(result){
  if (result.success){
    setInnerText('nama_mhs_span', result.data.nama_mhs);
  }
}

// // Event listener for the "Submit" button
// const submitButton = document.getElementById('submitButton');
// submitButton.addEventListener('click', () => {
//     const form = document.getElementById("form");
//     const inputFile = document.getElementById("file_input");

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const formData = new FormData();

//         for (const file of inputFile.files) {
//             formData.append("file", file);
//         }

//         try {
//             const response = await fetch(UrlFilePost, {
//                 method: "POST",
//                 headers: {
//                     'login': token,
//                 },
//                 body: formData,
//             })

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();
//             if (!data.success){
//                 throw new Error(`HTTP error! Status: ${data.status}`);
//             }

//             console.log("Response data:", data);
//             window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/VAPage.html");
//         } catch (error) {
//             console.error("Error saat melakukan POST Data:", error);
//         }
//     };

//     // Event listener for form submission
//     //form.addEventListener("submit", handleSubmit);
// });
