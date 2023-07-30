export interface WeatherWidgetInterface {
    main: MainInterface
    name: string
    sys: SysInterface
    visibility: number
    weather: WeatherInterface[]
    wind: WindInterface
}
interface MainInterface {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
}
interface SysInterface {
    country: string
    id: number
    sunrise: number
    sunset: number
    type: number
}

interface WeatherInterface {
    description: string
    main: string
    icon: string
    id: number
}

interface WindInterface {
    deg: number
    speed: number
}

