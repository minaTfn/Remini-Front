import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import DeliveryForm from "./DeliveryForm";
import {addNewDelivery, editDelivery} from "../../actions/delivery";
import {addFlashMessage} from "../../actions/flashMessages";
import api from "../../utils/api";

class EditDeliveryPage extends Component {

    state = {
        data: []
    };

    componentDidMount() {
        api.delivery.getDelivery(this.props.match.params.slug).then((data) => {
            this.setState({data});
        });
    }

    submit = (data) => {
        return this.props
            .editDelivery(this.props.match.params.slug, data)
            .then(() => this.props.history.push("/delivery/list"));
    }


    render() {
        const {addFlashMessage} = this.props;
        return (
            <div className="row">
                <div className="col-md-5 col-md-offset-4">
                    <DeliveryForm
                        submit={this.submit}
                        // countries={this.state.countries}
                        // cities={this.state.cities}
                        // paymentMethods={this.state.paymentMethods}
                        // deliveryMethods={this.state.deliveryMethods}
                        // contactMethods={this.state.contactMethods}
                        data={this.state.data}
                        action="edit"
                        lang={this.props.lang}
                        addFlashMessage={addFlashMessage}
                    />
                </div>
            </div>
        );
    }
}

EditDeliveryPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    editDelivery: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return{
        lang:state.locale
    }
}

export default connect(mapStateToProps, {addNewDelivery, editDelivery, addFlashMessage})(
    EditDeliveryPage
);
