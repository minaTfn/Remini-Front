import React from "react";
import PropTypes from "prop-types";
import {Form} from "react-bootstrap";

const CheckFieldGroup = ({
                             label,
                             error,
                             items,
                             name,
                             type,
                             onChange,
                             disabled,
                             inline,
                             description,
                             isRequired,
                             defaultCheckBoxValue,
                             defaultRadioValue
                         }) => {
    return (
        <div className="form-group">
            <label htmlFor={name} className="control-label">
                {label}
                {isRequired ? <span className="text-danger"> * </span> : ""}
            </label>
            <div className={Array.isArray(error) ? "is-invalid" : ""}>
                {items.map((item) => (
                    <Form.Check
                        key={item.id}
                        custom
                        inline={inline}
                        disabled={disabled}
                        label={item.title}
                        value={item.id}
                        type={type}
                        checked={(type === 'checkbox') ? defaultCheckBoxValue.indexOf(item.id) > -1 : (defaultRadioValue === item.id)}
                        isInvalid={Array.isArray(error)}
                        onChange={onChange}
                        id={`${name}_${item.id}`}
                        name={name}
                    />
                ))}
                {Array.isArray(error) &&
                <span className="invalid-feedback mt-2">{error.map((errorItem, key) => <div key={key}
                                                                                       className="row offset-1">{errorItem}</div>)}</span>}
            </div>

            {description && <div className="col-sm-2">{description}</div>}
        </div>
    );
};

CheckFieldGroup.propTypes = {
    label: PropTypes.object.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    error: PropTypes.array,
    defaultCheckBoxValue: PropTypes.array,
    defaultRadioValue: PropTypes.number,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    description: PropTypes.object,
    isRequired: PropTypes.bool,
    inline: PropTypes.bool,
};
CheckFieldGroup.defaultProps = {
    type: "checkbox",
    isRequired: false,
    inline: false,
};
export default CheckFieldGroup;
