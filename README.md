# startup specification
## Elevator Pitch
Aloha! Today I would like to introduce my startup website, X Grid O. Have you ever wanted to play tick tack toe but no one is available to play? Well X Grid O allows you to play tick tack toe against a program so you can hone your skills for the next time you see your friends. X Grid O is a free to play application but as it's poppularity grows, I plan to release a online multiplayer option which will cost $5 to have permanant access.

## Key Features
- Unique login name
- Colour changing 
- PvP(TBD)
- Game count(wins and loses)
- Player log in chat

## Technologies 
1. HTML
    - This will organize the look of the website for the login/create page as well as the main page where users will play the game.
2. CSS
    - This will animate the game itself with appearing symbols the user places as well as the colour they designate them to be.
3. JavaScript
    - This will allow users to click on the create tab to make their account for the first time. It will also allow them to log into an account they previously made.
4. Web service
    - This will call on another server to get the time so no matter what device someone is playing on, they'll be aware of how long they've been playing
5. Authentication
    - This will allow users to create a unique log in with a username and password. No email required.
6. Database persistence
    - This will keep track of the users scores when they log into their account to play.
7. Websocket
    - This will be a real time log of users who are logging in to play.
8. Web framework
    - This will be the icing on the cake that makes the website user friendly as well as visually pleasing.

## Project Design
![Alt text](20240115_115735.jpg)

## HTML Deliverable
For this section of my startup I:
* Created 4 HTML pages. The main page is where you log in, the account page is where you can create an account, the play page is where xgrido can be played, and the scores page is where players can see their win/lose counts as well as how long they've been playing and the weather in their area.
* For each page I also created links where if a player clicks login or create account they will be directed to either the play or account pages. There is also links at the top for players to click on if they want to direct themselves that way.
* Each time a player logs in, wins, or loses, a text will notify all current players of their status.
* I have a place holder image that will later change based on the weather that is in the current area of the player
* The login information will be stored along with the players win/lose count so everytime they log in they can keep track.
* The websocket will be real time log in and win/lose notifications of other players.
    