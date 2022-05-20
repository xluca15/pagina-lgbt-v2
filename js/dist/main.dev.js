"use strict";

var _main = require("./constants/main.js");

window.addEventListener('load', function () {
  var LTS = document.getElementsByClassName("letter__wrap");
  var searchInp = document.getElementById("search");
  var searchBtn = document.getElementById("search-btn");
  var searchResults = document.getElementById("search-results");
  searchInp.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      searchBtn.click();
    }

    var res = [];

    if (searchInp.value.length > 1) {
      _main.articles.data.forEach(function (article) {
        if (article.name.toLowerCase().includes(searchInp.value.toLowerCase())) {
          res.push(article);
        }
      });
    } else {
      res.push({
        name: "Escribe al menos 2 letras",
        url: "#"
      });
    }

    searchResults.innerHTML = "";
    res.forEach(function (article) {
      var item = document.createElement("section");
      item.className = "search-item";
      item.innerHTML = article.name;
      item.addEventListener("click", function () {
        window.location.href = "/".concat(article.url);
      });
      console.log(searchResults);
      searchResults.appendChild(item);
    });
  });

  var _loop = function _loop(i) {
    console.log(_main.urls[i]);
    LTS[i].addEventListener("click", function () {
      window.location.href = window.location.href.replace("inicio", _main.urls[i]);
    });
  };

  for (var i = 0; i < LTS.length; i++) {
    _loop(i);
  }
});