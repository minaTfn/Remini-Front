import React, {useState} from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar, faEye} from '@fortawesome/free-regular-svg-icons';
import Pluralize from 'pluralize';
import api from "../../utils/api";

const DeliveryItem = (props) => {
    const {delivery, direction, translatedDate, isAuthenticated} = props;
    const [isFavorited, setIsFavorited] = useState(delivery.is_favorited);

    const addToFavorite = () => {
        if (isAuthenticated) {
            api.delivery.addFavorite(delivery.slug);
            setIsFavorited(!isFavorited);
        }
    }

    return (

        <Card className="h-100 border-0 delivery-card">
            <Card.Header className="px-2 card-header">
                <div className="d-flex">
                    <div className="ml-auto font-sm px-2 pt-1 text-gray">
                        {delivery[translatedDate]}
                    </div>
                </div>
                <div className="font-13 mt-2 text-center">{direction}</div>
            </Card.Header>
            <Card.Body className="d-flex flex-column px-3 py-4 card-body">

                <Card.Title as="h5">
                    <Link to={`delivery/${delivery.slug}/`}>
                        {delivery.title}
                    </Link>
                    <div className="font-sm mt-2 mr-2 text-gray">
                        <FontAwesomeIcon icon={faEye} className="font-sm mr-1"/>
                        <FormattedMessage
                            id={`delivery.${Pluralize('view', delivery.hit)}`}
                            defaultMessage="0 views"
                            values={{
                                hit: `${delivery.hit}`
                            }}
                        />
                    </div>
                </Card.Title>
                <Card.Text style={{
                    lineHeight: "25px",
                    verticalAlign: "top",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}>{delivery.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="px-3 py-3 d-flex card-footer align-items-center">
                <FontAwesomeIcon icon={faUserCircle} className="font-xl mr-2 text-info"/>
                <small className="text-muted">
                    <FormattedMessage
                        id="delivery.requested"
                        defaultMessage="requested"
                        values={{
                            owner: `${delivery.owner.name}`
                        }}
                    />
                </small>
                {isAuthenticated &&
                <button type="button" onClick={addToFavorite} className="ml-auto btn btn-link ml-2">
                    {isFavorited
                        ? <FontAwesomeIcon icon={faStar} className="font-xl text-info"/>
                        : <FontAwesomeIcon icon={farStar} className="font-xl text-info"/>
                    }
                </button>
                }
            </Card.Footer>
        </Card>
    );
};
DeliveryItem.propTypes = {
    direction: PropTypes.object.isRequired,
    translatedDate: PropTypes.string.isRequired,
    delivery: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};
export default DeliveryItem;
