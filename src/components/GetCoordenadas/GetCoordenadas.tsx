import "./GetCoordenadas.css"
import { useEffect, useState } from "react"

interface Coordenadas {
  latitude: number;
  longitude: number;
}

interface Props {
  name: string;
  onCoordenadas: (lat: number, lon: number) => void
}

export const GetCoordenadas = (props: Props) => {


  const [coordenadas, setCoordenadas] = useState<Coordenadas | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const getCoordenadas = async () => {
      const controller = new AbortController()
      setLoading(true)

      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${props.name}&count=1&language=es&format=json`

      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error(`Error ${response.status}`)

        const data = await response.json();
        if (data.results?.length > 0) {
          setCoordenadas({
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude,
          })
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return
        setError(error instanceof Error ? error.message : "Error Desconocido")
      } finally {
        setLoading(false)
        controller.abort()
      }
    }

    getCoordenadas()
  }, [props.name])

  useEffect(() => {
    if (coordenadas) {
      props.onCoordenadas(coordenadas?.latitude, coordenadas?.longitude)
    }
  }, [coordenadas])

  return (
    <div>
      <h2>Detalles de la Busqueda</h2>
      <h3>Ciudad: {props.name}</h3>
      {loading && (
        <div className="LoadDetalles">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fafafa" width="256" height="256"><circle cx="4" cy="12" r="3" fill="#fafafa"><animate id="SVG7x14Dcom" fill="freeze" attributeName="opacity" begin="0;SVGqSjG0dUp.end-0.25s" dur="0.75s" values="1;.2" /></circle><circle cx="12" cy="12" r="3" fill="#fafafa" opacity=".4"><animate fill="freeze" attributeName="opacity" begin="SVG7x14Dcom.begin+0.15s" dur="0.75s" values="1;.2" /></circle><circle cx="20" cy="12" r="3" fill="#fafafa" opacity=".3"><animate id="SVGqSjG0dUp" fill="freeze" attributeName="opacity" begin="SVG7x14Dcom.begin+0.3s" dur="0.75s" values="1;.2" /></circle></svg>
        </div>
      )}
      {error && (<p role="alert">{error}</p>)}
      {coordenadas && !loading && (
        <div>
          <h3>Latitud: {coordenadas?.latitude}</h3>
          <h3>Longitud: {coordenadas?.longitude}</h3>
        </div>
      )}
    </div>
  )
}
