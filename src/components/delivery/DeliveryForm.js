import React, {Component} from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {FormattedMessage} from "react-intl";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";
import CheckFieldGroup from "../common/CheckFieldGroup";
import {ValidateDelivery} from "../common/Validator";
import api from "../../utils/api";
import {convertToSelect} from "../common/Functions";

class DeliveryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                origin_country_id: 0,
                origin_city_id: 0,
                destination_country_id: 0,
                destination_city_id: 0,
                title: "",
                description: "",
                payment_method_id: null,
                delivery_method_id: null,
                contact_methods_ids: [],
            },
            countries: [],
            originCities: [],
            destinationCities: [],
            paymentMethods: [],
            deliveryMethods: [],
            contactMethods: [],
            errors: {},
            isSubmitting: false,
        };
    }

    onInit = (props) => {
        api.delivery
            .getCountries()
            .then((items) => {

                const countries = convertToSelect(items, props.lang);
                const defaultCountry = countries[0].value;
                this.setState({
                    countries,
                    data: {
                        ...this.state.data,
                        origin_country_id: defaultCountry,
                        destination_country_id: defaultCountry,
                    },
                });
                return defaultCountry;
            })
            .then((country) => {
                api.delivery.getCities(country).then((data) => {
                    const cities = convertToSelect(data, props.lang);
                    const defaultCity = cities[0].value;
                    this.setState({
                        originCities: cities,
                        destinationCities: cities,
                        data: {
                            ...this.state.data,
                            origin_city_id: defaultCity,
                            destination_city_id: defaultCity,
                        },
                    });
                });
            });

        api.delivery.getDeliveryMethods().then((deliveryMethods) => {
            this.setState({deliveryMethods});
        });

        api.delivery.getPaymentMethods().then((paymentMethods) => {
            this.setState({paymentMethods});
        });

        api.delivery.getContactMethods().then((contactMethods) => {
            this.setState({contactMethods});
        });
    }

    componentDidMount = async () => {
        await this.onInit(this.props);
    };

    componentDidUpdate = async (prevProps) => {
        if (prevProps.lang !== this.props.lang) {
            await this.onInit(this.props);
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.action === "new") {
            if (
                state.deliveryMethods.length > 0 &&
                state.data.delivery_method_id === null
            ) {
                return {
                    data: {
                        ...state.data,
                        delivery_method_id: state.deliveryMethods[0].id,
                    },
                };
            }
            if (
                state.paymentMethods.length > 0 &&
                state.data.payment_method_id === null
            ) {
                return {
                    data: {
                        ...state.data,
                        payment_method_id: state.paymentMethods[0].id,
                    },
                };
            }
            if (
                state.contactMethods.length > 0 &&
                state.data.contact_methods_ids.length === 0
            ) {
                return {
                    data: {
                        ...state.data,
                        contact_methods_ids: [state.contactMethods[0].id],
                    },
                };
            }
        } else if (
            state.data.delivery_method_id === null &&
            Object.keys(props.data).length > 0
        ) {
            return {
                data: {
                    origin_country_id: props.data.origin_country.id,
                    origin_city_id: props.data.origin_city.id,
                    destination_country_id: props.data.destination_country.id,
                    destination_city_id: props.data.destination_city.id,
                    delivery_method_id: props.data.delivery_method.id,
                    payment_method_id: props.data.payment_method.id,
                    contact_methods_ids: props.data.contact_methods.map(
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
        if (meta.name === "origin_country_id") {
            const country = value.value;
            api.delivery.getCities(country).then((data) => {
                const originCities = convertToSelect(data);
                this.setState({
                    originCities,
                    data: {...this.state.data, origin_city_id: originCities[0].value},
                });
            });
        } else if (meta.name === "destination_country_id") {
            const country = value.value;
            api.delivery.getCities(country).then((data) => {
                const destinationCities = convertToSelect(data);
                this.setState({
                    destinationCities,
                    data: {
                        ...this.state.data,
                        destination_city_id: destinationCities[0].value,
                    },
                });
            });
        }
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
                    this.setState({errors: error.response.data, isSubmitting: false});
                });
        }
    };

    isValid() {
        const {errors, isValid} = ValidateDelivery(this.state.data);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    render() {
        const {
            errors,
            data,
            isSubmitting,
            countries,
            originCities,
            destinationCities,
            paymentMethods,
            deliveryMethods,
            contactMethods,
        } = this.state;
        return (
            <div>
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
                                options={countries}
                                isSearchable
                                isRequired
                                field="origin_country_id"
                                defaultValue={data.origin_country_id}
                            />
                        </div>
                        <div className="col-md-6">
                            <SelectFieldGroup
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
                                // isClearable
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
                                options={countries}
                                isSearchable
                                isRequired
                                field="destination_country_id"
                                defaultValue={data.destination_country_id}
                            />
                        </div>
                        <div className="col-md-6">
                            <SelectFieldGroup
                                error={errors.destination_city_id}
                                label={
                                    <FormattedMessage
                                        id="delivery.destination_city"
                                        defaultMessage="destination_city"
                                    />
                                }
                                onChange={this.onSelectChange}
                                options={destinationCities}
                                isSearchable
                                field="destination_city_id"
                                defaultValue={data.destination_city_id}
                            />
                        </div>
                    </div>
                    <TextFieldGroup
                        error={errors.title}
                        label={
                            <FormattedMessage id="global.title" defaultMessage="title"/>
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
                                id="global.description"
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
                        error={errors.contact_methods_ids}
                        items={contactMethods}
                        label={
                            <FormattedMessage
                                id="delivery.contact_method"
                                defaultMessage="contact_method"
                            />
                        }
                        inline
                        defaultCheckBoxValue={data.contact_methods_ids}
                        name="contact_methods_ids"
                        type="checkbox"
                        onChange={this.onCheckChange}
                        isRequired
                    />
                    <CheckFieldGroup
                        error={errors.payment_method_id}
                        items={paymentMethods}
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
                        items={deliveryMethods}
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

                    <div className="form-group">
                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <FormattedMessage
                                    id="global.submitting"
                                    defaultMessage="submit"
                                />
                            ) : (
                                <FormattedMessage id="global.submit" defaultMessage="submit"/>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

DeliveryForm.propTypes = {
    action: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.shape({
            delivery_method: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
            }).isRequired,
            payment_method: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
            }).isRequired,
            contact_methods: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    title: PropTypes.string.isRequired,
                })
            ),
        }).isRequired,
    ]).isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    // countries: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         value: PropTypes.string.isRequired,
    //         label: PropTypes.string.isRequired,
    //     })
    // ).isRequired,
    // cities: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         value: PropTypes.string.isRequired,
    //         label: PropTypes.string.isRequired,
    //     })
    // ).isRequired,
    // deliveryMethods: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         id: PropTypes.number.isRequired,
    //         title: PropTypes.string.isRequired,
    //     })
    // ).isRequired,
    // contactMethods: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         id: PropTypes.number.isRequired,
    //         title: PropTypes.string.isRequired,
    //     })
    // ).isRequired,
    // paymentMethods: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         id: PropTypes.number.isRequired,
    //         title: PropTypes.string.isRequired,
    //     })
    // ).isRequired,
};
DeliveryForm.propTypes = {
    lang: PropTypes.string.isRequired,
};
export default DeliveryForm;
