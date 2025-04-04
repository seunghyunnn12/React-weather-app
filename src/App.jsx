import './App.css'
import WeatherCard from './components/WeatherCard'
import { useState } from 'react'
import { fetchWeatherByCoords } from './api/weather'
import { fetchCoordinates } from './api/geo'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [theme, setTheme] = useState('default')

  const onChangeInput = (e) => {
    setCity(e.target.value)
  }

  const onKeyupEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = async () => {
    if (!city.trim()) return

    try {
      const { lat, lon } = await fetchCoordinates(city.trim())
      const data = await fetchWeatherByCoords(lat, lon)
      setWeather(data)
      setCity('')

      // 날씨 테마 설정
      const weatherMain = data.weather[0].main
      switch (weatherMain) {
        case 'Clear':
          setTheme('clear')
          break
        case 'Clouds':
          setTheme('clouds')
          break
        case 'Rain':
        case 'Drizzle':
          setTheme('rain')
          break
        case 'Snow':
          setTheme('snow')
          break
        case 'Thunderstorm':
          setTheme('thunder')
          break
        default:
          setTheme('default')
      }

    } catch (error) {
      console.error(error)
      alert('정확한 도시명을 입력해주세요 😥')
    }
  }

  return (
    <div className={`app ${theme}`}>
      <h1>🌤️ 날씨앱</h1>
      <div className="input-wrap">
        <input
          value={city}
          onChange={onChangeInput}
          onKeyUp={onKeyupEnter}
          type="text"
          placeholder='도시명을 입력하세요 (예: 서울)'
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <WeatherCard weather={weather} />
    </div>
  )
}

export default App
