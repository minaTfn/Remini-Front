import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";

const DeliveryItem = (props) => {
    const {delivery, direction, translatedDate} = props;
    return (

            <Card border="success" className="h-100">
                <Card.Header className="px-2">
                    <span className="font-md">{direction}</span>
                </Card.Header>
                <Card.Body className="d-flex flex-column px-3 py-2">
                    <Card.Title as="h6">
                        <Link style={{float: "left"}} to={`delivery/${delivery.slug}/`}>
                            {delivery.title}
                        </Link>

                    </Card.Title>
                    <Card.Text style={{
                        lineHeight: "25px",
                        verticalAlign: "top",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>{delivery.description}</Card.Text>
                </Card.Body>
                <Card.Footer className="px-3 py-2 d-flex">
                    <small className="text-muted">
                        <FormattedMessage
                            id="delivery.requested"
                            defaultMessage="requested"
                            values={{
                                date: `${delivery[translatedDate]}`,
                                owner: `${delivery.owner.name}`
                            }}
                        />
                    </small>
                </Card.Footer>
            </Card>
    );
};
DeliveryItem.propTypes = {
    direction: PropTypes.object.isRequired,
    translatedDate: PropTypes.string.isRequired,
    delivery: PropTypes.object.isRequired
};
export default DeliveryItem;
