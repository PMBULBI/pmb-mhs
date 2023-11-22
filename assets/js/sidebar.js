
$(function () {
    // Load navbar.html on page load
    $("#sidebar-container").load("static/sidebar.html");
// Toggle the visibility of the navbar on button click
    $("#sidebar_type").click(function () {
        $("#sidebar-container").toggleClass("hidden");
    });
});