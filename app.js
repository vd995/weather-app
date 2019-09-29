window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let tempIcon = document.querySelector(".icon");
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude;
            console.log(long, lat)
            const proxy = "http://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/8a3c407f2ee25370e17f55a33f83b1b0/${lat},${long}`;
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
               
                const { temperature, summary, icon }= data.currently;
                console.log(temperature, summary, icon)

                if (temperatureDegree) {
                    temperatureDegree.textContent = temperature;
                }
                if (temperatureDescription) {
                    temperatureDescription.textContent = summary
                }
                if (locationTimezone) {
                    locationTimezone.textContent = data.timezone;
                }
                
                setIcons(summary, document.querySelector("icon"));
                                
                let celsius = (temperature - 32) * (5 / 9);

                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else{
                        temperatureSpan.textContent === "F";
                        temperatureDegree.textContent = temperature;
                    }
                }
                )

            })
        });

       
    } 

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        console.log(skycons[currentIcon])
        skycons.play();
        return skycons.set(iconID, skycons.PARTLY_CLOUDY_DAY);


    }
})