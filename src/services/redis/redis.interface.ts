export namespace Redis {
  export const Keys: {
    Key: 'Key';
  } = {
    Key: 'Key',
  };

  export type Keys = (typeof Keys)[keyof typeof Keys];

  export type FindParams = {
    type: Keys;
    ID: string;
  };

  export interface CreateParams extends FindParams {
    value: string | object | number;
    ttl?: number;
  }

  export type GetTTLParams = FindParams;
  export type DeleteParams = FindParams;
}
