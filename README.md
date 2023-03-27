# Milk production company

## Introduction
The milk production company is in need of an internal web application to manage its daily operations efficiently. The web application will be designed to facilitate the recording and management of cow registration, medical examinations, birth registration, and daily milk production records.
The cow registration feature will allow the company to track each cow's unique identifier, entry date, and breed, which could be Holstein or Montbliard.

The recording of medical examinations feature will allow the company to keep track of each cow's health status.

The birth registration feature will allow the company to keep track of the number of mother cows and their calves' date of birth.

Finally, the daily milk production feature will allow the company to record the total amount of milk produced each day.

## Technical Details
The TurboRepo will be used to manage the codebase, dependencies, and version control of the application. It provides a streamlined way of managing multiple projects within a single repository, making it easier for the development team to manage and maintain the codebase.
The milk production company's internal web application will be built using a monorepo structure with TurboRepo. The monorepo structure will consist of two parts, a responsible-app, and a responsible-backend.

## Responsible App
The responsible-app will be the front-end application, which will provide an interface for the milk production company's employees to access and interact with the application's features. The responsible-app will be built using React.

## Responsible Backend
The responsible-backend will be the back-end application, which will handle all the server-side logic, including data storage and retrieval, authentication, and API endpoints. The responsible-backend will be built using Node.js and the Express.js framework, and using JSON file to store data.

## Apps

- `responsible-app`: a [React.Js](https://reactjs.org/) app
- `responsible-backend`: a expressJs [Express.js](https://expressjs.com/) app

## Technology Stack for Client App
Here is a list of the technology stack for a client-side:

- JavaScript - The programming language used for building the app.
- ReactJS - The primary JavaScript library for building user interfaces.
- Vite - A modern front-end build tool that is faster and more efficient compared to traditional build tools like Webpack.
- chakra-ui - A library for ui components.
- TurboRepo: is a monorepo management tool that aims to simplify the management of large and complex codebases. It enables developers to manage multiple projects and packages within a single repository.

## Technology Stack for Backend App
Here is a list of the technology stack for a server-side:

- JavaScript: JavaScript is a programming language that is widely used for building web applications. It is the primary language used for writing the backend logic in an Express.js application.
- Node.js: Node.js is a JavaScript runtime environment that allows developers to run JavaScript on the server-side. It provides a number of built-in modules that can be used to build web applications.
- Express.js: Express.js is a lightweight and flexible Node.js web application framework. It provides a simple interface for building web applications and APIs.
- RESTful APIs: Express.js is commonly used to build RESTful APIs. REST stands for Representational State Transfer, which is an architectural style for building web services.
- JWT: JWT (JSON Web Token) is a compact and self-contained mechanism for securely transmitting information between parties as a JSON object. It is commonly used for authentication and authorization in web applications.

## Requirement 
- [node](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Project Structure 
┌── `.husky` \
├── `.turbo` \
├── `apps` \
│   ├── `responsible-app` \
│   └── `responsible-backend` \
├── `.gitignore` \
├── `README.md` \
├── `package-lock.json` \
├── `package.json` \
└── `turbo.json`

## How To Use
From your command line, first clone the repository into your local machine:

```bash
# Clone this repository
$ git clone https://github.com/MezianeKhalil/milk-production-company.git
# Go to the project directory
$ cd milk-production-company
# Then remove current remote repository
$ git remote rm origin
# Then install dependencies
$ npm install
# Go to the responsible-app
$ cd apps/responsible-app
# Then install dependencies of responsible-app
$ npm install
# Then go back to root project
$ cd ../..
#Then 
$ cd apps/responsible-backend
# Then install dependencies of responsible-backend
$ npm install
# Then go back to root project
$ cd ../..
# then run the monorepo
$ npm run dev
```