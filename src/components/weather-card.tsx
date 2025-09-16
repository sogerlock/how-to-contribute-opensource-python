'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getWeatherInfo, type WeatherData } from '@/lib/weather-utils';
import { Wind } from 'lucide-react';

interface WeatherCardProps {
  city: string;
  country: string;
  weather: WeatherData | null;
  loading: boolean;
}

export function WeatherCard({ city, country, weather, loading }: WeatherCardProps) {
  if (loading) {
    return <WeatherCardSkeleton />;
  }

  if (!weather) {
    return null;
  }

  const { icon: WeatherIcon, description } = getWeatherInfo(weather.weathercode);

  return (
    <Card className="w-full max-w-md shadow-lg animate-in fade-in-50 duration-500">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold font-headline">{city}</CardTitle>
        <CardDescription className="text-lg">{country}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <WeatherIcon className="w-24 h-24 text-accent" />
          <div className="text-center">
            <p className="text-6xl font-bold font-headline">
              {Math.round(weather.temperature)}°C
            </p>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Wind className="w-5 h-5" />
          <span>{weather.windspeed} km/h</span>
        </div>
      </CardContent>
    </Card>
  );
}

function WeatherCardSkeleton() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-6 w-32 mx-auto mt-2" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="text-center space-y-2">
            <Skeleton className="h-16 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
        <Skeleton className="h-6 w-28" />
      </CardContent>
    </Card>
  );
}
