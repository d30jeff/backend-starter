import { UserRecord } from 'firebase-admin/lib/auth/user-record';

export namespace Firebase {
  export namespace DecodeToken {
    export type Params = {
      token: string;
    };
  }

  export interface Interface {
    decodeToken(params: DecodeToken.Params): Promise<UserRecord>;
  }
}
