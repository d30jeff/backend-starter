import { ClassConstructor, plainToInstance } from 'class-transformer';
import {
  ValidationArguments,
  ValidationOptions,
  buildMessage,
  registerDecorator,
  validateOrReject,
} from 'class-validator';

import {
  IsDefined as DefaultIsDefined,
  IsEmail as DefaultIsEmail,
  IsNotEmpty as DefaultIsNotEmpty,
  MaxLength as DefaultMaxLength,
  IsIn as DefaultIsIn,
  MinLength as DefaultMinLength,
} from 'class-validator';

export const IsDefined = (validationOptions?: ValidationOptions): PropertyDecorator => {
  return DefaultIsDefined({ ...validationOptions, message: '$property is required' });
};

export const IsIn = (
  values: readonly any[],
  validationOptions?: ValidationOptions
): PropertyDecorator => {
  return DefaultIsIn(values, {
    ...validationOptions,
    message: '$property must be in $constraint1',
  });
};

export const MaxLength = (
  max: number = 100,
  validationOptions?: ValidationOptions
): PropertyDecorator => {
  return DefaultMaxLength(max, {
    ...validationOptions,
    message: '$property cannot be more than $constraint1 characters',
  });
};

export const MinLength = (
  min: number = 2,
  validationOptions?: ValidationOptions
): PropertyDecorator => {
  return DefaultMinLength(min, {
    ...validationOptions,
    message: '$property needs to be at least $constraint1 characters',
  });
};

export const IsNotEmpty = (validationOptions?: ValidationOptions): PropertyDecorator => {
  return DefaultIsNotEmpty({ ...validationOptions, message: '$property cannot be blank' });
};
export const IsEmail = (validationOptions?: ValidationOptions): PropertyDecorator => {
  return DefaultIsEmail({}, { ...validationOptions, message: '$property must be a valid email' });
};

export async function validate<T>(cls: ClassConstructor<any>, plain: object): Promise<T> {
  const object = plainToInstance(cls, plain);

  if (!object) {
    return null;
  }

  await validateOrReject(object, {
    whitelist: true,
  });

  return object;
}

export function IsValidPictureURI(
  property: string = 'pictureURI',
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidPictureURI',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate: async (value: any, args: ValidationArguments) => {
          try {
            // await shared.services.s3.validateObjectByKey(value);
          } catch (error) {
            return false;
          }
          return true;
        },
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix} $property must be a valid URI`,
          validationOptions
        ),
      },
    });
  };
}
