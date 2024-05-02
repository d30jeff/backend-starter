import { NotFoundException } from '@exceptions/http-exception';
import { CommonResponse } from '@responses/common.response';

export namespace Country {
  export class Response extends CommonResponse {
    constructor(params) {
      super(params);
    }
  }

  export namespace Exceptions {
    export class CountryNotFound extends NotFoundException {
      constructor() {
        super('Country Not Found');
      }
    }
  }
}
