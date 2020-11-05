import {normalize} from "normalizr";
import api from "../utils/api";
import {
    newDeliveryAdded,
    editMyDelivery,
    countriesFetched,
    deliveryMethodsFetched,
    paymentMethodsFetched,
    contactMethodsFetched,
    deliveryDeleted
} from "../reducers/deliverySlice";
import {myDeliveriesSchema} from "../utils/schemas";
import {convertToSelect} from "../components/common/Functions";
import {addFlashMessage} from "./flashMessages";

export function addNewDelivery(data) {
    return (dispatch) => {
        return api.delivery
            .newDelivery(data)
            .then((res) => {
                dispatch(addFlashMessage({
                    type: "success",
                    text: res.message,
                }));
                return normalize(res.data, myDeliveriesSchema)
            })
            .then((normalizedRes) => dispatch(newDeliveryAdded(normalizedRes)))
    };
}

export function deleteDelivery(slug) {
    return (dispatch) => {
        return api.delivery
            .deleteDelivery(slug)
            .then((res) => {
                dispatch(addFlashMessage({
                    type: "success",
                    text: res.message,
                }));
            })
            .then(() => dispatch(deliveryDeleted(slug)))
    };
}

export function editDelivery(slug, data) {
    return (dispatch) => {
        return api.delivery
            .editDelivery(slug, data)
            .then((res) => {
                dispatch(addFlashMessage({
                    type: "success",
                    text: res.message,
                }));

                return normalize(res.data, myDeliveriesSchema);
            })
            .then((normalizedRes) => dispatch(editMyDelivery(normalizedRes)));
    };
}

export const fetchCountries = () => (dispatch) =>
    api.delivery.countries()
        .then((data) => {
            return convertToSelect(data, 'en');
        }).then((data1) => {
        dispatch(countriesFetched(data1));
    });

export const fetchDeliveryMethods = () => (dispatch) =>
    api.delivery.getDeliveryMethods()
        .then((data) => {
            dispatch(deliveryMethodsFetched(data));
        });

export const fetchPaymentMethods = () => (dispatch) =>
    api.delivery.getPaymentMethods()
        .then((data) => {
            dispatch(paymentMethodsFetched(data));
        });

export const fetchContactMethods = () => (dispatch) =>
    api.delivery.getContactMethods()
        .then((data) => {
            dispatch(contactMethodsFetched(data));
        });
