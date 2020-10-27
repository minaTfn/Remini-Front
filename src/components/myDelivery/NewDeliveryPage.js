import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import DeliveryForm from "./DeliveryForm";
import {addNewDelivery} from "../../actions/delivery";
import {addFlashMessage} from "../../actions/flashMessages";

function NewDeliveryPage(props) {

    const onSubmit = (data) => {
        return props.addNewDelivery(data)
            .then(() => props.history.push("/my-deliveries"));
    }

    const {contactMethods, deliveryMethods, paymentMethods, countries,lang} = props;
    const data = {};

    return (
        <div className="d-block">

            <DeliveryForm
                submit={onSubmit}
                contactMethods={contactMethods}
                deliveryMethods={deliveryMethods}
                paymentMethods={paymentMethods}
                countries={countries}
                data={data}
                lang={lang}
                action="new"
                addFlashMessage={props.addFlashMessage}
            />
        </div>
    );
}

NewDeliveryPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    addNewDelivery: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    countries: PropTypes.object.isRequired,
    deliveryMethods: PropTypes.object.isRequired,
    paymentMethods: PropTypes.object.isRequired,
    contactMethods: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.locale,
        countries: state.delivery.countries,
        deliveryMethods: state.delivery.deliveryMethods,
        paymentMethods: state.delivery.paymentMethods,
        contactMethods: state.delivery.contactMethods,
    }
}

export default connect(mapStateToProps, {addNewDelivery, addFlashMessage})(
    NewDeliveryPage
);
