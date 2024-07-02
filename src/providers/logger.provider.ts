import { config } from '@/providers/config.provider.js';
import Signale from 'signale';

export const SignaleLogger = (name: string): Signale.Signale => {
  return new Signale.Signale({
    scope: `${config.NODE_ENV.toUpperCase()} ${name}`,
    disabled: config.IS_TESTING,
    config: {
      displayTimestamp: true,
      displayBadge: true,
    },
  });
};

export type CustomLogger = Signale.Signale;

export const Logger = () => {
  return (target: Object, key: string) => {
    const getter = () => {
      return SignaleLogger(target.constructor.name);
    };

    Object.defineProperty(target, key, {
      get: getter,
      enumerable: true,
      configurable: true,
    });
  };
};
