import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTime', async: false })
export class IsTimeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'Time should be in the format hh:mm, for example "10:30"';
  }
}

export function IsTime(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    return registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTimeConstraint,
    });
  };
}
