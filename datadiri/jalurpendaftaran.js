// Import function or library
import { UrlGetJalurPendaftaran } from "../static/js/controller/template.js";

// Jalur Pendaftaran
// Membuat fungsi untuk fetch data ke dropdown jalur
function fetchData() {
    fetch(UrlGetJalurPendaftaran)
        .then(response => response.json())
        .then(data => {
            populateDropdown(data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Membuat fungsi dropdown jalur pendaftaran
function populateDropdown(data) {
    const selectDropdown = document.getElementById('selectjalur');
    selectDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Pilih Jalur';
    selectDropdown.appendChild(defaultOption);

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.jalur;
        option.text = item.nama_jalur;
        selectDropdown.appendChild(option);
    });
}
fetchData();
