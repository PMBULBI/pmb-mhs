
  /*===================================
   Dark and light theme change
  =====================================*/
  var themes = [{
    name: "dark",
    "class": "dark",
    checked: false
  }, {
    name: "semiDark",
    "class": "semiDark",
    checked: false
  }, {
    name: "light",
    "class": "light",
    checked: false
  }];

  // Loop through themes and add event listener for changes
  themes.forEach(function (theme) {
    var radioBtn = $("#".concat(theme["class"]));
    radioBtn.prop("checked", theme.name === currentTheme);
    radioBtn.on("change", function () {
      if (this.checked) {
        currentTheme = theme.name;
        localStorage.theme = theme.name;
        location.reload();
      }
    });
  });

  // Theme Change by Header Button
  $("#themeMood").on("click", function () {
    if (currentTheme === "light") {
      currentTheme = "dark";
    } else {
      currentTheme = "light";
    }
    localStorage.theme = currentTheme;
    location.reload();
  });
  $("#grayScale").on("click", function () {
    if ($("html").hasClass("grayScale")) {
      $("html").removeClass("grayScale");
      localStorage.effect = "";
    } else {
      $("html").addClass("grayScale");
      localStorage.effect = "grayScale";
    }
  });
