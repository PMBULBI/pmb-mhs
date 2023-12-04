import { UrlFilePost } from "./template.js";
import {getValue} from "https://jscroot.github.io/element/croot.js";
import { token } from "./cookies.js";

var header = new Headers();
header.append("login", token);
header.append('Content-Type', 'multipart/form-data');

// Untuk POST prodi & fakultas
// Membuat fungsi untuk mengirimkan data pilih prodi ke API
function SubmitPersayaratan() {
    
}

// Event listener for the "Submit" button
window.addEventListener('load', (event) => {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        Swal.fire({
            title: 'Submit Jalur Pendaftaran?',
            text: 'Apakah anda yakin ingin submit jalur pendaftaran?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                const inputFile = document.getElementById("file_input");

                if (!inputFile) {
                    console.error("File input element not found.");
                    return;
                }

                const file = inputFile.files[0];

                if (!file) {
                    console.error("No file selected.");
                    return;
                }

                const headers = new Headers();
                headers.append('Content-Type', 'multipart/form-data');

                fetch(UrlFilePost, {
                    method: "POST",
                    headers: headers,
                    body: file
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Sukses!',
                            text: 'Program studi berhasil disubmit.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // Do something with the data if needed
                        console.log(data);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Jalur pendaftaran gagal disubmit.'
                        });
                    }
                })
                .catch(error => {
                    console.error("Error saat melakukan POST Data : ", error);
                });
            }
        });
    });
});

