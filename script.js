const londonURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=0.1278&APPID=5d0bfe5cb3340bdfed8acebf9b45ddfe&units=imperial"
const seattleURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=47.6762&lon=-122.3182&units=imperial&APPID=5d0bfe5cb3340bdfed8acebf9b45ddfe"

window.onload = function() {
	console.log("linked")
}

function getSeattleWeather() {
	document.getElementById("container").innerHTML = ""
	console.log("clicked on Seattle")
	let h4 = document.createElement("h4")
	h4.innerHTML = "Today in Seattle:"
	document.getElementById("container").appendChild(h4)
	let request = new XMLHttpRequest()
	request.open("GET", seattleURL, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
}

function getLondonWeather() {
	document.getElementById("container").innerHTML = ""
	console.log("clicked on Seattle")
	let h4 = document.createElement("h4")
	h4.innerHTML = "Today in London:"
	document.getElementById("container").appendChild(h4)
	let request = new XMLHttpRequest()
	request.open("GET", londonURL, true)
	request.onload = onLoadFunc
	request.onerror = onerrorFunc
	request.send()
}

function onLoadFunc() {
	const resp = JSON.parse(this.response)
	console.log(resp)
	printListItem("Conditions: " + resp.weather[0].main)
	printListItem("Current Temperature: " + resp.main.temp + " °F")
	printListItem("Max Temperature Today: " + resp.main.temp_max + " °F")
	printListItem("Min Temperature Today: " + resp.main.temp_min + " °F")
}

function onerrorFunc() {
	console.log("Oh No!")
}

function printListItem(message) {
	let p = document.createElement("p")
	p.innerHTML = message
	document.getElementById("container").appendChild(p)
}
