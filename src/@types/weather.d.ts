interface IWeatherData {
  id: number;
  description: string;
  icon: string;
}

interface ICurrentData {
  dt: number;
  humidity: number;
  visibility: number;
  wind_speed: number;
  uvi: number;
  weather: IWeatherData;
  temp: number;
  feels_like: number;
}

interface IHourlyData {
  temp?: number;
  dt?: number;
  weather: IWeatherData;
  pop?: number;
}

type DailyTemp = {
  min: number;
  max: number;
};

interface IDailyData {
  dt?: number;
  weather: IWeatherData;
  pop?: number;
  temp?: DailyTemp;
}

interface IAlertData {
  sender_name?: string;
  event?: string;
  description?: string;
  start?: number;
  end?: number;
}

export type WeatherOneCallResponse = {
  current?: ICurrentData;
  hourly?: IHourlyData[];
  daily?: IDailyData[];
  alerts?: IAlertData[];
};
