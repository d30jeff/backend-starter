import { NotFoundException } from '@exceptions/http-exception';
import { ProfileWithPublicFields } from '@repositories/profile.repository';
import { CommonResponse } from '@responses/common.response';

export namespace Profile {
  export class Response extends CommonResponse {
    constructor(params: ProfileWithPublicFields) {
      super(params);
    }
  }

  export namespace Exceptions {
    export class ProfileNotFound extends NotFoundException {
      constructor() {
        super('Profile Not Found');
      }
    }
  }
}
