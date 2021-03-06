const londonURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=0.1278&APPID=5d0bfe5cb3340bdfed8acebf9b45ddfe&units=imperial"
const seattleURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=47.6762&lon=-122.3182&units=imperial&APPID=5d0bfe5cb3340bdfed8acebf9b45ddfe"
const seattle = "Seattle"
const london = "London"
const userMessage = "your area"

window.onload = function() {

}

var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

function getWeather(city) {
	console.log(city)
	document.getElementById("container").innerHTML = ""
	let h4 = document.createElement("h4")
	h4.innerHTML = "Today in " + city + ":"
	document.getElementById("container").appendChild(h4)
}

function getSeattleWeather() {
	getWeather(seattle)
	callApi(seattleURL)
}

function getLondonWeather() {
	getWeather(london)
	callApi(londonURL)
}

// Generic reusable weather api call function
function callApi(city) {
	let request = new XMLHttpRequest()
	request.open("GET", city, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
	return request
}

function onLoadFunc() {
	const resp = JSON.parse(this.response)
	console.log(resp)
	printListItem("Conditions: " + resp.weather[0].main)
	printListItem("Current Temperature: " + resp.main.temp + " °F")
	printListItem("Max Temperature Today: " + resp.main.temp_max + " °F")
	printListItem("Min Temperature Today: " + resp.main.temp_min + " °F")
	displayIcon(resp)
	let currentRawTime = resp.dt * 1000
	let currentTime = new Date(currentRawTime)
	console.log(currentTime)
	printListItem("Time of Most Recent Forecast: " + currentTime)
	// printListItem("Local Time: " + resp.dt )

}

function onerrorFunc() {
	console.log("Oh No!")
}

function printListItem(message) {
	let p = document.createElement("p")
	p.innerHTML = message
	document.getElementById("container").appendChild(p)
}

// To get weather icon ID and use it to display weather icon from URL"
function displayIcon(data) {
	document.getElementById("iconContainer").innerHTML = ""
	let div = document.createElement("div")
	div.innerHTML = ""
	let iconID = data.weather[0].icon
	let iconURL = `http://openweathermap.org/img/w/${iconID}.png`
	div.innerHTML = `<img src="${iconURL}">`
	document.getElementById("iconContainer").appendChild(div)
}

// To get weather report for user's location
function getUsersWeather() {
	getWeather(userMessage)
	navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError)
}

// Finds users location, feeds to get weather function
function getLocation(locObj) {
	let mapUri = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=${locObj.lat}&lon=${locObj.lng}&units=imperial&APPID=5d0bfe5cb3340bdfed8acebf9b45ddfe`
	console.log(mapUri)
	callApi(mapUri)
}
 // Converts results from navigator.geolocation call to usable object
function geolocSuccess(position) {
	const newPos = {lat: position.coords.latitude, lng: position.coords.longitude}
	console.log(newPos)
	getLocation(newPos)
}

function geolocError() {
	console.log("Error getting user's location.")
}

// $("#sunrise").text(new Date(objWeather.sys.sunrise * 1000).toLocaleTimeString());
// $("#sunset").text(new Date(objWeather.sys.sunset * 1000).toLocaleTimeString()); 


