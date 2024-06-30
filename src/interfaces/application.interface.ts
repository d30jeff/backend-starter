import { Express } from 'express';
import { Signale } from 'signale';

export namespace Application {
  export const Modules: {
    Admin: 'Admin';
    Consumer: 'Consumer';
  } = {
    Admin: 'Admin',
    Consumer: 'Consumer',
  };

  export type Modules = (typeof Modules)[keyof typeof Modules];

  export const Actions: {
    Create: 'Create';
    List: 'List';
    Read: 'Read';
    Update: 'Update';
    Delete: 'Delete';
    Download: 'Download';
  } = {
    Create: 'Create',
    List: 'List',
    Read: 'Read',
    Update: 'Update',
    Delete: 'Delete',
    Download: 'Download',
  };

  export type Actions = (typeof Actions)[keyof typeof Actions];

  export const Resources: {
    Dashboard: 'Dashboard';
    Permission: 'Permission';
  } = {
    Dashboard: 'Dashboard',
    Permission: 'Permission',
  };

  export type Resources = (typeof Resources)[keyof typeof Resources];

  export type Location = 'headers' | 'params' | 'body' | 'query';

  export type IsValidMiddlewareParams = {
    location: Application.Location;
    propertyName: string;
    isOptional?: boolean;
  };

  export type Instance = {
    app: Express;
    logger: Signale;
  };

  export type CreateApplicationParams = {
    name: string;
    controllers: any[];
    origin: string[];
    staticPaths?: Array<{ prefix: string; path: string; enabled: boolean }>;
    logRequests?: boolean;
  };

  export namespace Helper {
    export type WithParamsOption<T> = T & {
      throwWhenNotFound?: boolean;
      throwIfExists?: boolean;
    };
  }
}
