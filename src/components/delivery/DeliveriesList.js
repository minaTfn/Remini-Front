import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShippingFast, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

const MyDeliveriesList = (props) => {
    const {deliveryItems, cities} = props.deliveries;

    const {lang} = localStorage;

    const titleFa = lang === 'fa' ? `title_${lang}` : 'title';
    const iconDir = lang === 'fa' && `fa-flip-horizontal`;
    const {intl} = props;
    const to = intl.formatMessage({id: 'to'});

    const direction = (fromCity, toCity) => {

        return cities[fromCity].country.id === cities[toCity].country.id
            ? <>
                <b className="font-sm px-1">{cities[fromCity].title}</b>
                <FontAwesomeIcon icon={faShippingFast} className="mx-2"/>
                <b className="font-sm px-1">{cities[toCity].title}</b>
            </>
            :
            <>
                <b className="font-sm px-1">{cities[fromCity].country[titleFa]}</b>
                <FontAwesomeIcon icon={faAngleDoubleRight} className={`font-sm ${iconDir}`}/>
                <span className="text-primary font-sm mx-1">{cities[fromCity].title}</span>
                <FontAwesomeIcon icon={faShippingFast} className={`mx-2 ${iconDir}`}/>
                <b className="font-sm px-1">{cities[toCity].country[titleFa]} </b>
                <FontAwesomeIcon icon={faAngleDoubleRight} className={`font-sm ${iconDir}`}/>
                <span className="text-primary font-sm mx-1">{cities[toCity].title}</span>

            </>
    };

    return (

        <>
            <div className="d-flex custom-flex flex-wrap justify-content-between">
                {deliveryItems &&
                Object.keys(deliveryItems).map((keyName, i) => (

                    <div className="mb-4" style={{width: "32%"}} key={deliveryItems[keyName].slug}>
                        <Card border="success" className="h-100">
                            <Card.Header className="px-2">
                                <span className="font-md">
                                    {direction(
                                        deliveryItems[keyName].origin,
                                        deliveryItems[keyName].destination
                                    )}
                                </span>
                            </Card.Header>
                            <Card.Body className="d-flex flex-column px-3 py-2">
                                <Card.Title as="h6">
                                    <Link style={{float:"left"}} to={`${deliveryItems[keyName].slug}/edit/`}>
                                        {deliveryItems[keyName].title}
                                    </Link>

                                </Card.Title>
                                <Card.Text style={{
                                    lineHeight: "25px",
                                    verticalAlign: "top",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                }}>{deliveryItems[keyName].description}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="px-3 py-2">
                                <small className="text-muted">
                                    <FormattedMessage
                                        id="delivery.requested"
                                        defaultMessage="requested"
                                    />{" "}
                                    {`${deliveryItems[keyName].request_date} by ${deliveryItems[keyName].owner} `}
                                </small>
                            </Card.Footer>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
};

MyDeliveriesList.propTypes = {
    deliveries: PropTypes.objectOf(
        PropTypes.shape({
            deliveryItems: PropTypes.objectOf(
                PropTypes.shape({
                    key: PropTypes.objectOf(
                        PropTypes.shape({
                            slug: PropTypes.number.isRequired,
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


export default injectIntl(MyDeliveriesList);
