import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import Header from "./components/Header";
import FavoritesDrawer from "./components/FavoritesDrawer";

const API_KEY = "ba47a1950639b724b679ef2bf27c73a1"; // 🔴 Reemplaza con tu clave real
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// 🔹 Fondo dinámico según condición del clima
const getBackground = (weather: string) => {
  if (!weather) return "from-gray-200 to-gray-400";

  if (weather.includes("Clear"))
    return "from-yellow-200 via-blue-200 to-blue-400";
  if (weather.includes("Cloud"))
    return "from-gray-300 via-gray-400 to-gray-600";
  if (weather.includes("Rain"))
    return "from-blue-400 via-gray-600 to-gray-900";
  if (weather.includes("Snow"))
    return "from-blue-100 via-blue-200 to-white";

  return "from-gray-200 to-gray-400";
};

function App() {
  // Estado principal
  const [city, setCity] = useState("Santiago");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true"
  );
  const [favorites, setFavorites] = useState<string[]>(["Santiago", "Londres"]);

  // 🔹 Pedir clima actual
  const fetchWeather = async () => {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=${units}&lang=es`;

    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();
    setWeatherData(data);
  };

  // 🔹 Pedir pronóstico 5 días
  const fetchForecast = async () => {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=${units}&lang=es`;

    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();

    // Filtramos un valor cada 8 (24h), ya que la API devuelve cada 3h
    const daily = data.list.filter((_: any, i: number) => i % 8 === 0);
    setForecastData(daily);
  };

  // 🔹 Efecto: cuando cambia ciudad o unidades → actualizar
  useEffect(() => {
    fetchWeather();
    fetchForecast();
  }, [city, units]);

  // 🔹 Cambiar °C ↔ °F
  const toggleUnits = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  // 🔹 Cambiar tema oscuro ↔ claro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", String(!darkMode));
  };

  // 🔹 Agregar ciudad actual a favoritos
  const addFavorite = () => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-700 bg-gradient-to-br ${
        weatherData
          ? getBackground(weatherData.weather[0].main)
          : "from-gray-200 to-gray-400"
      } ${darkMode ? "dark" : ""} font-inter`}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Header
            units={units}
            toggleUnits={toggleUnits}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <FavoritesDrawer
            favorites={favorites}
            onSelect={(favCity) => setCity(favCity)}
          />
        </div>

        {/* Input de ciudad */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-600"
            placeholder="Escribe una ciudad..."
          />
          <button
            onClick={addFavorite}
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            ⭐
          </button>
        </div>

        {/* Clima actual */}
        {weatherData && (
          <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center">
            <h2 className="text-3xl font-bold">{weatherData.name}</h2>
            <img
              className="mx-auto w-20 h-20"
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              alt={weatherData.weather[0].description}
            />
            <p className="text-4xl font-bold">
              {Math.round(weatherData.main.temp)}°{" "}
              {units === "metric" ? "C" : "F"}
            </p>
            <p className="capitalize text-lg">
              {weatherData.weather[0].description}
            </p>
          </div>
        )}

        {/* Pronóstico 5 días */}
        {forecastData.length > 0 && (
          <Forecast forecast={forecastData} units={units} />
        )}
      </div>
    </div>
  );
}

export default App;
