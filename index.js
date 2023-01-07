
let month1;
const findmonth = (integer) => {
	if(integer == '01'){
		month1 = 'January';
	}
	else if(integer == '02'){
		month1 = 'February';
	}
	if(integer == '03'){
		month1 = 'March';
	}
	if(integer == '04'){
		month1 = 'April';
	}
	if(integer == '05'){
		month1 = 'May';
	}
	if(integer == '06'){
		month1 = 'June';
	}
	if(integer == '07'){
		month1 = 'July';
	}
	if(integer == '08'){
		month1 = 'August';
	}
	if(integer == '09'){
		month1 = 'September';
	}
	if(integer == '10'){
		month1 = 'October';
	}
	if(integer == '11'){
		month1 = 'November';
	}
	if(integer == '12'){
		month1 = 'December';
	}
}

let quotes;
const makequotes = (timing) => {
	if(Number(timing) >= 6 && Number(timing) <= 10){
		background_video.src = "./static/early morning.mp4";
		quotes = "A new morning gives you a nwe opportunity to make someone's day better";
	}
	else if(Number(timing) > 10 && Number(timing) <= 15){
		background_video.src = "./static/afternoon.mp4";
		quotes = "Good job half the day is over!! Take a break and Continue the work";
	}
	else if(Number(timing) > 16 && Number(timing) <= 19){
		background_video.src = "./static/evening.mp4";
		quotes = "Evenings are sweet, between the harsh light of day and the dead darkness of night";
	}
	else if ((Number(timing) > 20 && Number(timing) <= 24)||(Number(timing) >= 1 && Number(timing) < 6)){
		background_video.src = "./static/night-scene.mp4";
		quotes = "Get a good night's sleep and tomorrow will be great a day once again";
	}
}

const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '43260fc81emsh330fc20b9e3e91ep16d977jsn3703bca021c2',
		'X-RapidAPI-Host': 'world-time-by-api-ninjas.p.rapidapi.com'
	}
};

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '43260fc81emsh330fc20b9e3e91ep16d977jsn3703bca021c2',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

let AMPM;
let first;

const settime = (hour) => {
	if (Number(hour) >= 12){
		AMPM = "PM";
		if (Number(hour) > 12){
			first = Number(hour) - 12;
		}
		else{
			first = Number(hour);
		}
	}
	else{
		AMPM = "AM";
		first = Number(hour);
	}
}

const findweather = (city) => {
	fetch('https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?city='+city, options1)
	.then(response => response.json())
	.then((response) => {
		console.log(response)

		curr_day.innerHTML = response.day_of_week;
		curr_date.innerHTML = response.day;
		findmonth(response.month)
		curr_month_year.innerHTML = month1 + "," + " " + response.year;
		settime(response.hour);
		makequotes(response.hour);
		time.innerHTML = first + " : " + response.minute + " " + AMPM;
		something.innerHTML = quotes;
	})
	.catch(err => console.error(err));

	fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+city, options)
	.then(response => response.json())
	.then((response) => {
		console.log(response)
	
		cloud_pct.innerHTML = response.cloud_pct;
		feels_like.innerHTML = response.feels_like;
		humidity.innerHTML = response.humidity + "<sub>%</sub>";
		max_temp.innerHTML = response.max_temp + "&deg;C";
		min_temp.innerHTML = response.min_temp + "&deg;C";
		sunrise.innerHTML = response.sunrise;
		sunset.innerHTML = response.sunset;
		temp.innerHTML = response.temp;
		temp2.innerHTML = response.temp + "&deg;C";
		wind_degrees.innerHTML = response.wind_degrees;
		wind_speed.innerHTML = response.wind_speed + "km/hr";
		cityname.innerHTML = city;
		let common3;
		if(response.humidity<=20 && response.temp>=35){
			common3 = "./static/hot.png";
		}
		else if(response.humidity<=20 && response.temp<=12){
			common3 = "./static/cold.png"
		}
		else if(response.temp <= 12){
			common3 = "./static/too-cold.png"
		}
		else if(response.humidity<=20 && response.temp>12){
			common3 = "./static/sunny.png";
		}
		else if(response.humidity<=40 && response.temp>12){
			common3 = "./static/partly-cloudy.png"
		}
		else if(response.humidity<=60 && response.temp>12){
			common3 = "./static/shower.png"
		}
		else if(response.humidity<=90 && response.wind_speed>50){
			common3 = "./static/storm.png"
		}
		else if(response.temp>35){
			common3 = "./static/hot.png"
		}
		else{
			common3 = "./static/partly-cloudy.png";
		}
		weather_image.src = common3;
	})
	.catch(err => console.error(err));
}

search.addEventListener("click", (e) => {
	e.preventDefault();
	console.log(input.value);
	findweather(input.value);
})

findweather("delhi");