document.addEventListener("DOMContentLoaded", () => {
    let search_form = document.getElementById("forcast_form");
    let address_form = document.getElementById("address");
   
    const location_container = document.getElementById("location_container");
    const cards_container = document.getElementById("cards_container");
    const error_container = document.getElementById("error_container");
    const forecast_card = document.getElementById("forecast_card"); 
    const weather_icon = document.getElementById("weather_icon");

    const error_form = document.getElementById("error");
    const location_form = document.getElementById("location");
    const forecast_form = document.getElementById("forecast");
    const temp_form = document.getElementById("temp");

    function resetCardTheme() {
        forecast_card.style.backgroundImage = "none";
        forecast_card.className = "border border-gray-200 p-4 rounded-lg bg-gray-50 shadow-sm bg-cover bg-center transition-transform duration-300 transform hover:scale-105 hover:shadow-lg";
    }
    address_form.addEventListener("input", () => {
        if (address_form.value.trim() !== "") {
            location_form.innerText = "Searching for: " + address_form.value;
            location_container.classList.remove("hidden");
        } else {
            location_container.classList.add("hidden");
        }
        cards_container.classList.add("hidden");
        error_container.classList.add("hidden");
        resetCardTheme();
    });
    if (search_form) {
        search_form.addEventListener("submit", (e) => {
            e.preventDefault();
            weatherFunction();
        });
    }
    
    async function weatherFunction() {
        try {
            const address_value = address_form.value.trim();
            console.log("Searching weather for:", address_value);
            
            if (!address_value) {
                error_form.innerText = "You must provide address";
                if (error_container) error_container.classList.remove("hidden");
                if (location_container) location_container.classList.add("hidden");
                if (cards_container) cards_container.classList.add("hidden");
                return; 
            }
            
            const res = await fetch('/weather?address=' + encodeURIComponent(address_value));
            const data = await res.json();
            console.log("API Data received:", data);

            if (data.error) {
                error_form.innerText = data.error;
                if (error_container) error_container.classList.remove("hidden");
                if (location_container) location_container.classList.add("hidden");
                if (cards_container) cards_container.classList.add("hidden");
            } else {
                location_form.innerText = "Searched Country: " + data.location;
                forecast_form.innerText = data.condition;
                temp_form.innerText = data.temp + "°C";
                if(data.icon) {
                    weather_icon.src = data.icon;
                    weather_icon.classList.remove("hidden");
                }
                resetCardTheme();
                const conditionText = data.condition.toLowerCase();
                if (conditionText.includes("rain") || conditionText.includes("drizzle") || conditionText.includes("shower")) {
                    forecast_card.style.backgroundImage = "url('/images/happy love rain GIF.gif')";
                    forecast_card.classList.add("text-gray-800"); 
                } else if (conditionText.includes("sunny") || conditionText.includes("clear")) {
                    forecast_card.style.backgroundImage = "url('/images/The Line Summer GIF by The Line Animation.gif')";
                } else if (conditionText.includes("cloud") || conditionText.includes("overcast")) {
                    forecast_card.style.backgroundImage = "url('/images/time-lapse clouds GIF.gif')";
                    forecast_card.classList.add("text-white"); 
                }else if (conditionText.includes("fog") || conditionText.includes("mist")) {
                    forecast_card.style.backgroundImage = "url('/images/Fog GIF.gif')";
                    forecast_card.classList.add("text-white"); 
                }else if (conditionText.includes("storm"))) {
                    forecast_card.style.backgroundImage = "url('/images/bbc africa landscape GIF.gif')";
                    forecast_card.classList.add("text-white"); 
                }
                error_container.classList.add("hidden");
                cards_container.classList.remove("hidden");
                search_form.reset();
            }
        }
        catch(e) {
            error_form.innerText = "Unable to process request.";
            error_container.classList.remove("hidden");
        }
    }
});
