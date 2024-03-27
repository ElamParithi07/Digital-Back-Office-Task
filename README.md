# Digital-Back-Office-Task

>`Shift Booking Application `
>
# Introduction
  This documentation outlines the implementation details and submission instructions for the Shift Booking Application assignment using React Native. The application utilizes a provided mock API for fetching and managing shift data.

# Implementation Details

  Clone or download the provided starter repository for the Shift Booking Application.
  Navigate to the project directory and install dependencies using the command for both frontend and backend.
>`npm install`
  And Ensure you set your API_URL in the apiconfig.js file in the frontend and host api address in the server.js file in the backend.

# Frontend
>`apiconfig.js`
> export const API_URL = 'http://192.168.23.61:8080';

# Backend
>`server.js`
>const server = new Hapi.Server({
  host: '127.0.0.1', //You host IP address 
  port: '8080',
  routes: {
    cors: { origin: 'ignore' },
  },
});

Run the start command >`npx expo start`
Use emulator or your own device or install expo go for andriod

# Features
  The Shift Booking Application consists of two main views:

# My Shifts View:

  Lists all booked shifts.
  Shifts are grouped by dates.
  Allows users to cancel booked shifts.
  
# Available Shifts View:

  Filters shifts by city.
  Shifts are grouped by dates.
  Allows users to book or cancel available shifts.
  
# Technology Stack
  React Native: Frontend framework for building cross-platform mobile applications.
  Styled Components: Library for styling React components with CSS.

