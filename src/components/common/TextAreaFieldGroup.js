import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextAreaFieldGroup = ({
                                field,
                                value,
                                label,
                                error,
                                rows,
                                onChange,
                                onBlur,
                                disabled,
                                classType,
                                description,
                                isRequired,
                            }) => {
    const className = disabled ? "border-0 bg-light" : "";
    const inRow = classType === "inRow" ? 1 : 0;

    return (
        <div className={`form-group ${inRow ? "row" : ""}`}>
            <label
                htmlFor={field}
                className={`control-label ${inRow ? "col-sm-3 col-form-label" : ""}`}
            >
                {label}
                {isRequired ? <span className="text-danger"> * </span> : ""}
                {inRow ? " :" : ""}
            </label>
            <div className={inRow ? "col-sm-6" : ""}>
                <textarea
                    rows={rows}
                    onChange={onChange}
                    onBlur={onBlur}
                    id="exampleForm.ControlTextarea1"
                    value={value || ""}
                    name={field}
                    disabled={disabled ? "disabled" : ""}
                    className={classnames(`form-control ${className} `, {
                        "is-invalid": error,
                    })}
                />
                {Array.isArray(error) && (
                    <span className="invalid-feedback">
                        {error.map((errorItem, key) => (
                            <div key={key} className="row offset-1">
                                {errorItem}
                            </div>
                        ))}
                    </span>
                )}
            </div>
            {description && <div className="col-sm-3">{description}</div>}
        </div>
    );
};

TextAreaFieldGroup.propTypes = {
    field: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    classType: PropTypes.string,
    label: PropTypes.object.isRequired,
    error: PropTypes.array,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    autoComplete: PropTypes.string,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    description: PropTypes.object,
    isRequired: PropTypes.bool,
    rows: PropTypes.number,
};
TextAreaFieldGroup.defaultProps = {
    type: "text",
    disabled: false,
    classType: "inColumn",
    isRequired: false,
    rows: 3,
};
export default TextAreaFieldGroup;
