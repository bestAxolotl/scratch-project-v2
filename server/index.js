require('dotenv').config();
const express = require('express')
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const server = http.createServer(app);
const PORT = 8000;
const db = require('./database');
const eventController = require('./event-controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


//---------- Login Page Routes --------------------------

//Create account button route
app.post('/auth/create', eventController.createAccount);

//Login button route
//###Route not connected awaiting loginpage creation
//app.post('/auth/login', eventController.login);

//---------- Create Activity Page Route -----------------

//Create activity button route
app.post('/createactivity', eventController.createActivity);

//###Create functionality to link map and chain to above ADD eventController.generateLatAndLong


//---------- Routes on Welcome and Search Page Routes -------

//Search activities route
app.post('/activities', eventController.activitySearch);

//Activity detail display route, accessable once search is populated
app.get('/activity/:id', eventController.captureAndStoreActivityData, eventController.captureAndStoreCreatorData, eventController.captureAndStoreUserDataReturnAll)


//---------- Routes on the Activity Detail Page  ---------------

//Confirm participation + save to profile route
app.post('/activity/:id/confirm', eventController.confirmParticipation);

//Save event as a maybe to profile route
app.post('/activity/:id/interested', eventController.saveAsInterested);

//Submit chat text route
app.post('/activity/:id/submit', eventController.submitChatText);

//View event creator and attendee profile route
app.get('/profile/:id', eventController.viewProfile);


server.listen(PORT, () => {
  console.log(`Connected and listening on ${PORT}`);
})