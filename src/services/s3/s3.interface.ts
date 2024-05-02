import { UnprocessableEntityException } from '@exceptions/http-exception';

export namespace S3 {
  export namespace Exceptions {
    export class UnknownMIMEType extends UnprocessableEntityException {
      constructor() {
        super('Invalid MIME Type');
      }
    }
  }

  export namespace CreatePutSignedURL {
    export type Params = {
      mimetype: string;
      size: number;
      accountID: string;
    };
  }

  export type UploadParams = {
    mimetype: string;
    data: Buffer;
    accountID: string;
  };
}
