import React from "react";
import Validator from 'validator';
import isEmpty from "lodash/isEmpty";
import {FormattedMessage} from "react-intl";

export function ValidateLogin(data) {
    let errors = {};

    if (Validator.isEmpty(data.email)) {
        errors.email = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    } else if (!Validator.isEmail(data.email)) {
        errors.email = ['Email is invalid'];
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    } else if (!Validator.isLength(data.password, {min: 8})) {
        errors.password = [<FormattedMessage id="global.validate.Password_8_car" defaultMessage="Password must be at least 8 characters"/>];
        errors.password = [<FormattedMessage id="global.validate.Password_8_car" defaultMessage="Password must be at least 8 characters"/>];
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }

}

export function ValidateDelivery(data) {
    let errors = {};
    if (data.origin_country_id.length === 0) {
        errors.origin_country_id = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    }
    if (data.origin_city_id.length === 0) {
        errors.origin_city_id = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    }
    if (data.destination_country_id.length === 0) {
        errors.destination_country_id = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    }
    if (data.destination_city_id.length === 0) {
        errors.destination_city_id = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    }
    if (Validator.isEmpty(data.title)) {
        errors.title = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    }
    if(data.contact_methods_ids.length === 0){
        errors.contact_methods_ids = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    }
    if(data.payment_method_id.length === 0){
        errors.payment_method_id = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    }
    if(data.delivery_method_id.length === 0){
        errors.delivery_method_id = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}

export function ValidateChangePassword(data) {
    let errors = {};
    if (Validator.isEmpty(data.old_password)) {
        errors.old_password = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    } else if (!Validator.isLength(data.old_password, {min: 8})) {
        errors.old_password = ['Password is invalid'];
    }
    if (Validator.isEmpty(data.new_password)) {
        errors.new_password = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    } else if (!Validator.isLength(data.new_password, {min: 8})) {
        errors.new_password = [<FormattedMessage id="global.validate.Password_8_car" defaultMessage="Password must be at least 8 characters"/>];
    }
    if (Validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    }
    if (!Validator.equals(data.new_password, data.passwordConfirmation)) {
        errors.passwordConfirmation = ['Passwords must match'];
    }
    return {
        errors,
        isValid: isEmpty(errors),
    }
}

export function ValidateForgotPassword(data) {
    let errors = {};
    if (Validator.isEmpty(data.email)) {
        errors.email = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    } else if (!Validator.isEmail(data.email)) {
        errors.email = ['Email is invalid'];
    }
    return {
        errors,
        isValid: isEmpty(errors),
    }
}

export function ValidateResetPassword(data) {
    let errors = {};
    if (Validator.isEmpty(data.password)) {
        errors.password = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    } else if (!Validator.isLength(data.password, {min: 8})) {
        errors.password = [<FormattedMessage id="global.validate.Password_8_car" defaultMessage="Password must be at least 8 characters"/>];
    }
    if (Validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    }
    if (!Validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = [<FormattedMessage id="global.validate.password_match" defaultMessage="Passwords must match"/>];
    }
    return {
        errors,
        isValid: isEmpty(errors),
    }
}

export function ValidateProfile(data) {
    let errors = {};

    console.log(data);

    if (!Validator.isLength(toString(data.first_name), {min: 3})) {
        errors.first_name = ['First Name is invalid'];
    }

    if (!Validator.isLength(toString(data.last_name), {min: 3})) {
        errors.last_name = ['Last Name is invalid'];
    }

    if ((!Validator.isEmpty(data.cell_number) && !Validator.isMobilePhone(data.cell_number, 'fa-IR')) || !Validator.isNumeric(data.cell_number)) {
        errors.cell_number = ['Cell Number is invalid'];
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }

}

export function ValidateSignUp(data) {
    let errors = {};

    if (Validator.isEmpty(data.email)) {
        errors.email = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    } else if (!Validator.isEmail(data.email)) {
        errors.email = ['Email is invalid'];
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    } else if (!Validator.isLength(data.password, {min: 8})) {
        errors.password = [<FormattedMessage id="global.validate.Password_8_car" defaultMessage="Password must be at least 8 characters"/>];
    }

    if ((!Validator.isEmpty(data.cell_number) && !Validator.isMobilePhone(data.cell_number, 'fa-IR')) || !Validator.isNumeric(data.cell_number)) {
        errors.cell_number = ['Cell Number is invalid'];
    }

    if (Validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = [<FormattedMessage id="global.validate.required" defaultMessage="This field is required"/>];
    }
    if (!Validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = [<FormattedMessage id="global.validate.password_match" defaultMessage="Passwords must match"/>];
    }
    return {
        errors,
        isValid: isEmpty(errors),
    }

}


