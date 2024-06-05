import firebase from 'firebase-admin';

export namespace Firebase {
  export namespace DecodeToken {
    export type Params = {
      token: string;
    };
  }

  export interface Interface {
    decodeToken(params: DecodeToken.Params): Promise<firebase.auth.UserRecord>;
  }
}
