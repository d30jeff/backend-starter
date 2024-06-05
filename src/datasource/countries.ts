import { StateData, states } from '@/datasource/states.js';

type Country = {
  name: string;
  timezone: string;
  states: StateData[];
  code: string;
  diallingCode: string;
  currencyCode: string;
};

export const countries: Country[] = [
  {
    name: 'Malaysia',
    states,
    timezone: 'Asia/Kuala_Lumpur',
    code: 'MY',
    currencyCode: 'MYR',
    diallingCode: '+60',
  },
];
