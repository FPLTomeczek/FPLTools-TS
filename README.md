# **FPLTools** - App with tools to improve Fantasy Premier League users gameplay

## Live

[FPLTools](https://fpltools.onrender.com)

## Features

### Done

:white_check_mark: :books: Transfer Planner - The main feature of the app, it enables to manipulate on users exactly like on official FPL app, but the team for every gameweek can be saved and user can make changes to their team for actual and future gameweeks.

There are 2 available drafts, user can manipulate on own team by choosing one of the drafts and compare to the other one.

List of all players contains all players from FPL game, every element has primary info about player and player from list can be added to the draft. After making transfers, user can view summary of transfers.

DEMO - Feature available when season is off, it simulates transfer planner functionality without passing an user ID

![Transfer-Planner](./assets/images/readme/tf.png?raw=true)<br/>

:white_check_mark: :calendar: Calendar -

1. :stopwatch: Timer, which displays exact time to next FPL deadline.
2. Fixture Difficulty Ranking for all the fixtures throughout whole season, user can analyze fixtures to narrow down possible transfers to their squad. Each fixture is displayed with info about difficulty and placement of played match.

Fixture Difficulty:

- Colors:
  - :green_square: - Easy;
  - :white_large_square: - Medium;
  - :orange_square: - Hard;
  - :red_square: - Very Hard;

<br/>

- Placement:
  - (H): Home :stadium: <br/>
  - (A): Away :airplane:
    <br/>
    <br/>

![FDR-Schedule](./assets/images/readme/calendar.png?raw=true)<br/>

:white_check_mark: :book: Blog -

Blog is feature when I plan to post my FPL squad updates for every gameweek but as of now it consists of mocked posts to simulate the behavior of blog

### In Progress

:large_orange_diamond: :bar_chart: Players Rankings: Predict player chances to score, get an assist or keep a clean sheet.

As of now the UI and all filtering functionality is done, but there is no real data for player chances to score, all of them are fake. My plan was to retrieve data from some bookie API, but all of them require payment for API calls. I will implement this feature when i find some API with low cost. If you know one, please give me an info :D
<br>

![Player-Rankings](./assets/images/readme/player-rankings.png?raw=true)<br/>

### Plans

:white_circle::hammer_and_wrench: CMS - Content Management System, I want to implement my own CMS to manage blog posts and api calls such as updating FPL data

## About

Project is created in **MERN** stack (React + TS). Data fetched from backend is provided by [FPL API](https://fantasy.premierleague.com/api/bootstrap-static/), data related to all users is stored in database. For data related to specific user backend server acts like proxy server.

Link to backend project: [FPLTools backend](https://github.com/FPLTomeczek/BackendFPLToolsV2)
