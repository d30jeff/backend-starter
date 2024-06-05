import { CityData, SabahCities } from '@/datasource/cities.js';

export type StateData = {
  name: string;
  cities: CityData[];
};

export const states: StateData[] = [
  {
    name: 'Sabah',
    cities: SabahCities,
  },
];
