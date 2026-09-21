import React, { useState } from 'react';
import './App.css'
import { GetCoordenadas, TopBar } from './components';
import { GetWeather } from './components/';

interface Inputs {
  cityname?: string;
}

interface Coordenadas {
  latitude: number;
  longitude: number;
}

function App() {

  const [inputs, setInputs] = useState<Inputs>({})
  const [city, setCity] = useState<string>()
  const [coordenadas, setCoordenadas] = useState<Coordenadas>()
  const [time, setTime] = useState<string>("")

  const handleOnCoordenadas = (lat: number, lon: number) => {
    setCoordenadas({ latitude: lat, longitude: lon })
  }

  const capitalizarNombre = (name: string) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs(
      prev => ({ ...prev, [name]: value })
    )
  }


  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCity(inputs.cityname)
  }

  const handlerOnTime = (time: string) => {
    setTime(time)
  }


  return (
    <>
      <TopBar hSolicitud={time} />
      <div className='ContainerFormCity'>
        <form className='FormCity' onSubmit={handleSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
          <input className='TbCity' type='text' name='cityname' value={inputs.cityname || ""} onChange={handleChange} placeholder="Nombre de la ciudad" required />
          <button type='submit' >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
          </button>
        </form>
      </div>
      {city &&
        <GetCoordenadas name={capitalizarNombre(city)} onCoordenadas={handleOnCoordenadas} />
      }
      {coordenadas &&
        <GetWeather latitude={coordenadas.latitude} longitude={coordenadas.longitude} onTime={handlerOnTime} />
      }
    </>
  )
}

export default App
