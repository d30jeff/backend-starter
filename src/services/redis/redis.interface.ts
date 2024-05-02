export namespace Redis {
  export const Keys: {
    S3SignedURL: 'S3SignedURL';
    StripePaymentLink: 'StripePaymentLink';
    Plans: 'Plans';
    EmailVerificationRequest: 'EmailVerificationRequest';
    AccountRecoveryRequest: 'AccountRecoveryRequest';
    AccountRecoveryCode: 'AccountRecoveryCode';
    AccountActivation: 'AccountActivation';
    BusinessAccountActivation: 'BusinessAccountActivation';
    AdminRecovery: 'AdminRecovery';
    FedexAccessToken: 'FedexAccessToken';
    CountryListToken: 'CountryListToken';
    UPSAccessToken: 'UPSAccessToken';
    OTPVerificationRequest: 'OTPVerificationRequest';
  } = {
    S3SignedURL: 'S3SignedURL',
    StripePaymentLink: 'StripePaymentLink',
    Plans: 'Plans',
    EmailVerificationRequest: 'EmailVerificationRequest',
    AccountRecoveryRequest: 'AccountRecoveryRequest',
    AccountRecoveryCode: 'AccountRecoveryCode',
    AccountActivation: 'AccountActivation',
    BusinessAccountActivation: 'BusinessAccountActivation',
    AdminRecovery: 'AdminRecovery',
    FedexAccessToken: 'FedexAccessToken',
    CountryListToken: 'CountryListToken',
    UPSAccessToken: 'UPSAccessToken',
    OTPVerificationRequest: 'OTPVerificationRequest',
  };

  export type Keys = (typeof Keys)[keyof typeof Keys];

  export type FindParams = {
    type: Keys;
    ID: string;
  };

  export interface CreateParams extends FindParams {
    value: string | object | number;
    ttl?: number;
  }

  export type GetTTLParams = FindParams;
  export type DeleteParams = FindParams;
}
