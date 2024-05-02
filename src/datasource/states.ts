import { CityData, SabahCities } from '@datasource/cities';

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
