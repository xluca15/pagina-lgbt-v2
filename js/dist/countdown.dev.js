"use strict";

var $ = function $(selector) {
  return document.querySelector(selector);
};

var elements = [$('#days'), $('#hours'), $('#minutes'), $('#seconds')];
var elements2 = [$('#days2'), $('#hours2'), $('#minutes2'), $('#seconds2')];
var elements3 = [$('#days3'), $('#hours3'), $('#minutes3'), $('#seconds3')];
var elements4 = [$('#days4'), $('#hours4'), $('#minutes4'), $('#seconds4')];
var currentDate = new Date(); // If the date is after May 17th, set the current year + 1, otherwise set the current year

var currentYear = currentDate.getMonth() > 4 || currentDate.getMonth() == 4 && currentDate.getDate > 17 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
var targetDate = [new Date("May 17, ".concat(currentYear, " 00:00:00")), new Date("Jul 15, 2010 00:00:00"), new Date('Jun 5, 2013 00:00:00'), new Date('Oct 4, 2006 00:00:00')];
var timeLeft = [targetDate[0] - currentDate, currentDate - targetDate[1], currentDate - targetDate[2], currentDate - targetDate[3]]; // Update the countdown every second

var processNumbers = function processNumbers(x) {
  x = Math.floor(x);
  return x < 10 ? "0".concat(x) : x;
};

var execute = function execute(el, id, it) {
  timeLeft[id] += it;
  el[0].innerHTML = processNumbers(timeLeft[id] / (1000 * 60 * 60 * 24));
  el[1].innerHTML = processNumbers(timeLeft[id] / (1000 * 60 * 60) % 24);
  el[2].innerHTML = processNumbers(timeLeft[id] / (1000 * 60) % 60);
  el[3].innerHTML = processNumbers(timeLeft[id] / 1000 % 60);
};

execute(elements, 0, 0);
execute(elements2, 1, 0);
execute(elements3, 2, 0);
execute(elements4, 3, 0);
setInterval(function () {
  execute(elements, 0, -1000);
  execute(elements2, 1, 1000);
  execute(elements3, 2, 1000);
  execute(elements4, 3, 1000);
}, 1000);