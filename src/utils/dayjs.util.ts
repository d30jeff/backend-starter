import Dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import tz from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

Dayjs.extend(utc);
Dayjs.extend(duration);
Dayjs.extend(tz);

export const dayjs = Dayjs;
