import _ from 'lodash';
import { ValidationError } from "./exceptions";

function validateFullName(value, errorsObject) {
  if (!value) {
    errorsObject['fullName'] = 'Full name must be provided';
  } else if (value.length > 100) {
    errorsObject['fullName'] = 'Full name exceeds 100 character limit';
  }
}

function validateBirthDate(value, errorsObject) {
  if(!value) {
    errorsObject['birthDate'] = 'Birth date must be provided'
  }
}

function validatePhoneNumber (value, errorsObject) {
  if (!value) {
    errorsObject['phoneNumber'] = 'Phone number must be provided';
  } else if(!/^((\+7|7|8)+([0-9]){10})$/.test(value)) {
    errorsObject['phoneNumber'] = 'This is not valid russian phone number';
  }
}

export default class PersonValidator {
  constructor(person) {
    this.person = person;
    this.validators = {
      'fullName': validateFullName,
      'birthDate': validateBirthDate,
      'phoneNumber': validatePhoneNumber
    };
    this.errors = {}
  }

  validate() {
    for (const fieldName of Object.keys(this.person)) {
      this._validateField(fieldName, this.person[fieldName])
    }
    if(Object.keys(this.errors).length > 0) {
      throw new ValidationError(this.errors)
    }
  }

  _validateField = (fieldName, fieldValue) => {
    const validator = _.get(this.validators, fieldName, () => {});
    validator(fieldValue, this.errors)
  }
}