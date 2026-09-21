# ClimitaNow - Clima Ahora 🌤️

Aplicación web para consultar el clima actual de cualquier ciudad. Construida con **React**, **TypeScript** y **Vite**, usando la API gratuita de [Open-Meteo](https://open-meteo.com/).

## Características

- 🔍 Búsqueda de ciudad por nombre (geocodificación en español).
- 🌡️ Temperatura actual en grados Celsius.
- 💧 Humedad relativa.
- 🌧️ Precipitaciones (mm).
- 💨 Velocidad del viento (km/h).
- 🕒 Fecha y hora de la solicitud mostradas en la barra superior.
- 📱 Interfaz responsive con animaciones de carga.

## Stack

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) ~6.0
- [Vite](https://vite.dev/) 8
- ESLint 10

## APIs utilizadas

- [Weather Forecast API](https://open-meteo.com/en/docs) - datos del clima actual.
- [Geocoding API](https://open-meteo.com/en/docs/geocoding-api) - conversión de nombre de ciudad a coordenadas.

## Requisitos previos

- Node.js (versión 20.19+ o 22.12+).
- Bun (opcional, se incluye `bun.lock`).

## Instalación

```bash
# Con bun
bun install

# O con npm
npm install
```

## Uso

```bash
# Servidor de desarrollo (HMR)
bun run dev

# También disponible con npm
npm run dev
```

Abre `http://localhost:5173` en tu navegador, escribe el nombre de una ciudad y presiona la flecha.

## Scripts

| Comando            | Descripción                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Levanta el servidor de desarrollo    |
| `npm run build`    | Compila TypeScript y genera el build |
| `npm run preview`  | Previsualización del build           |
| `npm run lint`     | Ejecuta ESLint                       |

## Estructura del proyecto

```
src/
├── App.tsx                          # Componente principal (estado y flujo)
└── components/
    ├── TopBar/                      # Barra superior con fecha/hora de la solicitud
    ├── GetCoordenadas/              # Convierte ciudad → coordenadas (Geocoding API)
    └── GetWeather/                  # Muestra el clima actual (Weather API)
```

## Flujo de la aplicación

1. El usuario ingresa el nombre de una ciudad.
2. `GetCoordenadas` busca las coordenadas vía la *Geocoding API* de Open-Meteo.
3. `GetWeather` usa esas coordenadas para consultar el clima actual en la *Weather API*.
4. Los datos se muestran en tarjetas junto con la hora de la solicitud en la barra superior.

## Licencia

Datos meteorológicos proporcionados por [Open-Meteo](https://open-meteo.com/) (licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)).