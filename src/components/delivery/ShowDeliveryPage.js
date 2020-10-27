import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Loader from "react-loader";
import api from "../../utils/api";
import ShowDelivery from "./ShowDelivery";
import ShowMyDelivery from "../myDelivery/ShowMyDelivery";
import {FormattedMessage} from "react-intl";

function ShowDeliveryPage(props) {
    const [delivery, setDelivery] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (props.isOwn) {
            api.delivery.getMyDelivery(props.match.params.slug).then((data) => {
                setDelivery(data);
                setIsLoading(false);
            });
        } else {
            api.delivery.getDelivery(props.match.params.slug).then((data) => {
                setDelivery(data);
                setIsLoading(false);
            });
        }


    }, [props.match.params.slug]);


    return (
        <Loader loaded={!isLoading}>
            <button
                type="button"
                className="btn btn-light border mr-2"
                onClick={props.history.goBack}>
                <FormattedMessage
                    id="back"
                />
            </button>
            {props.isOwn
                ? <ShowMyDelivery
                    delivery={delivery}
                />
                : <ShowDelivery
                    delivery={delivery}
                />
            }
        </Loader>
    );
};
ShowDeliveryPage.propTypes = {
    isOwn: PropTypes.bool,
    match: PropTypes.shape({
        params: PropTypes.shape({
            slug: PropTypes.string.isRequired,
        }),
    }),
};
export default ShowDeliveryPage;
