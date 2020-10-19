import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
// import {FormattedMessage} from "react-intl";
import {Card, Col, Row} from "react-bootstrap";

const MyDeliveriesList = (props) => {
    const {deliveryItems, cities, paymentMethods} = props.deliveries;

    const direction = (fromCity, toCity) => {
        return cities[fromCity].country.id === cities[toCity].country.id
            ? `${cities[fromCity].title_fa} به ${cities[toCity].title_fa}`
            : `${cities[fromCity].country.title_fa} - ${cities[fromCity].title} به ${cities[toCity].country.title_fa} - ${cities[toCity].title_fa}`;
    };

    return (


        <>
            <Row>
                {deliveryItems &&
                Object.keys(deliveryItems).map((keyName, i) => (
                    <Col xs="12" className="mb-2" key={deliveryItems[keyName].slug}>
                        <Card border="success">
                            <Card.Header>
                                {direction(
                                    deliveryItems[keyName].origin_city,
                                    deliveryItems[keyName].destination_city
                                )}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title as="h6">{deliveryItems[keyName].title}</Card.Title>
                                <Card.Text style={{
                                    lineHeight: "25px",
                                    verticalAlign: "top",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                }}>{deliveryItems[keyName].description}</Card.Text>
                                <small className="text-muted">
                                    پرداخت{" "}
                                    {paymentMethods[deliveryItems[keyName].payment_method].title}
                                </small>
                                <Link style={{float:"left"}} to={`${deliveryItems[keyName].slug}/edit/`}>
                                    <EditIcon fontSize="small"/>
                                </Link>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
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

export default MyDeliveriesList;
