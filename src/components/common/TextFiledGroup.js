import React from 'react';
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFiledGroup = ({field, value, label, error, type, onChange, autoComplete, onBlur, disabled, classType}) => {
    const className = disabled ? "border-0 bg-light" : "";
    const inRow = (classType === 'inRow') ? 1 : 0;
    return (
        <div className={`form-group ${inRow ? "row" : ""}`}>
            <label htmlFor="email" className={`control-label ${inRow ? "col-sm-3 col-form-label" : ""}`}>{inRow ? label+" :" : label}</label>
            <div className={inRow ? "col-sm-9" : ""}>
                <input value={value || ''} onBlur={onBlur} disabled={disabled ? "disabled" : ""}
                       autoComplete={autoComplete}
                       onChange={onChange} type={type} name={field}
                       className={classnames(`form-control ${className} `, {'is-invalid': error})}/>
                       {Array.isArray(error) && <span className="invalid-feedback">{error.map((errorItem, key) => <div key={key} className="row offset-1">{errorItem}</div>)}</span>}
            </div>
        </div>
    )

}

TextFiledGroup.propTypes = {
    field: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    classType: PropTypes.string,
    label: PropTypes.string.isRequired,
    error: PropTypes.array,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    autoComplete: PropTypes.string,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,

}
TextFiledGroup.defaultProps = {
    type: 'text',
    disabled: false,
    classType: "inColumn"
}
export default TextFiledGroup;