$(document).ready(function() {
    let city = $("#searchTerm").val();

    const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";

    let date = new Date();

    $("#searchTerm").on("click", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
		    $("#searchBtn").click();
	    }
    });

    // getting the user input value, then clear the input box, and pull url to call API
    $("#searchBtn").on("click", function() {
        $('.col-lg-12').addClass('show');
        city = $("#searchTerm").val();
  
        $("#searchTerm").val("");

        const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            let tempF = (response.main.temp - 273.15) * 1.80 + 32;

            currentWeatherCondition(response);
            currentWeatherForcast(response);
            makeCityList();
            saveSearchHistory();
        });
    });

    function makeCityList() {
        let listItem = $("<li>").addClass("list-group-item").text(city);
        listItem.attr('value', city);
        $("ul.list").append(listItem);
    }

    // saving the search history in the local storage
    function saveSearchHistory() {
        const listCity = [];
        $("li").each(function() {
            listCity.push(this.innerHTML);
        });
        localStorage.setItem('savedHistory', JSON.stringify(listCity));
    }

    // displaying the searched city saved in the local storage
    savedHistory();

    function savedHistory() {
        if (localStorage.getItem('savedHistory')) {
            const listCity = JSON.parse(localStorage.getItem('savedHistory'));

            for(i of listCity) {
                let listItem = $("<li>").addClass("list-group-item").text(i);
                listItem.attr('value', city);
                $("ul.list").append(listItem);
            };
        }
     }

    //  showing the weather condition when clicked on the search history
     $(document).on('click','li.list-group-item', function() {
        city = this.innerText;
        $('.col-lg-12').addClass('show');
  
        const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
        //console.log(response);

           let tempF = (response.main.temp - 273.15) * 1.80 + 32;
            currentWeatherCondition(response);
            currentWeatherForcast(response);
        });
     });

    // displaying current weather condition by converting the temperature to farenheit
    function currentWeatherCondition (response) {
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        tempF = Math.floor(tempF);

        $('#currentCity').empty();

        // setting the content and adding to the page
        const card = $("<div>").addClass("card");
        const cardBody = $("<div>").addClass("card-body");
        const city = $("<h4>").addClass("card-title").text(response.name);
        const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
        const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
        const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
        const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
        const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

        city.append(cityDate, image);
        cardBody.append(city, temperature, humidity, wind);
        card.append(cardBody);
        $("#currentCity").append(card);
    }

    // displaying current forecasted weather condition for next 5 days
    function currentWeatherForcast (response) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + response.name + apiKey,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            $('#forecast').empty();

            let forcast = response.list;

            for (let i = 0; i < forcast.length; i++) {
                let day = Number(forcast[i].dt_txt.split('-')[2].split(' ')[0]);
                let hour = forcast[i].dt_txt.split('-')[2].split(' ')[1];

                if(forcast[i].dt_txt.indexOf("12:00:00") !== -1) {
                    
                    const forecastDate = forcast[i].dt_txt;
                    function parseISOString(s) {
                        const b = s.split(/\D+/);
                        const formattedDate = b[1] + "/" + b[2] + "/" + b[0];
                        return formattedDate;
                    }

                    let temp = (forcast[i].main.temp - 273.15) * 1.80 + 32;
                    let tempF = Math.floor(temp);

                    const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                    const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                    const cityDate = $("<h4>").addClass("card-title").text(parseISOString(forecastDate));
                    const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                    const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + forcast[i].main.humidity + "%");

                    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + forcast[i].weather[0].icon + ".png")

                    cardBody.append(cityDate, image, temperature, humidity);
                    card.append(cardBody);
                    $("#forecast").append(card);

                }
            }
        });

    }

    $(window).on('load',function() {
        const savedWeather = JSON.parse(localStorage.getItem("savedHistory"));
        if(savedWeather !== null) {
            const i = savedWeather.length - 1;
            const city = savedWeather[i];
            $('.col-lg-12').addClass('show');
    
            const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    
            $.ajax({
                url: queryUrl,
                method: "GET"
            }).then(function (response) {
                let tempF = (response.main.temp - 273.15) * 1.80 + 32;
                currentWeatherCondition(response);
                currentWeatherForcast(response);
            });
        }
        
    });
});

