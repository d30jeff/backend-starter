import Dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import tz from 'dayjs/plugin/timezone';

Dayjs.extend(utc);
Dayjs.extend(duration);
Dayjs.extend(tz);

export const dayjs = Dayjs;
