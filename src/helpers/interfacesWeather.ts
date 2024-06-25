export interface WeatherDay {
  valid_date: string;
  weather: {
    icon: string;
    description: string;
  };
  max_temp: number;
  min_temp: number;
}

export interface WheaterState {
  listWeatherData: WeatherData[];
  todayWheather: any;
  weatherData: DefaultWeatherData;
  weatherBitData: WeatherbitData; // Permitir null
  data: any;
  hourlyForecast: WeatherDataForecast;
  loading: boolean;
  coordinates: { lat: number; lon: number } | null;
  error: any;
  city: string;
}

//Interface de weatherdata normal
export interface DefaultWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// Pronostico 7 days
export interface WeatherData {
  app_max_temp: number;
  app_min_temp: number;
  clouds: number;
  clouds_hi: number;
  clouds_low: number;
  clouds_mid: number;
  datetime: string;
  dewpt: number;
  high_temp: number;
  low_temp: number;
  max_dhi: number | null;
  max_temp: number;
  min_temp: number;
  moon_phase: number;
  moon_phase_lunation: number;
  moonrise_ts: number;
  moonset_ts: number;
  ozone: number;
  pop: number;
  precip: number;
  pres: number;
  rh: number;
  slp: number;
  snow: number;
  snow_depth: number;
  sunrise_ts: number;
  sunset_ts: number;
  temp: number;
  ts: number;
  uv: number;
  valid_date: string;
  vis: number;
  weather: {
    code: number;
    icon: string;
    description: string;
  };
  wind_cdir: string;
  wind_cdir_full: string;
  wind_dir: number;
  wind_gust_spd: number;
  wind_spd: number;
}

// UV Index and Change of Rain
export interface WeatherbitData {
  name: string;
  chanceOfRain: number;
  uvIndex: number;
  weatherBitData: {
    chanceOfRain: number;
    uvIndex: number;
  };
  count: number;
  data: {
    app_temp: number;
    aqi: number;
    city_name: string;
    clouds: number;
    country_code: string;
    datetime: string;
    dewpt: number;
    dhi: number;
    dni: number;
    elev_angle: number;
    ghi: number;
    gust: number | null;
    h_angle: number;
    lat: number;
    lon: number;
    ob_time: string;
    pod: string;
    precip: number;
    pres: number;
    rh: number;
    slp: number;
    snow: number;
    solar_rad: number;
    sources: string[];
    state_code: string;
    station: string;
    sunrise: string;
    sunset: string;
    temp: number;
    timezone: string;
    ts: number;
    uv: number;
    vis: number;
    weather: {
      description: string;
      code: number;
      icon: string;
    };
    wind_cdir: string;
    wind_cdir_full: string;
    wind_dir: number;
    wind_spd: number;
  }[];
}

//Pronostico horario
export interface WeatherDataForecast {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: City;
}

interface WeatherEntry {
  dt: number; // Timestamp en segundos desde la época de Unix (1/1/1970)
  main: {
    temp: number; // Temperatura en Kelvin
    feels_like: number; // Sensación térmica en Kelvin
    temp_min: number; // Temperatura mínima en Kelvin
    temp_max: number; // Temperatura máxima en Kelvin
    pressure: number; // Presión atmosférica en hPa
    sea_level: number; // Presión atmosférica a nivel del mar en hPa
    grnd_level: number; // Presión atmosférica a nivel del suelo en hPa
    humidity: number; // Humedad relativa en porcentaje
    temp_kf: number; // Diferencia entre temperatura mínima y máxima en Kelvin
  };
  weather: WeatherDescription[];
  clouds: {
    all: number; // Porcentaje de nubosidad
  };
  wind: {
    speed: number; // Velocidad del viento en m/s
    deg: number; // Dirección del viento en grados (en relación al norte)
    gust: number; // Ráfaga máxima del viento en m/s
  };
  visibility: number; // Visibilidad en metros
  pop: number; // Probabilidad de precipitación en porcentaje (0 a 1)
  sys: {
    pod: string; // Parte del día (d = día, n = noche)
  };
  dt_txt: string; // Fecha y hora en formato ISO 8601 (YYYY-MM-DD HH:MM:SS)
}

interface WeatherDescription {
  id: number; // Identificador del tiempo (referencia externa)
  main: string; // Descripción principal del tiempo (ej. Clouds)
  description: string; // Descripción detallada del tiempo (ej. scattered clouds)
  icon: string; // Código del ícono del tiempo (referencia externa)
}

interface City {
  id: number; // Identificador de la ciudad
  name: string; // Nombre de la ciudad
  coord: {
    lat: number; // Latitud geográfica
    lon: number; // Longitud geográfica
  };
  country: string; // Código del país (ej. US)
  population: number; // Población de la ciudad
  timezone: number; // Desplazamiento horario en segundos
  sunrise: number; // Timestamp del amanecer en segundos desde la época de Unix
  sunset: number; // Timestamp del atardecer en segundos desde la época de Unix
}
