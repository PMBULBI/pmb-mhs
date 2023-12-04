import { UrlFilePost } from "./template.js";
import {getValue} from "https://jscroot.github.io/element/croot.js";
import { token } from "./cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "multipart/form-data");

// Untuk POST prodi & fakultas
// Membuat fungsi untuk mengirimkan data pilih prodi ke API

// Event listener for the "Submit" button
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
            const form = document.getElementById("form");
            const inputFile = document.getElementById("file");
        
            const formData = new FormData();
        
            const handleSubmit = (event) => {
                event.preventDefault();
        
                for (const file of inputFile.files) {
                    formData.append("files", file);
                }
        
                // Now, you can call the fetch inside handleSubmit
                fetch(UrlFilePost, {
                    method: "POST",
                    headers: header,
                    body: formData
                })
                .then(response => response.json())
                .catch(error => {
                    console.error("Error saat melakukan POST Data : ", error);
                });
        
            // Event listener for form submission
            form.addEventListener("click", handleSubmit);
        }
    }
    );


