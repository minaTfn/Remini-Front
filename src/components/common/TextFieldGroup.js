import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
  field,
  value,
  label,
  error,
  type,
  onChange,
  autoComplete,
  onBlur,
  disabled,
  classType,
  description,
  isRequired,
  placeholder,
}) => {
  const className = disabled ? "border-0 bg-light" : "";
  const inRow = classType === "inRow" ? 1 : 0;

  return (
    <div className={`form-group ${inRow ? "d-flex" : ""}`}>
      <label
        htmlFor={field}
        className={`control-label ${inRow ? "mr-2 col-form-label col-sm-2" : ""}`}
      >
        {label}
        {isRequired ? <span className="text-danger"> * </span> : ""}
        {inRow ? ": " : ""}
      </label>
      <div className={inRow ? "flex-grow-1" : ""}>
        <input
          value={value || ""}
          onBlur={onBlur}
          disabled={disabled ? "disabled" : ""}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={onChange}
          type={type}
          name={field}
          className={classnames(`form-control ${className} `, {
            "is-invalid": error,
          })}
        />
        {Array.isArray(error) && (
          <span className="invalid-feedback">
            {error.map((errorItem, key) => (
              <div key={key} className="d-block">
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

TextFieldGroup.propTypes = {
  field: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  classType: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  error: PropTypes.array,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  description: PropTypes.object,
  isRequired: PropTypes.bool,
};
TextFieldGroup.defaultProps = {
  type: "text",
  disabled: false,
  classType: "inColumn",
  isRequired: false,
};
export default TextFieldGroup;
