import { dayjs } from '@/utils/dayjs.util.js';

type CommonResponseParams = {
  ID?: string;
  createdAt?: Date;
  updatedAt?: Date;
  pictureURL?: string;
  documentURL?: string;
  videoURL?: string;
  labelURL?: string;
};

export class CommonResponse {
  ID?: string;
  createdAt?: string | null;
  updatedAt?: string;
  pictureURL?: string;
  documentURL?: string;
  videoURL?: string;
  labelURL?: string;
  commercialInvoiceURL?: string;

  constructor(params: CommonResponseParams) {
    if (params?.ID) {
      this.ID = params.ID;
    }

    if (params?.createdAt) {
      this.createdAt = dayjs(params.createdAt).utc().format();
    }

    if (params?.updatedAt) {
      this.updatedAt = dayjs(params.updatedAt).utc().format();
    }

    if (params?.pictureURL) {
      this.pictureURL = params.pictureURL;
    }

    if (params?.documentURL) {
      this.documentURL = params.documentURL;
    }

    if (params?.videoURL) {
      this.videoURL = params.videoURL;
    }

    if (params?.labelURL) {
      this.labelURL = params.labelURL;
    }
  }
}
