"use strict";

var elements = ["days", "hours", "minutes", "seconds"];
var currentDate = new Date(); // If the date is after May 17th, set the current year + 1, otherwise set the current year

var currentYear = currentDate.getMonth() > 4 || currentDate.getMonth() == 4 && currentDate.getDate > 17 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
var targetDate = new Date("May 17, ".concat(currentYear, " 00:00:00"));
var timeLeft = targetDate - currentDate;
var countdown = document.querySelector(".countdown");
var days = document.querySelector("#days");
var hours = document.querySelector("#hours");
var minutes = document.querySelector("#minutes");
var seconds = document.querySelector("#seconds"); // Days is the number of days left in the countdown

days.innerHTML = timeLeft / (1000 * 60 * 60 * 24);
hours.innerHTML = timeLeft / (1000 * 60 * 60) % 24;
minutes.innerHTML = timeLeft / (1000 * 60) % 60;
seconds.innerHTML = timeLeft / 1000 % 60; // Update the countdown every second

var processNumbers = function processNumbers(x) {
  x = Math.floor(x);
  return x < 10 ? "0".concat(x) : x;
};

setInterval(function () {
  timeLeft -= 1000;
  days.innerHTML = processNumbers(timeLeft / (1000 * 60 * 60 * 24));
  hours.innerHTML = processNumbers(timeLeft / (1000 * 60 * 60) % 24);
  minutes.innerHTML = processNumbers(timeLeft / (1000 * 60) % 60);
  seconds.innerHTML = processNumbers(timeLeft / 1000 % 60);
}, 1000);