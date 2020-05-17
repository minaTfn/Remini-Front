import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Select from "react-select";

const SelectFieldGroup = ({
                              field,
                              label,
                              defaultValue,
                              options,
                              error,
                              isSearchable,
                              isRtl,
                              isDisabled,
                              isLoading,
                              isClearable,
                              isMulti,
                              // onBlur,
                              onChange,
                              classType,
                              description,
                              isRequired
                          }) => {
    const inRow = classType === "inRow" ? 1 : 0;
    const defaultValVar = options.filter(option => option.value === defaultValue);
    const defaultVal= defaultValVar[0];
    return (
        <div className={`form-group ${inRow ? "row" : ""}`}>
            <label
                htmlFor={field}
                className={`control-label ${inRow ? "col-sm-3 col-form-label" : ""}`}
            >
                {label}
                {isRequired ? <span className="text-danger"> * </span> : ''}
                {inRow ? ' :' : ''}
            </label>
            <div className={inRow ? "col-sm-6" : ""}>
                <Select
                    className={classnames((isMulti ? "basic-multi-select" : "basic-single"), {"is-invalid": error})}
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
                    // onInputChange={onBlur}
                    // onSelectResetsInput={false}
                    // onBlurResetsInput={false}
                    onChange={onChange}
                />
                {Array.isArray(error) &&
                <span className="invalid-feedback">{error.map((errorItem, key) => <div key={key}
                                                                                       className="row offset-1">{errorItem}</div>)}</span>}
            </div>
            {description && <div className="col-sm-3">{description}</div>}
        </div>
    );
};

SelectFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
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
SelectFieldGroup.defaultProps = {
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
export default SelectFieldGroup;
