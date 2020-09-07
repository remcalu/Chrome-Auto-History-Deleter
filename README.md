# Chrome History Auto Deleter Extension

## Author
Remus Calugarescu

## Last Major Modification
September 7, 2020

## Purpose
This is an extension that automatically deletes history on startup, that includes certain blacklisted words as a substring, which can be entered in the options 
section of the chrome extension. There are also a few other functionalities that have been added like the ability to clear history within last minute or last hour.

![Options](https://i.imgur.com/T4ZTQZy.gif)

## Installation Instructions
Go to chrome and click the 3 vertical dots near the top right of the window, then hover over 'More tools' and click 'Extensions'. First enable developer
mode near the top right of the window, Then you need to click 'Load unpacked and select the 'History Deleter' folder.

## Instructions
To use the chrome extension you must first go to the options page by right clicking the extension, which is situated on the extensions bar on chrome, and then click
"options" on the drop down menu. Once you reach that page you can enter various words into the textbox and click "add" to add them to the blacklist. To modify the list,
you can either select blacklisted words via the checkbox beneath them, and then click "clear selected items", or you can clear the whole list by clicking "clear list".
Once you add a list, the next time chrome launches, it will erase all links that contain the blacklisted words as substrings.

## Notes
- The search is not case sensitive
- Currently due to unknown issues with the chrome history API it sometimes only deletes history that is older than 2-3 days old
- History is deleted every time chrome is launched for the first time, as in when there are no more chrome tasks in task manager and then it is launched
