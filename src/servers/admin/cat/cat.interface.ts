import { CatWithPublicFields } from '@/repositories/cat.repository.js';
import { CommonResponse } from '@/responses/common.response.js';
import { IsDefined, MaxLength } from '@/utils/class-validator.util.js';
import { PaginationQueries } from '@/utils/pagination.util.js';

export namespace Cat {
  export class Response extends CommonResponse {
    name: string;
    constructor(params: CatWithPublicFields) {
      super(params);
      this.name = params.name;
    }
  }

  export namespace Create {
    export class Dto {
      @IsDefined()
      @MaxLength(10)
      name: string;
    }

    export type Params = Create.Dto;
  }

  export namespace List {
    export type Params = PaginationQueries;
  }

  export namespace FindOne {
    export type Params = {
      ID: string;
    };
  }

  export namespace Update {
    export class Dto extends Create.Dto {}
    export type Params = {
      ID: string;
    };
  }

  export namespace Delete {
    export type Params = {
      ID: string;
    };
  }
}
