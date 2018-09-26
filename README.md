# Honesto
Honesto is a web app that allows a company to define a list of questions for people to give feedback to each other.

# Plan of Action
For the purposes of prototyping and given the limited about of time available I plan on implementing the following features:
* A static list of questions based on the spreadsheet provided: https://docs.google.com/spreadsheets/d/1oxrnA3nSBRkzYS0nxvlz1MPRpgxZtO3crdomirAoNN4/edit#gid=0
* No login or authentication. The prototype will be presented as if you are already logged in as a particular user.
* A single simple loader for any loading state.
* I'll use Contenful to create a fairly flat data model to give me an api to work with.
* I'll use Netlify to host the project.
* I'll prioritize the Share Feedback experience.

## Share Feedback List
* Provide a share feedback list for users you can share feedback on. List view will provide a link to the questions for you to answer. The link may not represent the state of feedback via Fill Out vs. View Submission buttons in design.
* Filtering by feedback period won't be implemented. Displayed, but non-functional.
* A static list of users will be implemented.

## Share Feedback Detail
* Questions will be presented one at a time for users to answer.
* I'll implement 3 question types: Scale (range selector [1-10]), Multiple Choice (radio button [user can choose 1 answer]), and Textarea.
* Requiring a question to be answered won't be implemented. All questions are allowed to be skipped by clicking the Next button.
* No progress bar will be presented to indicate the number of questions answered.
* No rating or flagging of questions will be implemented.

## My Feedback
* I will not implement any of the My Feedback features in order to leave time for the Shared Feedback features.

## Other Design Aspects
* The header design will be implemented, but only the Honesto logo and Share Feedback links will be implemented.
* 404 page will be generic provided by Netlify.

# Things I couldn't complete
* Creating a custom range selector to match the design.
* Implementing the View Submission button to display 

# Things I'd consider
* These app reminds me a lot of surveys like Survey Monkey provides. Given more time I'd explore integrating with something like Survey Monkey accordingly.
* I would have spent more time modeling the data.
* I'd organize the code into more files.
* I'd use [Netlify Functions](https://www.netlify.com/docs/functions/) in order to keep my access token out of the client-side javascript.
* I'd look into using [Netlify Identity](https://www.netlify.com/docs/identity/) for user authentication.
