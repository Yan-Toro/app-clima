//cliente para llamar a la api de openweathermap
//Para poder objeter el tiempo por cuidad 

export type WeatherNow = {
    city: string; //nombre de la cuidad
    country: string; //pais
    description: string; //descripcion del clima
    icon: string; //icono del clima
    temp: number; //temperatura
    feelslike: number; //sensacion termica
};

//URL BASE DE LA API
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// EL SIGUENTE METODO LEE LA API KEY, LLAMA AL ENDPOINT DE LA API Y DEVUELVE LA INFORMACION
//HACE UN MANEJO DE ERRORS HTTP Y MAPEA LA RESPUESTA JSON A UN OBJETO DE TIPO WeatherNow

export async function getCurrentWheaterByCity(city: string): Promise<WeatherNow> {
    const apiKey = import.meta.env.VITE_OWN_API_KEY as string;
   if (!apiKey) throw new Error("falta VITE_OWM__API_KEY en .env") //chequeo de la api key

//CONTRUYO LA URL PARA LLAMAR A LA API 
const url= `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`;

//LLAMADA A LA API 
const res= await fetch(url);

if (!res.ok){

    const msg = res.status === 404 ? "cuidad no encontrada" : "error ${res.statuts}";
    throw new Error(msg);
}
//MAPEO DE LA RESPUESTA JSON

const data = await res.json();

return {
    city:data.name,
    country:data.sys?.country ?? "",
    description:data.weather?.[0]?.description ?? "",
    icon:data.weather?.[0]?.icon ?? "01d",
    temp:Math.round(data.main?.temp),
    feelslike:Math.round(data.main?.feels_like),
};
}