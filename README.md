# 19 Progressive Web Applications (PWA): Budget Tracker

When dealing with important subjects such as budgeting, it is vital for users to be able to access their financial information and update their budget even when they find themselves in areas where data connections are rather spotty. That is why I was given the task of taking the given code for a budgeting application and adding the necessary code for working offline, saving data to IndexDB, and even accessing this application through a downloadable PWA. 

By developing the necessary service worker javascript, a manifest.json, and an IndexDb file, I was successfully able to launch this application via Heroku in conjunction with MongoDB. In other words, users are able to add expenses and deposits to their budget with or without a connection. 


## Given: User Story

```md
AS AN avid traveller
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling 
```

## Given: Acceptance Criteria

```md
GIVEN a Budget Tracker without an internet connection
WHEN the user inputs an expense or deposit
THEN they will receive a notification that they have added an expense or deposit
WHEN the user reestablishes an internet connection
THEN the deposits or expenses added while they were offline are added to their transaction history and their totals are updated
```
## Demo 
![Demo showing offline functionality](./img/1.gif)


## Links

* Heroku Page: https://the-grand-budgeter.herokuapp.com/ 

* Github Repo: https://github.com/jaime-gg/budget-tracker 