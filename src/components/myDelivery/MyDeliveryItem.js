import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from "prop-types";
import {confirmAlert} from 'react-confirm-alert';
import {connect} from "react-redux";
import {deleteDelivery} from "../../actions/delivery";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {faEye} from "@fortawesome/free-regular-svg-icons";
import Pluralize from "pluralize";

const MyDeliveryItem = (props) => {

    const {delivery, direction, translatedDate, intl} = props;

    const onDelete = () => {

        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className='custom-alert-ui'>
                        <div className="alert_header">
                            {intl.formatMessage({id: 'alert.delete.title'})}
                        </div>
                        <div className="alert_body">
                            {intl.formatMessage({id: 'alert.delete.body'})}
                        </div>
                        <div className="alert_actions">
                            <button type="button" className="btn btn-danger" onClick={onClose}>
                                {intl.formatMessage({id: 'no'})}
                            </button>
                            <button
                                className="btn btn-primary ml-2"
                                type="button"
                                onClick={() => {
                                    props.deleteDelivery(delivery.slug);
                                    onClose();
                                }}
                            >
                                {intl.formatMessage({id: 'alert.delete.yes'})}
                            </button>
                        </div>

                    </div>
                );
            }
        });
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
                    <Link to={`my-delivery/${delivery.slug}/`}>
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
            <Card.Footer className="px-3 py-2 d-flex">
                <FontAwesomeIcon icon={faUserCircle} className="font-xl mr-2 text-info"/>
                <small className="text-muted">
                    <FormattedMessage
                        id="delivery.requested"
                        defaultMessage="requested"
                        values={{
                            owner: <FormattedMessage
                                id="you"
                                defaultMessage="You"
                            />
                        }}
                    />
                </small>
                <div className="ml-auto">
                    <Link className="mr-2 text-info" to={`/my-deliveries/${delivery.slug}/edit`}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </Link>
                    <button type="button" className="btn btn-link text-info p-0 border-0 align-text-top" onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
            </Card.Footer>
        </Card>
    );
};
MyDeliveryItem.propTypes = {
    direction: PropTypes.object.isRequired,
    translatedDate: PropTypes.string.isRequired,
    delivery: PropTypes.object.isRequired,
    deleteDelivery: PropTypes.func.isRequired,
};
export default connect(null, {deleteDelivery})(
    injectIntl(MyDeliveryItem)
);
