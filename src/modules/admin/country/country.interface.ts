import { CommonResponse } from '@/responses/common.response.js';
import { NotFoundException } from '@/exceptions/http-exception.js';

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
