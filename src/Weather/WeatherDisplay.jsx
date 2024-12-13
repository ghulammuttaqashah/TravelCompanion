import { useEffect, useState } from "react";

function WeatherDisplay() {
  const [city, setCity] = useState("Karachi");
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const api_key = "2d56cb4f1d637c4d300184569171b3b1";

  const getWeather = async () => {

    if (!city) {
        alert("Please enter a city.");
        return; 
    }

    setLoading(true);
    setError(null);
    setData(null);
    setForecast(null);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          alert("Please enter a correct city name.");
        } else {
          setError("API response " + response.status);
        }
        setLoading(false);
        return;
      }
      const result = await response.json();
      setData(result);

      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) {
        setError("Unable to fetch forecast data.");
        setLoading(false);
        return;
      }
      const forecastResult = await forecastResponse.json();
      setForecast(forecastResult.list.filter((_, index) => index % 8 === 0)); // Every 8th entry is a new day in 5-day forecast

    } catch (e) {
      setError("Unable to fetch weather data: " + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getWeather();
  }, []);

  const getDayOfWeek = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  };

  return (
    <div className="main" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <div className="card" style={{ border: "1px solid #629584", borderRadius: "10px", boxShadow: "5px 5px 5px hsla(0, 0%, 0%, 0.1)", padding: "20px", margin: "10px", textAlign: "center", maxWidth: "400px", display: "inline-block", marginBottom: "60px", marginTop: "40px" }}>
        <h1 style={{ color: "#243642" }}>Weather App</h1>
        <input
          type="text"
          placeholder="Enter City"
          style={{ width: "250px", textAlign:"center",height: "40px", marginBottom: "25px", borderRadius: "50px", border: "2px solid #243642" }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          style={{
            backgroundColor: "#243642",
            color: "#E2F1E7",
            fontSize: "1.2vw",
            padding: "1vw 2vw",
            border: "none",
            borderRadius: "50px",
            fontWeight: "700",
            cursor: "pointer",
            marginLeft:"20px"
          }}
          onClick={getWeather}
        >
          Search
        </button>
        {loading && <div>Loading...</div>}
        {error && <p>{error}</p>}
        {data && (
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              style={{ alignSelf: "center" }}
            />
            <h2 style={{ alignSelf: "center", color: "#333333" }}>{(data.main.temp - 273.15).toFixed(0)} °C</h2>
            <h2 style={{ alignSelf: "center", color: "#333333", fontSize: "20px" }}>{data.name}</h2>
            <p style={{ alignSelf: "center", color: "#333333", fontSize: "20px" }}>{data.weather[0].description}</p>
          </div>
        )}

        {forecast && (
          <div>
            <h3 style={{ textAlign: "center", color: "#243642", marginTop: "30px" }}>5 Day Weather Forecast</h3>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
              {forecast.map((day, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #629584",
                    borderRadius: "10px",
                    padding: "15px",
                    margin: "10px",
                    textAlign: "center",
                    width: "120px",
                    
                    backgroundColor: "#243642",
                  }}
                >
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                    style={{ width: "50px", height: "50px", marginBottom: "10px" }}
                  />
                  <h5 style={{ color: "#E2F1E7" }}>{getDayOfWeek(day.dt_txt)}</h5>
                  <p style={{ color: "#E2F1E7" }}>{(day.main.temp - 273.15).toFixed(0)} °C</p>
                  <p style={{ color: "#E2F1E7" }}>{day.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherDisplay;