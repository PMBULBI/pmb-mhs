import { UrlFilePost } from "../static/js/controller/template.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { token } from "../static/js/controller/cookies.js";

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
            }).then(window.location.replace("https://pmb.ulbi.ac.id/pmb-mhs/VAPage.html"));

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response data:", data);
        } catch (error) {
            console.error("Error saat melakukan POST Data:", error);
        }
    };

    // Event listener for form submission
    form.addEventListener("submit", handleSubmit);
});
