import { Sun, Moon, Thermometer } from "lucide-react";

interface HeaderProps {
    units: "metric" | "imperial";
    toggleUnits: () => void;
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export default function Header({ units, toggleUnits, darkMode, toggleDarkMode }: HeaderProps) {
    return (
    <header className="flex justify-between items-center py-4 mb-6">
      {/* Logo */}
        <h1 className="text-2xl font-bold">☁️ ClimaApp</h1>

        <div className="flex gap-3">
        {/* Cambiar °C / °F */}
        <button
            onClick={toggleUnits}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
        >
            <Thermometer size={18} />
            {units === "metric" ? "°C" : "°F"}
        </button>

        {/* Modo oscuro */}
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-gray-700 text-white hover:bg-gray-800 transition"
        >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        </div>
    </header>
    );
}
