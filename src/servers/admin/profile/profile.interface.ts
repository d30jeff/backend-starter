import { NotFoundException } from '@/exceptions/http-exception.js';

export namespace Profile {
  export namespace Exceptions {
    export class ProfileNotFound extends NotFoundException {
      constructor() {
        super('Profile Not Found');
      }
    }
  }
}
