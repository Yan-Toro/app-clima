import React from "react";

// Tipado del pronóstico que devuelve la API
interface ForecastProps {
  forecast: any[]; // Podrías tipar mejor, pero por ahora usamos any[]
  units: "metric" | "imperial"; // Recibimos también las unidades
}

const Forecast: React.FC<ForecastProps> = ({ forecast, units }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Pronóstico 5 días</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 text-center"
          >
            {/* Fecha */}
            <p className="font-semibold">
              {new Date(item.dt * 1000).toLocaleDateString("es-ES", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </p>

            {/* Icono del clima */}
            <img
              className="mx-auto"
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />

            {/* Temperaturas */}
            <p className="text-lg font-bold">
              {Math.round(item.main.temp)}° {units === "metric" ? "C" : "F"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
