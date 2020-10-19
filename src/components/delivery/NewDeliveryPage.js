import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import DeliveryForm from "./DeliveryForm";
import {addNewDelivery} from "../../actions/delivery";
import {addFlashMessage} from "../../actions/flashMessages";
// import api from "../../utils/api";
// import {convertToSelect} from "../common/Functions";

class NewDeliveryPage extends Component {

    state = {
        // countries: [],
        // cities: [],
        // paymentMethods: [],
        // deliveryMethods: [],
        // contactMethods: [],
        data: []
    };

    // componentDidMount() {
    //     api.delivery.getCountries().then((data) => {
    //         const countries = convertToSelect(data);
    //         this.setState({countries});
    //     });
    //
    //     const country = 1;
    //     api.delivery.getCities(country).then((data) => {
    //         const cities = convertToSelect(data);
    //         this.setState({cities});
    //     });
    //
    //     api.delivery.getDeliveryMethods().then((deliveryMethods) => {
    //         this.setState({deliveryMethods});
    //     });
    //
    //     api.delivery.getPaymentMethods().then((paymentMethods) => {
    //         this.setState({paymentMethods});
    //     });
    //
    //     api.delivery.getContactMethods().then((contactMethods) => {
    //         this.setState({contactMethods});
    //     });
    // }

    submit = (data) => {
        return this.props
            .addNewDelivery(data)
            .then(() => this.props.history.push("/request/list"));
    }


    render() {
        const {addFlashMessage} = this.props;
        return (
            <div className="row">
                <div className="col-md-5 col-md-offset-4">
                    <DeliveryForm
                        submit={this.submit}
                        data={this.state.data}
                        lang={this.props.lang}
                        action="new"
                        addFlashMessage={addFlashMessage}
                    />
                </div>
            </div>
        );
    }
}

NewDeliveryPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    addNewDelivery: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
};
function mapStateToProps(state) {
    return{
        lang:state.locale,
    }
}

export default connect(mapStateToProps, {addNewDelivery, addFlashMessage})(
    NewDeliveryPage
);
