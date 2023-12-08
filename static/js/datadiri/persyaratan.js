import { UrlFilePost } from "../controller/template.js";
import { getValue, setInnerText } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.2/croot.js";
import { token } from "../controller/cookies.js";

// Get Data Cookies
// Get Untuk Data di Navbar dan Form
document.addEventListener("DOMContentLoaded", function() {
    var namaMhs = getCookie('namaMhs');
  
    if (namaMhs) {
        setInnerText('nama_mhs_span', namaMhs);
    }
});

// Event listener for the "Submit" button
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    const form = document.getElementById("form");
    const inputFile = document.getElementById("file_input");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        for (const file of inputFile.files) {
            formData.append("file", file);
        }

        try {
            const response = await fetch(UrlFilePost, {
                method: "POST",
                headers: {
                    'login': token,
                },
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (!data.success){
                throw new Error(`HTTP error! Status: ${data.status}`);
            }

            console.log("Response data:", data);
            window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/VAPage.html");
        } catch (error) {
            console.error("Error saat melakukan POST Data:", error);
        }
    };

    // Event listener for form submission
    form.addEventListener("submit", handleSubmit);
});