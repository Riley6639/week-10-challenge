# Employee CLI application

## Contents 
- [description](#description)
- [usage](#usage)
- [installation](#installation)
- [development](#development)
- [challenges](#challenges)
- [contribution](#contribution)

## description
This project is a Command line application that utilizes databases on SQL to retrieve and input information. The purpose of this project is to be able to view employees, roles, and departments, as well as add to the database in the respected section. This is all done via the command line.

## usage
To use this application open the command line and use the commands npm run build and npm run start. Running these commands will build the dist folder where the start command will run the application from. This application was written using typescript so it will need to be converted to javascript before nodejs can successfully start it.
Here is the link to a video explaining the usage of the app. https://app.screencastify.com/v3/watch/ZTcRNyYJYAMElcCkOIRu 

## installation
Several npm packages will need to be installed for this application to work. They should be laid out in the package.json file so that all you will need to do is run the command npm install. The npm packages in question include inquirer, typescript, dotenv, console.table, and pg to connect to the database with a pool code. There are also several dev-dependencies needed in order to use these packages. 

## development
I started from scratch with this project so first I needed to create the file structure. I started by creating a package.json as well as a tsconfig.json file. I also needed a .env file to hold the information for my postgres login. I then set up the schema and seed files to construct my database. Next I began constructing the Cli class that would be the main logic for my application. It became apparent that I should also implement some interfaces for the role, employee, and department objects. I also had to add a gitignore file to make sure that not everything was being pushed and pulled from github. 

## challenges
The main challenges I had with this project was figuring out how to structure everything. I did not have a clear vision of what the file structure would look like, and I had to figure it out as I went. Another challenge was getting the Cli class to work properly and to go back to the main menu after certian functions were complete. Ultimately I used a switch to sort through the different cases. 

## contrubution 
This project is on a public github repository so any contributions can be made there by creating a new branch. 