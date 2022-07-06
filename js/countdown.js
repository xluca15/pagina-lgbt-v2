const $ = (selector)=>document.querySelector(selector);
const elements = [$('#days'), $('#hours'), $('#minutes'), $('#seconds')];
const elements2 = [$('#days2'), $('#hours2'), $('#minutes2'), $('#seconds2')];
const elements3 = [$('#days3'), $('#hours3'), $('#minutes3'), $('#seconds3')];
const elements4 = [$('#days4'), $('#hours4'), $('#minutes4'), $('#seconds4')];
let currentDate = new Date();
// If the date is after May 17th, set the current year + 1, otherwise set the current year
let currentYear = (currentDate.getMonth() > 4 || (currentDate.getMonth() == 4 && currentDate.getDate > 17)) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
const targetDate = [new Date(`May 17, ${currentYear} 00:00:00`), new Date(`Jul 15, 2010 00:00:00`), new Date('Jun 5, 2013 00:00:00'), new Date('Oct 4, 2006 00:00:00')];
let timeLeft = [(targetDate[0] - currentDate), (currentDate - targetDate[1]), (currentDate - targetDate[2]), (currentDate - targetDate[3])];
// Update the countdown every second
const processNumbers = (x)=>{
	x = Math.floor(x);
	return (x < 10) ? `0${x}` : x;
}
const execute = (el, id, it)=>{
	timeLeft[id] += it;
	el[0].innerHTML = processNumbers(timeLeft[id] / (1000 * 60 * 60 * 24));
	el[1].innerHTML = processNumbers((timeLeft[id] / (1000 * 60 * 60) % 24));
	el[2].innerHTML = processNumbers((timeLeft[id] / (1000 * 60) % 60));
	el[3].innerHTML = processNumbers((timeLeft[id] / 1000 % 60));
}


execute(elements, 0, 0);
execute(elements2, 1, 0);
execute(elements3, 2, 0);
execute(elements4, 3, 0);
setInterval(() => {
	execute(elements, 0, -1000);
	execute(elements2, 1, 1000);
	execute(elements3, 2, 1000);
	execute(elements4, 3, 1000);
}, 1000);