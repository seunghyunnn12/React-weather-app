import axios from "axios";

const API_KEY = '98bf67262b2981d0f989331ab2e145c2'

export const fetchWeatherByCoords = async (lat, lon) => {

    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params : {
            lat,
            lon,
            units:'metric',
            lang:'kr',
            appid:API_KEY
        }
    })
    return res.data
}