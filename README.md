# Digital-Back-Office-Task

>`Shift Booking Application `


# Implementation Details

  Clone or download the provided starter repository for the Shift Booking Application.
  Navigate to the project directory and install dependencies using the command for both frontend and backend.
>`npm install`

And Ensure you set your API_URL in the apiconfig.js file in the frontend and host IP address in the server.js file in the backend.

# Frontend
>`apiconfig.js`
export const API_URL = 'http://192.168.23.61:8080';

# Backend
>`server.js`

const server = new Hapi.Server({
  host: '127.0.0.1', //You host IP address 
  port: '8080',
  routes: {
    cors: { origin: '*' },
  },
});

Run the start command >`npx expo start`

Use emulator or your own device or install expo go for andriod to run the application.



