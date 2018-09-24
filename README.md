# Honesto
Honesto is a web app that allows a company to define a list of questions for people to give feedback to each other.

# Plan of Action
For the purposes of prototyping and given the limited about of time available I plan on implementing the following features:
* A static list of questions based on the spreadsheet provided: https://docs.google.com/spreadsheets/d/1oxrnA3nSBRkzYS0nxvlz1MPRpgxZtO3crdomirAoNN4/edit#gid=0
* No login or authentication. The prototype will be presented as if you are already logged in as a particular user.
* A single simple loader for any loading state.
* I'll use Contenful to create a fairly flat data model to give me an api to work with
* I'll use Netlify to host the project
* I'll prioritize the Share Feedback experience over the My Feedback experience. More detail in next sections below.

## Share Feedback List
* Provide a share feedback list for users you can share feedback on. List view will provide a link to the questions for you to answer. The link may not represent the state of feedback via Fill Out vs. View Submission buttons in design.
* Filtering by feedback period won't be implemented. Will either be omitted from the design or displayed as disabled.
* A static list of users will be implemented due to time contraints.

## Share Feedback Detail
* Questions will be presented on a single screen instead of multiple screens due to time constraints.
* I'll only implement one question type to start due to time contraints. I suggest that we use a open ended text area for recieving feedback for now.
* No progress bar will be presented to indicate the number of questions answered or it will be displayed as disabled or an example.
* No rating or flagging of questions will be implemented due to time contraints.
* Skipping a question won't be implemented. All questions must be answered or all allowed to be skipped.

## My Feedback
* Depending on available time, I may not get to too much of this.
* As a first pass, I may set this up to send out an email when another user completes the shared feedback detail.
* No feedback period filtering
* No Published/Unpublished status level distinction
* No new status distinction
* No hover detail on answers

## Other Design Aspects
* The header will be simplified to the Honesto app name and navigation for Share Feedback and My Feedback.
* The header will omit Team Feedback and Teams navigation as well as Next Feedback Cycle and logged in user info.
* 404 page will be generic provided by Netlify

# Given more time, things I'd consider
* These app reminds me a lot of surveys like Survey Monkey provides. Given more time I'd explore integrating with something like Survey Monkey accordingly.
* Functionality will be prioritized over design, but I'll do my best to make it look good, but design will probably be what I work on last.