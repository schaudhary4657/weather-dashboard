# week6-weather-dashboard

Weather Dashboard is an application that uses another application's API to retrieve data. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. This application is a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS powered by jQuery. This weather dashboard uses the OpenWeather API to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions.

This application accepts user-input city names and then gets current and forecasted weather data from the OpenWeather API, and displays it on the page. Weather dashboard uses AJAX to hook into the API to retrieve data in JSON format. It displays date, temperature, an icon representation of weather conditions, humidity, and wind speed. It saves selected cities for ease of access, and stores them in local storage for subsequent page visits. The page also displays appropriate icons to match weather conditions. Weather dashboard uses localStorage to store any persistent data.

# User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

# How to start
* Displays a weather dashboard with form inputs
* WHEN the user search for a city THEN is presented with current and future conditions for that city and that city is added to the search history
* WHEN the user view current weather conditions for that city THEN is presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
* WHEN the user view future weather conditions for that city THEN is presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
* WHEN the user click on a city in the search history THEN again is presented with current and future conditions for that city
* WHEN the user open the weather dashboard THEN is presented with the last searched city forecast
