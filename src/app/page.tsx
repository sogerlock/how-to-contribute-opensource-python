'use client';

import * as React from 'react';
import { CitySelector } from '@/components/city-selector';
import { WeatherCard } from '@/components/weather-card';
import type { WeatherData } from '@/lib/weather-utils';
import { useToast } from '@/hooks/use-toast';
import { Thermometer } from 'lucide-react';

interface City {
  city: string;
  country: string;
}

export default function Home() {
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null);
  const [weatherData, setWeatherData] = React.useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleCitySelect = async (city: City) => {
    setSelectedCity(city);
    setIsLoading(true);
    setWeatherData(null);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city.city)}&country=${encodeURIComponent(city.country)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data.');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
       toast({
        variant: 'destructive',
        title: 'Error fetching weather',
        description: errorMessage,
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <header className="py-6 shadow-md" style={{backgroundColor: '#ADD8E6'}}>
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Thermometer className="h-10 w-10 text-foreground" />
            <h1 className="text-4xl font-bold text-foreground font-headline">
              PyWeather API
            </h1>
          </div>
          <p className="mt-1 text-foreground/80">
            Select a city to see the current weather
          </p>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8 flex flex-col items-center gap-8">
        <CitySelector onCitySelect={handleCitySelect} disabled={isLoading} />
        
        {selectedCity && (
          <WeatherCard
            key={selectedCity.city}
            city={selectedCity.city}
            country={selectedCity.country}
            weather={weatherData}
            loading={isLoading}
          />
        )}

        {!selectedCity && !isLoading && (
          <div className="text-center text-muted-foreground mt-8 animate-in fade-in duration-500">
            <p className="text-lg">Please select a city to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
}
