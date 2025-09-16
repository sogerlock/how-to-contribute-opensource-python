import {
  Sun,
  CloudSun,
  Cloudy,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudHail,
  CloudSnow,
  CloudRainWind,
  CloudLightning,
} from 'lucide-react';
import type { ElementType } from 'react';

export interface WeatherInfo {
  icon: ElementType;
  description: string;
}

export function getWeatherInfo(weatherCode: number): WeatherInfo {
  switch (weatherCode) {
    case 0:
      return { icon: Sun, description: 'Clear Sky' };
    case 1:
      return { icon: CloudSun, description: 'Mainly Clear' };
    case 2:
      return { icon: CloudSun, description: 'Partly Cloudy' };
    case 3:
      return { icon: Cloudy, description: 'Overcast' };
    case 45:
    case 48:
      return { icon: CloudFog, description: 'Fog' };
    case 51:
    case 53:
    case 55:
      return { icon: CloudDrizzle, description: 'Drizzle' };
    case 61:
    case 63:
    case 65:
      return { icon: CloudRain, description: 'Rain' };
    case 66:
    case 67:
      return { icon: CloudHail, description: 'Freezing Rain' };
    case 71:
    case 73:
    case 75:
      return { icon: CloudSnow, description: 'Snowfall' };
    case 80:
    case 81:
    case 82:
      return { icon: CloudRainWind, description: 'Rain Showers' };
    case 85:
    case 86:
      return { icon: CloudSnow, description: 'Snow Showers' };
    case 95:
      return { icon: CloudLightning, description: 'Thunderstorm' };
    case 96:
    case 99:
      return { icon: CloudLightning, description: 'Thunderstorm with Hail' };
    default:
      return { icon: Sun, description: 'Unknown' };
  }
}

export interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
}
