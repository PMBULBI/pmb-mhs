import { token } from "./controller/cookies.js";

if (token === "") {
    window.location.replace("https://pmb.ulbi.ac.id");
}