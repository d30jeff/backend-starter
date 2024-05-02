import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const formatPhoneNumber = (phoneNumber: string, code: string) => {
  try {
    const phone = phoneUtil.parseAndKeepRawInput(phoneNumber, code);
    return phoneUtil.format(phone, PhoneNumberFormat.E164);
  } catch (error) {
    return phoneNumber;
  }
};
