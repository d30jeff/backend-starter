import { NotFoundException } from '@exceptions/http-exception';
import { CommonResponse } from '@responses/common.response';

export namespace Profile {
  export namespace Exceptions {
    export class ProfileNotFound extends NotFoundException {
      constructor() {
        super('Profile Not Found');
      }
    }
  }
}
