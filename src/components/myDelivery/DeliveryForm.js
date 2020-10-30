import React, {Component} from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {FormattedMessage} from "react-intl";
import Loader from "react-loader";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";
import AjaxSelectFieldGroup from "../common/AjaxSelectFieldGroup";
import CheckFieldGroup from "../common/CheckFieldGroup";
import {ValidateDelivery} from "../common/Validator";
import api from "../../utils/api";
import {convertToSelect} from "../common/Functions";
import {Link} from "react-router-dom";


class DeliveryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                origin_country_id: 1,
                origin_city_id: 0,
                destination_country_id: 1,
                destination_city_id: 0,
                title: "",
                description: "",
                payment_method_id: 1,
                delivery_method_id: 1,
                contact_method_ids: [1],
            },
            originCities: [],
            destinationCities: [],
            originQuerySearch: '',
            destinationQuerySearch: '',
            originTimeout: 0,
            destinationTimeout: 0,
            originSearching: false,
            destinationSearching: false,
            errors: {},
            isSubmitting: false,
            isLoading: true,
        };
    }

    componentDidMount = () => {
        this.setState({isLoading: false});


    };

    static getDerivedStateFromProps(props) {
        console.log(props);
        if (Object.keys(props.data).length > 0) {
            return {
                data: {
                    origin_country_id: props.data.origin.country.id,
                    origin_city_id: props.data.origin.id,
                    destination_country_id: props.data.destination.country.id,
                    destination_city_id: props.data.destination.id,
                    delivery_method_id: props.data.delivery_method.id,
                    payment_method_id: props.data.payment_method.id,
                    contact_method_ids: props.data.contact_methods.map(
                        (method) => method.id
                    ),
                    ...props.data,
                },
            };
        }

        return null;
    }

    onChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]:
                    e.target.type === "radio" ? parseInt(e.target.value) : e.target.value,
            },
        });
    };

    onCheckChange = (e) => {
        const value = parseInt(e.target.value);
        if (e.target.checked) {
            this.setState({
                data: {
                    ...this.state.data,
                    [e.target.name]: [...this.state.data[e.target.name], value],
                },
            });
        } else {
            this.setState({
                data: {
                    ...this.state.data,
                    [e.target.name]: this.state.data[e.target.name].filter(function (
                        item
                    ) {
                        return item !== value;
                    }),
                },
            });
        }
    };

    onSelectChange = (value, meta) => {
        this.setState({
            data: {...this.state.data, [meta.name]: parseInt(value.value)},
        });
    };

    onBlurValidate = (e) => {
        const field = e.target.name;
        const {errors, isValid} = ValidateDelivery(this.state.data);
        if (!isValid) {
            const varErrors = this.state.errors;
            if (!isValid) {
                varErrors[field] = errors[field];
            } else {
                varErrors[field] = "";
            }
            this.setState({errors: varErrors});
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isSubmitting: true});
            this.props
                .submit(this.state.data)
                .then(() => {
                    this.props.addFlashMessage({
                        type: "success",
                        text: "New Delivery Added",
                    });
                })
                .catch((error) => {
                    // console.log(error);
                    this.setState({errors: error.response.data.errors, isSubmitting: false});
                });
        }
    };

    onChangeSearch = (searchValue, name) => {
        if (this.state[`${name}Timeout`]) clearTimeout(this.state[`${name}Timeout`]);
        this.setState({[`${name}QuerySearch`]: searchValue});
        if (searchValue.length > 2) {
            this.setState({[`${name}Searching`]: true});
            this.state[`${name}Timeout`] = setTimeout(() => {
                const q = `?q=${searchValue}`;
                const countryId = this.state.data[`${name}_country_id`];
                api.delivery.cities(countryId, q).then((data) => {
                    const cities = convertToSelect(data);
                    this.setState({
                        [`${name}Cities`]: cities,
                        [`${name}Searching`]: false
                    });
                });
            }, 1000);
        } else {
            this.setState({
                [`${name}Cities`]: []
            });
        }
    }

    onOriginChangeSearch = (searchValue) => {
        this.onChangeSearch(searchValue, 'origin');
    }

    onDestinationChangeSearch = (searchValue) => {
        this.onChangeSearch(searchValue, 'destination');
    }

    isValid() {
        const {errors, isValid} = ValidateDelivery(this.state.data);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    render() {
        const {
            countries,
            paymentMethods,
            deliveryMethods,
            contactMethods,
        } = this.props;

        const {
            errors,
            data,
            isSubmitting,
            originCities,
            destinationCities,
            isLoading,
        } = this.state;
        const {lang} = this.props;
        const translatedTitle = lang === 'fa' ? `title_${lang}` : 'title';

        return (
            <Loader loaded={!isLoading}>
                <div className="col-md-9">
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <SelectFieldGroup
                                    error={errors.origin_country_id}
                                    label={
                                        <FormattedMessage
                                            id="delivery.origin_country"
                                            defaultMessage="origin_country"
                                        />
                                    }
                                    onChange={this.onSelectChange}
                                    options={Object.values(countries)}
                                    isSearchable
                                    isRequired
                                    field="origin_country_id"
                                    defaultValue={data.origin_country_id}
                                />
                            </div>
                            <div className="col-md-6">
                                <AjaxSelectFieldGroup
                                    error={errors.origin_city_id}
                                    label={
                                        <FormattedMessage
                                            id="delivery.origin_city"
                                            defaultMessage="origin_city"
                                        />
                                    }
                                    onChange={this.onSelectChange}
                                    options={originCities}
                                    isSearchable
                                    NoOptionsMessage={this.state.originSearching ? 'Searching...' : 'No Options'}
                                    inputValue={this.state.originQuerySearch}
                                    changeSearch={this.onOriginChangeSearch}
                                    isClearable
                                    field="origin_city_id"
                                    defaultValue={data.origin_city_id}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <SelectFieldGroup
                                    error={errors.destination_country_id}
                                    label={
                                        <FormattedMessage
                                            id="delivery.destination_country"
                                            defaultMessage="destination_country"
                                        />
                                    }
                                    onChange={this.onSelectChange}
                                    options={Object.values(countries)}
                                    isSearchable
                                    isRequired
                                    field="destination_country_id"
                                    defaultValue={data.destination_country_id}
                                />
                            </div>
                            <div className="col-md-6">
                                <AjaxSelectFieldGroup
                                    error={errors.destination_city_id}
                                    label={
                                        <FormattedMessage
                                            id="delivery.destination_city"
                                            defaultMessage="destination_city"
                                        />
                                    }
                                    onChange={this.onSelectChange}
                                    options={destinationCities}
                                    NoOptionsMessage={this.state.destinationSearching ? 'Searching...' : 'No Options'}
                                    inputValue={this.state.destinationQuerySearch}
                                    changeSearch={this.onDestinationChangeSearch}
                                    isSearchable
                                    isClearable
                                    field="destination_city_id"
                                    defaultValue={data.destination_city_id}
                                />
                            </div>
                        </div>
                        <TextFieldGroup
                            error={errors.title}
                            label={
                                <FormattedMessage id="title" defaultMessage="title"/>
                            }
                            onChange={this.onChange}
                            onBlur={this.onBlurValidate}
                            field="title"
                            isRequired
                            value={data.title}
                        />
                        <TextAreaFieldGroup
                            error={errors.description}
                            label={
                                <FormattedMessage
                                    id="description"
                                    defaultMessage="description"
                                />
                            }
                            onChange={this.onChange}
                            isRequired
                            onBlur={this.onBlurValidate}
                            field="description"
                            value={data.description}
                        />
                        <CheckFieldGroup
                            error={errors.contact_method_ids}
                            items={Object.values(contactMethods)}
                            title={translatedTitle}
                            label={
                                <FormattedMessage
                                    id="delivery.contact_method"
                                    defaultMessage="contact_method"
                                />
                            }
                            inline
                            defaultCheckBoxValue={data.contact_method_ids}
                            name="contact_method_ids"
                            type="checkbox"
                            onChange={this.onCheckChange}
                            isRequired
                        />
                        <CheckFieldGroup
                            error={errors.payment_method_id}
                            items={Object.values(paymentMethods)}
                            title={translatedTitle}
                            label={
                                <FormattedMessage
                                    id="delivery.payment_method"
                                    defaultMessage="payment_method"
                                />
                            }
                            inline
                            name="payment_method_id"
                            defaultRadioValue={data.payment_method_id}
                            type="radio"
                            onChange={this.onChange}
                            isRequired
                        />
                        <CheckFieldGroup
                            error={errors.delivery_method_id}
                            items={Object.values(deliveryMethods)}
                            title={translatedTitle}
                            label={
                                <FormattedMessage
                                    id="delivery.delivery_method"
                                    defaultMessage="delivery_method"
                                />
                            }
                            inline
                            defaultRadioValue={data.delivery_method_id}
                            name="delivery_method_id"
                            type="radio"
                            onChange={this.onChange}
                            isRequired
                        />

                        <div className="form-group mt-5">
                            <Button type="submit" variant="primary" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <FormattedMessage
                                        id="submitting"
                                        defaultMessage="submit"
                                    />
                                ) : (
                                    <FormattedMessage id="submit" defaultMessage="submit"/>
                                )}
                            </Button>
                            <Link
                                to="/my-deliveries"
                                className="btn btn-light border ml-2">
                                <FormattedMessage
                                    id="cancel"
                                />
                            </Link>
                        </div>
                    </form>
                </div>
            </Loader>
        );
    }
}

DeliveryForm.propTypes = {
    action: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([PropTypes.object]).isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
};

export default DeliveryForm;
