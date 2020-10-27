import React, {useEffect, useState, Suspense} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import DeliveryForm from "./DeliveryForm";
import {addNewDelivery, editDelivery} from "../../actions/delivery";
import {addFlashMessage} from "../../actions/flashMessages";
import api from "../../utils/api";

function EditDeliveryPage(props) {

    const [delivery, setDelivery] = useState({});

    useEffect(() => {
        api.delivery.getDelivery(props.match.params.slug).then((data) => {
            setDelivery(data);
        });
    }, []);

    const onSubmit = (data) => {
        return props
            .editDelivery(props.match.params.slug, data)
            .then(() => props.history.push("/my-deliveries"));
    };
    const {contactMethods, deliveryMethods, paymentMethods, countries,lang} = props;

    return (
        <div className="d-block">
            <Suspense fallback={<h1>Loading profile...</h1>}>
                <DeliveryForm
                    contactMethods={contactMethods}
                    deliveryMethods={deliveryMethods}
                    paymentMethods={paymentMethods}
                    countries={countries}
                    submit={onSubmit}
                    data={delivery}
                    action="edit"
                    lang={lang}
                    addFlashMessage={props.addFlashMessage}
                />
            </Suspense>
        </div>
    );
}

EditDeliveryPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    editDelivery: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {addNewDelivery, editDelivery, addFlashMessage})(
    EditDeliveryPage
);
