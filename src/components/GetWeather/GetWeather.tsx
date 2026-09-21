import "./GetWeather.css"
import { useEffect, useState } from "react";


interface Props {
  latitude: number;
  longitude: number;
  onTime: (timeRequest: string) => void;
}

interface WeatherResponse {
  latitude: number;
  longitude: number;
  current: CurrentWeather;
}

interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weathkkker_code: number;
  wind_speed_10m: number;
}

export const GetWeather = ({ latitude, longitude, onTime }: Props) => {

  const [clima, setCLima] = useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const obtenerClima = async (latitude: number, longitude: number) => {
      setLoading(true)
      setError(null)

      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
        `&temperature_unit=celsius` +
        `&wind_speed_unit=kmh` +
        `&timezone=auto`;


      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`Error ${res.status} al obtener el clima`)
        const data: WeatherResponse = await res.json();
        setCLima(data)
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }

    }

    obtenerClima(latitude, longitude)
    return () => controller.abort()

  }, [latitude, longitude])

  useEffect(() => {
    if (clima) {
      onTime(clima.current.time)
      console.log("se setea el onTime")
    }
  }, [clima])

  return (
    <div>
      {loading && (
        <div className="Loading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fafafa" width="256" height="256"><defs><filter id="SVGp0LL3caJ"><feGaussianBlur in="SourceGraphic" result="y" stdDeviation="1" /><feColorMatrix in="y" result="z" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" /><feBlend in="SourceGraphic" in2="z" /></filter></defs><g filter="url(#SVGp0LL3caJ)"><circle cx="5" cy="12" r="4" fill="#fafafa"><animate attributeName="cx" calcMode="spline" dur="2s" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite" values="5;8;5" /></circle><circle cx="19" cy="12" r="4" fill="#fafafa"><animate attributeName="cx" calcMode="spline" dur="2s" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite" values="19;16;19" /></circle><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></g></svg>
        </div>
      )}
      {error && (<p role="alert">{error}</p>)}

      {clima && !loading && (
        <div className="CardsContainer">
          <div className="CardWeatherPpal">
            <h5>Temperatura Actual</h5>
            <div>
              <div>
                <h1>{clima.current.temperature_2m}</h1>
                <h3>°C</h3>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-temperature"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><path d="M10 9l4 0" /></svg>
            </div>
          </div>
          <div className="CardWeather">
            <h5>Humedad:</h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-droplet-half-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7.502 19.423c2.602 2.105 6.395 2.105 8.996 0c2.602 -2.105 3.262 -5.708 1.566 -8.546l-4.89 -7.26c-.42 -.625 -1.287 -.803 -1.936 -.397a1.376 1.376 0 0 0 -.41 .397l-4.893 7.26c-1.695 2.838 -1.035 6.441 1.567 8.546" /><path d="M5 14h14" /></svg>
            <h3>{clima.current.relative_humidity_2m} %</h3>
          </div>
          <div className="CardWeather">
            <h5>Precipitaciones:</h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cloud-rain"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" /><path d="M11 13v2m0 3v2m4 -5v2m0 3v2" /></svg>
            <h3>{clima.current.precipitation} mm.</h3>
          </div>
          <div className="CardWeather">
            <h5>Velocidad del Viento</h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-wind"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" /><path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" /><path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" /></svg>
            <h3>{clima.current.wind_speed_10m} Km/h</h3>
          </div>
        </div>
      )}
    </div>
  )
}
