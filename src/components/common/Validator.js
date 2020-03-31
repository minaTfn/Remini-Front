import Validator from 'validator';
import isEmpty from "lodash/isEmpty";

export function ValidateLogin(data) {
    let errors = {};

    if (Validator.isEmpty(data.email)) {
        errors.email = 'This field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'This field is required';
    } else if (!Validator.isLength(data.password, {min: 8})) {
        errors.password = 'Password must be at least 8 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }

}
export function ValidateProfile(data) {
    let errors = {};

    if (!Validator.isLength(data.first_name, {min: 3})) {
        errors.first_name = 'First Name is invalid';
    }

    if (!Validator.isLength(data.last_name, {min: 3})) {
        errors.last_name = 'Last Name is invalid';
    }

    if ((!Validator.isEmpty(data.cell_number) && !Validator.isMobilePhone(data.cell_number, 'fa-IR')) || !Validator.isNumeric(data.cell_number)) {
        errors.cell_number = 'Cell Number is invalid';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }

}

export function ValidateSignUp(data) {
    let errors = {};

    if (Validator.isEmpty(data.email)) {
        errors.email = 'This field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    // if (Validator.isEmpty(data.password)) {
    //     errors.password = 'This field is required';
    // } else if (!Validator.isLength(data.password, {min: 8})) {
    //     errors.password = 'Password must be at least 8 characters';
    // }

    if ((!Validator.isEmpty(data.cell_number) && !Validator.isMobilePhone(data.cell_number, 'fa-IR')) || !Validator.isNumeric(data.cell_number)) {
        errors.cell_number = 'Cell Number is invalid';
    }

    if (Validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = 'This field is required';
    }
    if (!Validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = 'Passwords must match';
    }
    return {
        errors,
        isValid: isEmpty(errors),
    }

}


