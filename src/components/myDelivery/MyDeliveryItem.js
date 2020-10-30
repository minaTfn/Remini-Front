import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FormattedMessage, injectIntl} from "react-intl";
import PropTypes from "prop-types";
import {confirmAlert} from 'react-confirm-alert';
import {connect} from "react-redux";
import {deleteDelivery} from "../../actions/delivery";
import 'react-confirm-alert/src/react-confirm-alert.css';

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
        <Card border="success" className="h-100">
            <Card.Header className="px-2">
                <span className="font-md">{direction}</span>
            </Card.Header>
            <Card.Body className="d-flex flex-column px-3 py-2">
                <Card.Title as="h6">
                    <Link to={`my-delivery/${delivery.slug}/`}>
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
                            owner: <FormattedMessage
                                id="you"
                                defaultMessage="You"
                            />
                        }}
                    />
                </small>
                <div className="ml-auto">
                    <Link className="mr-2" to={`/my-deliveries/${delivery.slug}/edit`}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </Link>
                    <button type="button" className="btn btn-link p-0 border-0 align-text-top" onClick={onDelete}>
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
