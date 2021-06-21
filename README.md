# Data visulization for covid19

<img width="640" alt="Screenshot 2021-06-22 at 2 52 00 AM" src="https://user-images.githubusercontent.com/3234785/122829602-d3b33880-d304-11eb-914d-51ccd1acb9a1.png">

## Prerequisite
To run the project you need to have [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/) installed in your system. You can check that using 
```sh
node -v
npm -v
```
*Note that to build and run the app you need `node>=10.x.x`*

## Setup API server
Before running any script inside this directory please setup [API server](https://www.goole.com) to run the app locally. If you dont want to setup the app then please run the app in `production` mode, which will connet to the heroku API server. [API link](https://covid19-report-api.herokuapp.com/api)

## Available Scripts

In the project directory, you can run:

#### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run start`
Run the app in `production` mode. Before doing this you need to build the app.

This project is bootstrap with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) :heart_eyes: 
