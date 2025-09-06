import { useState } from "react";
import "./App.css";

function App() {
  // Estado para guardar ciudad
  const [city, setCity] = useState("");
  // Estado para guardar datos del clima
  const [weather, setWeather] = useState<any>(null);

  // Función para buscar el clima
  const fetchWeather = async () => {
    try {
      const apiKey = "ba47a1950639b724b679ef2bf27c73a1"; // <-- AQUI VA MI API KEY 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        alert("Ciudad no encontrada ❌");
        return;
      }

      setWeather(data);
    } catch (error) {
      console.error("Error al obtener clima:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
      <h1 className="text-3xl font-bold mb-4">🌤 App del Clima</h1>

      {/* Input para escribir ciudad */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ingresa una ciudad..."
        className="border rounded p-2 mb-2 w-64"
      />

      {/* Botón para buscar */}
      <button
        onClick={fetchWeather}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Buscar
      </button>

      {/* Mostrar resultados */}
      {weather && (
        <div className="mt-4 bg-white p-4 rounded shadow-md w-80 text-center">
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p className="text-xl font-semibold">{weather.main.temp}°C</p>
          <p>🌡 Mín: {weather.main.temp_min}°C / Máx: {weather.main.temp_max}°C</p>
        </div>
      )}
    </div>
  );
}

export default App;
