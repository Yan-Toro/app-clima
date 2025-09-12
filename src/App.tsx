import { useEffect, useState } from "react";

// 🔑 Reemplaza con tu API Key real de OpenWeather
const API_KEY = "ba47a1950639b724b679ef2bf27c73a1";

function App() {
  const [city, setCity] = useState("Santiago"); // ciudad por defecto
  const [weather, setWeather] = useState<any>(null); // datos del clima
  const [unit, setUnit] = useState("metric"); // unidades: metric = °C, imperial = °F
  const [loading, setLoading] = useState(false); // estado de carga
  const [error, setError] = useState<string | null>(null); // errores

  // 🔄 Función para pedir datos del clima
  const fetchWeather = async (city: string) => {
    try {
      setLoading(true); // comienza carga
      setError(null); // limpia error anterior

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}&lang=es`
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener el clima. Verifica la ciudad o API key.");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false); // siempre termina carga
    }
  };

  // 📌 Ejecuta la búsqueda al inicio y cada vez que cambie la unidad
  useEffect(() => {
    fetchWeather(city);
  }, [unit]);

  // 🔄 Cambiar entre °C y °F
  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clima App</h1>
        <div className="flex gap-2">
          <button
            onClick={toggleUnit}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
          >
            Cambiar a {unit === "metric" ? "°F" : "°C"}
          </button>
        </div>
      </header>

      {/* Input ciudad */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Escribe una ciudad..."
          className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
        <button
          onClick={() => fetchWeather(city)}
          className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
        >
          Buscar
        </button>
      </div>

      {/* Estado de carga */}
      {loading && <p className="text-blue-500">Cargando datos del clima...</p>}

      {/* Mensaje de error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Tarjeta con el clima */}
      {weather && !loading && !error && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl text-center w-80">
          <h2 className="text-xl font-semibold mb-2">{weather.name}</h2>
          <p className="text-5xl font-bold mb-2">
            {Math.round(weather.main.temp)}°{unit === "metric" ? "C" : "F"}
          </p>
          <p className="capitalize text-lg mb-2">{weather.weather[0].description}</p>
          <p className="text-sm">
            🌡 Mín: {Math.round(weather.main.temp_min)}° / Máx:{" "}
            {Math.round(weather.main.temp_max)}°
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
