# Telstra API Challenge

## Project Requirements
### Given the brief was to:
- Write and API to connect to a DB
- Return a response
- Have information about cars
    - In a specific area
- Be extensible to other vehicles without major changes
- Did not need a UI

### With the following Requirements:
- Preferably use JS
- MUST have a GET call, expansion is welcomed
- Use GIT to upload as needed for Source code & CD/CS
- Could use Express or other libraries
- Could return a mixture of cars and other data such as;
    - cars in area "x" 
    - types of cars
    - preference of transport

With a major focus on scaleability and extensibility.
Preferable with testing built in

---

## Planning

My initial thoughts were:
- no code should mention cars specifically, as this should be able to be easily extensible
- if scale is important I'll need to factor that into the DB design, this could end up handing all sorts of vehicles along with be used over wider regions
- the comparison of data would mean that seperating the concerns into different tables would be wise as they can we worked on independantly
- mixed calls would mean using routes with different parameters
- While I would like to use TDD, given the variables and time I'll need to focus on implementation first of basic calls, then add testing if time allows. If I don't get time I should make notes a a few sample tests to demonstrate the path desired.

## What I'd do differently with more time
- Split the postcode table back off and integrate it with more planning to confim the data is valid via regex and testing
- refactor a lot of the code with .map for searcing through the seperated table to confirm a match is found
- rename for greater clarity and expansion use (E.g. use vehicle instead of car, unless that was specified, changing routes base on params)
- split a lot of the repetitive code inso smaller self-contained controller fucntions that could be called.

## Implementation
I began by breaking down the design into:
Backend = nodeJS
DB = Postgres
Framework = Express

Testing initially through Postman
If possible add jest unit testing later

1) I then created the folders and made a Github for project management.
2) Made some test calls to a testing DB to confirm the connection
3) populated the cars DB with some data
4) confirmed the genereic post and get request were working via Postman
5) reminded myself to post to github!
6) I changed the postcode to be a part of the cars database (the DB crossover was proving troublesome to implement as you needed to be able to have postcode that could also have different names)
7) I tested repeatedly in Postman
8) reminded myself again to post to github!
9) updated the naming of the routes to allow for greater expansion and easy modification


