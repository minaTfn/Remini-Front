import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShippingFast, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import MyDeliveryItem from "../myDelivery/MyDeliveryItem";
import DeliveryItem from "./DeliveryItem";

const DeliveriesList = (props) => {
    const {deliveryItems, cities} = props.deliveries;
    const {lang} = localStorage;

    const translatedTitle = lang === 'fa' ? `title_${lang}` : 'title';
    const translatedDate = (lang === 'fa') ? `${lang}_request_date` : 'request_date';
    const iconDir = lang === 'fa' && `fa-flip-horizontal`;

    const direction = (fromCity, toCity) => {
        return <>
            <b className="font-sm px-1">{cities[fromCity].country[translatedTitle]}</b>
            <FontAwesomeIcon icon={faAngleDoubleRight} className={`font-sm ${iconDir}`}/>
            <span className="text-primary font-sm mx-1">{cities[fromCity].title}</span>
            <FontAwesomeIcon icon={faShippingFast} className={`mx-2 ${iconDir}`}/>
            <b className="font-sm px-1">{cities[toCity].country[translatedTitle]} </b>
            <FontAwesomeIcon icon={faAngleDoubleRight} className={`font-sm ${iconDir}`}/>
            <span className="text-primary font-sm mx-1">{cities[toCity].title}</span>

        </>
    };

    return (
        <>
            <div className="m-3 text-muted">
                <FormattedMessage
                    id="delivery.items"
                    values={{count: `${props.totalItems}`}}
                />
            </div>
            <div className="d-flex custom-flex flex-wrap justify-content-between">
                {deliveryItems ?
                Object.keys(deliveryItems).map((keyName) => (
                    <div className="mb-3 px-2 col-md-4 col-sm-6" key={deliveryItems[keyName].slug}>
                        {props.myDelivery
                            ? <MyDeliveryItem
                                delivery={deliveryItems[keyName]}
                                translatedDate={translatedDate}
                                direction={direction(
                                    deliveryItems[keyName].origin,
                                    deliveryItems[keyName].destination
                                )}
                            />
                            : <DeliveryItem
                                delivery={deliveryItems[keyName]}
                                translatedDate={translatedDate}
                                direction={direction(
                                    deliveryItems[keyName].origin,
                                    deliveryItems[keyName].destination
                                )}
                            />
                        }
                    </div>

                )) : 'No Item'}
            </div>
        </>
    );
};

DeliveriesList.propTypes = {
    totalItems: PropTypes.number.isRequired,
    myDelivery: PropTypes.bool,
    deliveries: PropTypes.objectOf(
        PropTypes.shape({
            deliveryItems: PropTypes.objectOf(
                PropTypes.shape({
                    key: PropTypes.objectOf(
                        PropTypes.shape({
                            slug: PropTypes.string.isRequired,
                            title: PropTypes.string.isRequired,
                        })
                    ),
                })
            ),
            cities: PropTypes.objectOf(
                PropTypes.shape({
                    key: PropTypes.objectOf(
                        PropTypes.shape({
                            id: PropTypes.number.isRequired,
                            title: PropTypes.string.isRequired,
                            title_fa: PropTypes.string.isRequired,
                        })
                    ),
                })
            ),
        })
    ),
};
DeliveriesList.defaultProps = {
    myDelivery: false,
    deliveries: {},
};


export default DeliveriesList;
