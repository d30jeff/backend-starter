import { AdminWithPublicFields } from '@/repositories/admin.repository.js';
import { CommonResponse } from '@/responses/common.response.js';
import { IsDefined, IsEmail, MaxLength } from '@/utils/class-validator.util.js';
import { UnauthorizedException } from '@/exceptions/http-exception.js';

export namespace Admin {
  export class Response extends CommonResponse {
    constructor(params: AdminWithPublicFields) {
      super(params);
    }
  }

  export namespace Exceptions {
    export class InvalidCredentials extends UnauthorizedException {
      constructor() {
        super('Invalid Credentials', 'Invalid email or password combination');
      }
    }
  }

  export namespace Create {
    export type Params = SignIn.Params & {
      fullName: string;
    };
  }

  export namespace SignIn {
    export class Dto {
      @IsDefined()
      @MaxLength()
      @IsEmail()
      email: string;

      @IsDefined()
      @MaxLength()
      password: string;
    }
    export type Params = Dto;
  }

  export namespace Recover {
    export type Params = {
      email: string;
    };
  }
  export namespace Reset {
    export type Params = {
      token: string;
      email: string;
      password: string;
    };
  }

  export interface Interface {
    signIn(params: SignIn.Params): Promise<AdminWithPublicFields>;
    recover(params: Recover.Params): void;
    reset(params: Reset.Params): void;
  }
}
