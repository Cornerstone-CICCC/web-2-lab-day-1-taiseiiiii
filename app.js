const searchForm = document.querySelector(".search-container");
const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const container = document.getElementById("weather-info-container");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${searchField.value}&count=1&language=en&format=json`
  );
  const data = await res.json();
  const res2 = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
  );
  const data2 = await res2.json();
  console.log(data2);

  container.innerHTML = "";

  if (data2.current.is_day) {
    document.body.style.backgroundColor = "#f0f0f0";
  } else {
    document.body.style.backgroundColor = "#1a1a1a";
  }

  const headerSection = document.createElement("div");
  headerSection.className = "weather-header";

  if (data2.current.is_day) {
    headerSection.style.backgroundImage = "url('./images/day.jpg')";
  } else {
    headerSection.style.backgroundImage = "url('./images/night.jpg')";
  }

  const cityName = document.createElement("h1");
  cityName.className = "city-name";
  cityName.textContent = data.results[0].name;

  const temperature = document.createElement("div");
  temperature.className = "temperature";
  temperature.textContent = `${data2.current.temperature_2m} °C`;

  headerSection.appendChild(cityName);
  headerSection.appendChild(temperature);

  container.appendChild(headerSection);

  const table = document.createElement("table");
  table.className = "weather-table";

  if (!data2.current.is_day) {
    table.classList.add("night-mode");
  }

  const countryRow = document.createElement("tr");
  const countryLabel = document.createElement("td");
  countryLabel.className = "label";
  countryLabel.textContent = "Country";
  const countryValue = document.createElement("td");
  countryValue.textContent = data.results[0].country;
  countryRow.appendChild(countryLabel);
  countryRow.appendChild(countryValue);

  const timezoneRow = document.createElement("tr");
  const timezoneLabel = document.createElement("td");
  timezoneLabel.className = "label";
  timezoneLabel.textContent = "Timezone";
  const timezoneValue = document.createElement("td");
  timezoneValue.textContent = data2.timezone;
  timezoneRow.appendChild(timezoneLabel);
  timezoneRow.appendChild(timezoneValue);

  const populationRow = document.createElement("tr");
  const populationLabel = document.createElement("td");
  populationLabel.className = "label";
  populationLabel.textContent = "Population";
  const populationValue = document.createElement("td");
  populationValue.textContent = data.results[0].population || "N/A";
  populationRow.appendChild(populationLabel);
  populationRow.appendChild(populationValue);

  const forecastRow = document.createElement("tr");
  const forecastLabel = document.createElement("td");
  forecastLabel.className = "label";
  forecastLabel.textContent = "Tomorrow's Forecast";
  const forecastValue = document.createElement("td");
  forecastValue.innerHTML = `Low: ${data2.daily.temperature_2m_min[0]} °C<br>Max: ${data2.daily.temperature_2m_max[0]} °C`;
  forecastRow.appendChild(forecastLabel);
  forecastRow.appendChild(forecastValue);

  table.appendChild(countryRow);
  table.appendChild(timezoneRow);
  table.appendChild(populationRow);
  table.appendChild(forecastRow);

  container.appendChild(table);
});
