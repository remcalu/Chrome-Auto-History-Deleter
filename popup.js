// Variable declartions
const kMillisecondsPerMin = 1000 * 60;
const kMillisecondsPerHour = 1000 * 60 * 60;
const kOneMinAgo = (new Date).getTime() - kMillisecondsPerMin;
const k10MinAgo = (new Date).getTime() - kMillisecondsPerMin * 10;
const k30MinAgo = (new Date).getTime() - kMillisecondsPerMin * 30;
const kOneHourAgo = (new Date).getTime() - kMillisecondsPerHour;
const kOneDayAgo = (new Date).getTime() - kMillisecondsPerHour * 24;

let $ = document.getElementById.bind(document);
let i;

// Goes through the chrome.history.search() data and deletes the urls
function checkHistory(historyItems) {
	for (let item of historyItems) {
		chrome.history.deleteUrl({
			url: item.url
		});
	}
}

// Confirms when an action has been completed for the deleteRange method
function consoleConfirm() {
	console.log("Action completed");
}

// Clears history according to entries from the list when pressed
$('clearHistoryPopup').onclick = function () {
	chrome.storage.sync.get({
			list: []
		},
		function (data) {
			for (i = 0; i < data.list.length; i++) {
				let searchString = data.list[i].toString();
				chrome.history.search({
					text: searchString,
					startTime: 0,
					maxResults: 0
				}, checkHistory)
			}
		});
}

// Clears history that has been stored within the last minute
$('clearHistoryMin').onclick = function () {
	chrome.history.deleteRange({
		startTime: kOneMinAgo,
		endTime: Date.now()
	}, consoleConfirm);
}

// Clears history that has been stored within the last 10 minutes
$('clearHistory10Min').onclick = function () {
	chrome.history.deleteRange({
		startTime: k10MinAgo,
		endTime: Date.now()
	}, consoleConfirm);
}

// Clears history that has been stored within the last 30 minutes
$('clearHistory30Min').onclick = function () {
	chrome.history.deleteRange({
		startTime: k30MinAgo,
		endTime: Date.now()
	}, consoleConfirm);
}

// Clears history that has been stored within the last hour
$('clearHistoryHour').onclick = function () {
	chrome.history.deleteRange({
		startTime: kOneHourAgo,
		endTime: Date.now()
	}, consoleConfirm);
}

// Clears history that has been stored within the last day
$('clearHistoryDay').onclick = function () {
	chrome.history.deleteRange({
		startTime: kOneDayAgo,
		endTime: Date.now()
	}, consoleConfirm);
}