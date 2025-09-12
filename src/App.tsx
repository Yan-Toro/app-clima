import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";

const API_KEY = "TU_API_KEY_DE_OPENWEATHER"; //  Reemplaza con tu clave real
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function App() {
  const [city, setCity] = useState("Santiago"); // Ciudad por defecto
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [units, setUnits] = useState<"metric" | "imperial">("metric"); // °C o °F
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" // Persistencia del modo oscuro
  );

  // 🔹 Función para pedir el clima actual
  const fetchWeather = async () => {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=${units}&lang=es`;

    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();
    setWeatherData(data);
  };

  // 🔹 Función para pedir el pronóstico
  const fetchForecast = async () => {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=${units}&lang=es`;

    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();

    // OpenWeather devuelve pronóstico cada 3 horas → filtramos 1 por día
    const daily = data.list.filter((_: any, i: number) => i % 8 === 0);
    setForecastData(daily);
  };

  //  Llamar APIs cuando cambie ciudad o unidades
  useEffect(() => {
    fetchWeather();
    fetchForecast();
  }, [city, units]);

  // Cambiar entre °C y °F
  const toggleUnits = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  //  Cambiar tema oscuro/claro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", String(!darkMode)); // Persistencia
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen p-6" : "bg-gray-100 min-h-screen p-6"}>
      <div className="max-w-2xl mx-auto">
        {/* Input de ciudad */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-600"
          placeholder="Escribe una ciudad..."
        />

        {/* Botones */}
        <div className="flex justify-between mt-4">
          <button
            onClick={toggleUnits}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
          >
            Cambiar a {units === "metric" ? "°F" : "°C"}
          </button>

          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white"
          >
            {darkMode ? "Modo Claro" : "Modo Oscuro"}
          </button>
        </div>

        {/* Clima actual */}
        {weatherData && (
          <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold">{weatherData.name}</h2>
            <p className="text-lg">
              {Math.round(weatherData.main.temp)}°{" "}
              {units === "metric" ? "C" : "F"}
            </p>
            <p className="capitalize">{weatherData.weather[0].description}</p>
          </div>
        )}

        {/* Pronóstico */}
        {forecastData.length > 0 && (
          <Forecast forecast={forecastData} units={units} />
        )}
      </div>
    </div>
  );
}

export default App;
