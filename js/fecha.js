const elements = [
	"days",
	"hours",
	"minutes",
	"seconds"
]
const currentDate = new Date();
// If the date is after May 17th, set the current year + 1, otherwise set the current year
let currentYear = (currentDate.getMonth() > 4 || (currentDate.getMonth() == 4 && currentDate.getDate > 17)) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
const targetDate = new Date(`May 17, ${currentYear} 00:00:00`);
let timeLeft = targetDate - currentDate;
const countdown = document.querySelector(".countdown");
const days = document.querySelector("#days");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
// Days is the number of days left in the countdown
days.innerHTML = timeLeft / (1000 * 60 * 60 * 24);
hours.innerHTML = timeLeft / (1000 * 60 * 60) % 24;
minutes.innerHTML = timeLeft / (1000 * 60) % 60;
seconds.innerHTML = timeLeft / 1000 % 60;
// Update the countdown every second
const processNumbers = (x)=>{
	x = Math.floor(x);
	return (x < 10) ? `0${x}` : x;
}
setInterval(() => {
	timeLeft -= 1000;
	days.innerHTML = processNumbers(timeLeft / (1000 * 60 * 60 * 24));
	hours.innerHTML = processNumbers((timeLeft / (1000 * 60 * 60) % 24));
	minutes.innerHTML = processNumbers((timeLeft / (1000 * 60) % 60));
	seconds.innerHTML = processNumbers((timeLeft / 1000 % 60));
}, 1000);

