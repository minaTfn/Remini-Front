import React, {Suspense} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faShippingFast,
    faAngleDoubleRight,
    faPlaneArrival,
    faPlaneDeparture,
    faMapMarkerAlt,
    faLongArrowAltRight
} from '@fortawesome/free-solid-svg-icons';
import MyDeliveryItem from "../myDelivery/MyDeliveryItem";
import DeliveryItem from "./DeliveryItem";
import path from "../../theme/default/images/path2.png";
import {Image} from "react-bootstrap";

const DeliveriesList = (props) => {
    const {deliveryItems, cities} = props.deliveries;
    const {lang} = localStorage;

    const translatedTitle = lang === 'fa' ? `title_${lang}` : 'title';
    const translatedDate = (lang === 'fa') ? `${lang}_request_date` : 'request_date';
    const iconDir = lang === 'fa' && `fa-flip-horizontal`;

    const direction = (fromCity, toCity) => {
        return <>
            {/*<Image src={path} width={50} className="mr-2 p-1" /><br/>*/}
            <FontAwesomeIcon icon={faMapMarkerAlt} className="font-md mx-2"/>
            <span>
                <b className="px-1">{cities[fromCity].country[translatedTitle]},</b>
                <span className="mx-1 font-sm">{cities[fromCity].title}</span>
                <FontAwesomeIcon icon={faAngleDoubleRight} className={`font-sm mx-2 ${iconDir}`}/>

                <b className="px-1">{cities[toCity].country[translatedTitle]} ,</b>
                <span className="mx-1 font-sm">{cities[toCity].title}</span>
            </span>
        </>
    };

    return (
        <>

            {deliveryItems ?
                <div>
                    <div className="m-3 text-muted">
                        <FormattedMessage
                            id="delivery.items"
                            values={{count: `${props.totalItems}`}}
                        />
                    </div>
                    <div className="d-flex custom-flex flex-wrap justify-content-between">
                        {Object.keys(deliveryItems).map((keyName) => (
                            <div className="mb-4 pr-4 pl-0 col-md-4 col-sm-6" key={deliveryItems[keyName].slug}>
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

                        ))}
                    </div>
                </div>
                : <div className="font-xl text-center py-5">
                    <FormattedMessage
                        id="delivery.no.items"
                    />
                </div>
            }
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
