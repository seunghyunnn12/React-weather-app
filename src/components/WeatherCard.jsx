import React from 'react'

const WeatherCard = ({ weather }) => {

    if (!weather) return null


    const { name, main, weather: weatherInfo } = weather
    const { temp, humidity } = main
    const { description, icon } = weatherInfo[0]

    return (
        <div className='card'>
            <h2>{name}</h2>
            <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt="weather-icon" />
            <p>{description}</p>
            <p>
                🌡️ {temp}
            </p>
            <p>
                💧 {humidity}
            </p>
        </div>
    )
}

export default WeatherCard