const form = document.getElementById("form");

// console.log(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.getElementById("location");
  const weather = document.getElementById("weather");
  const input = document.querySelector("input").value;
  location.textContent = "Getting Location";
  fetch(
    // `http://api.weatherstack.com/current?access_key=1247f1b0348455c20a35a28a91e553bb&query=${input}`
    `/weather?address=${input}`
  )
    .then((res) => {
      res.json().then((data) => {
        location.textContent = "Getting Location";
        if (data.error) {
          console.log(data.error);
          weather.textContent = `Location Not Found. Please Check`;
          return;
        } else {
          console.log(data.weather);
          console.log(data.location);
          location.textContent = data.location;
          // `Weather at ${data.location.name} is currently`;

          //   for (const property in data.current) {
          //     const p = document.createElement("p");
          //     p.innerHTML = `${property} : ${data.current[property]}`;
          //     weather.appendChild(p);
          //   }
          // weather.innerHTML = `
          //   <h3>${data.current.weather_descriptions[0]}</h3>
          //   <p>Feels Like :${data.current.feelslike}</p>
          //   <p>Humidity: ${data.current.humidity}</p>
          //   <p>Visibility: ${data.current.visibility}</p>

          //   `;

          const {
            feelslike,
            humidity,
            pressure,
            temperature,
            visibility,
            weather_icons,
            weather_descriptions,
          } = data.weather;
          weather.innerHTML = `
            <img style = "max-width: 100px;"src="${weather_icons[0]}"></img>
            <h4>${weather_descriptions}</h4>
            </br>
          <ul>
          <li>FeelsLike: ${feelslike}</li>
          <li>Humidity ${humidity}</li>
          <li>Pressure: ${pressure}</li>
          <li>Temperature: ${temperature}</li>
          <li>Visibility: ${visibility}</li>
          </ul>
          `;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
