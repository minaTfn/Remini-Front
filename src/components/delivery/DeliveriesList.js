import React from "react";
import {FormattedMessage} from "react-intl";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleRight,
    faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import MyDeliveryItem from "../myDelivery/MyDeliveryItem";
import DeliveryItem from "./DeliveryItem";

const DeliveriesList = (props) => {
    const {deliveryItems, cities} = props.deliveries;
    const {lang} = localStorage;

    const translatedTitle = lang === 'fa' ? `title_${lang}` : 'title';
    const translatedDate = (lang === 'fa') ? `${lang}_request_date` : 'request_date';
    const iconDir = lang === 'fa' && `fa-flip-horizontal`;


    const isAuthenticated = useSelector((state) => !!state.user.email);

    const direction = (fromCity, toCity) => {
        return <>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="font-lg mx-2 text-info"/>
            <span>
                <b className="px-1 text-info">{cities[fromCity].country[translatedTitle]},</b>
                <span className="mx-1 font-sm">{cities[fromCity].title}</span>
                <FontAwesomeIcon icon={faAngleDoubleRight} className={`font-sm mx-2 ${iconDir}`}/>
                <b className="px-1 text-info">{cities[toCity].country[translatedTitle]} ,</b>
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
                                        isAuthenticated={isAuthenticated}
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


export default DeliveriesList;
