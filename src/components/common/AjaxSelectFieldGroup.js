import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Select from "react-select";

const AjaxSelectFieldGroup = ({
                                  field,
                                  label,
                                  defaultValue,
                                  options,
                                  error,
                                  isSearchable,
                                  changeSearch,
                                  NoOptionsMessage,
                                  isRtl,
                                  isDisabled,
                                  isLoading,
                                  isClearable,
                                  isMulti,
                                  onChange,
                                  classType,
                                  description,
                                  isRequired,
                                  placeholder,
                                  inputValue
                              }) => {
    const inRow = classType === "inRow" ? 1 : 0;
    const defaultValVar = options.filter(option => option.value === defaultValue);
    const defaultVal = defaultValVar[0];
    return (
        <div className={`form-group ${inRow ? "d-flex" : ""}`}>
            <label
                htmlFor={field}
                className={`control-label ${inRow ? "col-form-label mr-2" : ""}`}
            >
                {label}
                {isRequired ? <span className="text-danger"> * </span> : ''}
                {inRow ? ': ' : ''}
            </label>
            <div className={inRow ? "flex-grow-1" : ""}>
                <Select
                    className={classnames((isMulti ? "basic-multi-select" : "basic-single"), 'min190', {"is-invalid": error})}
                    classNamePrefix="select"
                    value={defaultVal}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name={field}
                    options={options}
                    isMulti={isMulti}
                    placeholder={placeholder}
                    inputValue = {inputValue}
                    onInputChange={changeSearch}
                    noOptionsMessage={() => NoOptionsMessage}
                    // onSelectResetsInput={false}
                    // onBlurResetsInput={false}
                    onChange={onChange}
                />
                {Array.isArray(error) &&
                <span className="invalid-feedback">{error.map((errorItem, key) => <div key={key}
                                                                                       className="d-block">{errorItem}</div>)}</span>}
            </div>
            {description && <div className="col-sm-3">{description}</div>}
        </div>
    );
};

AjaxSelectFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    placeHolder: PropTypes.string,
    defaultValue: PropTypes.number,
    options: PropTypes.array.isRequired,
    label: PropTypes.object.isRequired,
    classType: PropTypes.string,
    error: PropTypes.array,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isSearchable: PropTypes.bool,
    isRtl: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    isClearable: PropTypes.bool,
    isMulti: PropTypes.bool,
    onBlur: PropTypes.func,
    description: PropTypes.object,
    isRequired: PropTypes.bool,
};
AjaxSelectFieldGroup.defaultProps = {
    type: "text",
    classType: "inColumn",
    isSearchable: true,
    isRtl: false,
    isDisabled: false,
    isLoading: false,
    isClearable: false,
    isMulti: false,
    isRequired: false,
};
export default AjaxSelectFieldGroup;
