# weather-history-dashboard
## Full Stack Development Tutorial - Part 3
This tutorial uses the OpenWeatherMap API key, databases, and data created in parts 1 and 2 of this tutorial series. If you have not completed the work in the first two tutorials, this project will not work.  

## Framework: Vue 2 + Vuetify
## Demo
A working demonstration of this web application can be found [here](https://weathertrend.infovitale.org). This is a responsive app and works well on mobile devices.  

## Installation  
    git clone https://github.com/seale61/weather-history-dashboard.git
    cd weather-history-dashboard
    npm install

## Prerequisites

This app requires the installation of it's associated API (tutorial part 2) running as a service. An upcoming tutorial will be provided on how to install a node RESTful API as a service.  

This app will also require that you create a **.env** file that will include your OpenWeatherMap.Com API key. This file should be created in your project's root directory and should contain the following line:

    VUE_APP_WEATHERKEY=YOUR_OPENWEATHERMAP_API_KEY

## Features  
This dashboard provides charts that display the maximum and minimum values for temperature, humidity, and atmospheric pressure for a selected city over a given period of time. The cities that are available for monitoring are the ones selected in the script created in part 1 of this series (weather-project-backend).  

In addition to the primary charting page, this app also has an "About" page, and an option to change the theme from "dark" to "light." These are included to give the student a quick introduction to some of the easy to implement feautures of Vuetify.
