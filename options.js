// Author: Remus Calugarescu
// Last Modified: June 18, 2020

// Variable declartions
let $ = document.getElementById.bind(document);
let listDiv = document.getElementById('listDiv'); // Declares variable to respresent element from HTML file
let updateValue;
let i;

// Function definitions
// Goes through the chrome.history.search() data and deletes the urls
function checkHistory(historyItems) {
    for (let item of historyItems) {
        chrome.history.deleteUrl({
            url: item.url
        });
    }
}

// Gets the list from chrome storage sync and constructs a list visually using the data
function outputList() {
    chrome.storage.sync.get({
        list: [] 
    }, function(data) {
        constructList(data.list)
    });
}

// Updates the list when a new substring is blacklisted, also sorts the list alphabetically and updates the sync storage, then it outputs the new list after refreshing the page
function update(array, updateValue) {
    array.push(updateValue);
    array.sort();
    chrome.storage.sync.set({
        list: array
    }, function() {
        console.log("added to list with new values");
    });
    window.location.reload();
    outputList();
}

// Constructs the list by using the template, the template contains the word and the checkbox for each blacklisted entry. At the end it appends a new element to the document
function constructList(listItems) { 
    let template = $('listTemplate'); 

    for (i = 0; i < listItems.length; i++) { 
        let itemName = template.content.querySelector('.itemName, p')
        itemName.innerText = "'" + listItems[i] + "'";

        var clone = document.importNode(template.content, true); 
        listDiv.appendChild(clone); 
    }
}

// Checks if theres only spaces in the string, if yes then returns true
function onlySpace(string) {
    for (i = 0; i < string.length; i++) {
        if (string[i] != ' ') {
            return (false);
        }
    }
    return (true);
}

// Main code
outputList();

// When chrome is launched for the first time, it performs a clearing of history according to the blacklisted entries in the options page by accessing the sync storage and getting the list
chrome.runtime.onStartup.addListener(function() {
    chrome.storage.sync.get({
            list: []
        },
        function(data) {
            for (i = 0; i < data.list.length; i++) {
                let searchString = data.list[i].toString();
                chrome.history.search({ 
                    text: searchString, 
                    startTime: 0, 
                    maxResults: 0
                }, checkHistory)
            }
        });
});

// When 'Add' is pressed in the options page it gets the list from sync storage, checks if the new entry to be added is already in the list, only has spaces, or if its greater than 500 chars, if it passes then it is added to the list
$('addSubmit').onclick = function() { 
    let addQuery = document.getElementById('addElement').value
    chrome.storage.sync.get({
            list: []
        },
        function(data) {
            if (data.list.includes(addQuery) == true) {
                alert("Error, string is already in the list");
                console.log("Error, string is already in the list");
            } else if (addQuery.length >= 500) {
                alert("Error, string is larger than 500 characters");
                console.log("Error, string is larger than 500 characters");
            } else if (onlySpace(addQuery) == true) {
                alert("Error, string must not contain only whitespace");
                console.log("Error, string must not contain only whitespace");
            } else {
                update(data.list, addQuery); 
            }
        });
}

// When 'Clear List' is pressed it clears all sync storage and refreshes the window 
$('clearList').onclick = function() {
    chrome.storage.sync.clear();
    window.location.reload();
}

// When 'Clear Selected Items' is pressed it finds which boxes have been ticked off, and then deletes the entries from the list
$('clearSelected').onclick = function() {
    let checkboxes = document.getElementsByClassName('removeCheck');
    let spliceCompensate = 0;
    chrome.storage.sync.get({
            list: []
        },
        function(data) {
            for (i = 0; i < checkboxes.length; i++) {

                if (checkboxes[i].checked == true) { 
                    data.list.splice(i - spliceCompensate, 1);
                    chrome.storage.sync.set(data);
                    spliceCompensate++;
                }
            }
        });
    window.location.reload();
}