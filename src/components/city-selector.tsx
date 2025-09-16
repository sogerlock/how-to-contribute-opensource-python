'use client';

import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import cityData from '@/config/cities.json';

interface City {
  city: string;
  country: string;
}

interface CitySelectorProps {
  onCitySelect: (city: City) => void;
  disabled?: boolean;
}

export function CitySelector({ onCitySelect, disabled }: CitySelectorProps) {
  const cities: City[] = cityData.cities;

  const handleValueChange = (value: string) => {
    const selected = cities.find(c => `${c.city}-${c.country}` === value);
    if (selected) {
      onCitySelect(selected);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <Select onValueChange={handleValueChange} disabled={disabled}>
        <SelectTrigger className="w-full text-base bg-card">
          <SelectValue placeholder="Select a city..." />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={`${city.city}-${city.country}`} value={`${city.city}-${city.country}`}>
              {city.city}, {city.country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
