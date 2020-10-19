import {normalize} from "normalizr";
import api from "../utils/api";
import {
    newDeliveryAdded,
    editMyDelivery
} from "../reducers/deliverySlice";
import {myDeliveriesSchema} from "../utils/schemas";

export function addNewDelivery(data) {
    return (dispatch) => {
        return api.delivery
            .newDeliveryAdd(data)
            .then((res) => normalize(res, myDeliveriesSchema))
            .then((normalizedRes) => dispatch(newDeliveryAdded(normalizedRes)))
    };
}

export function editDelivery(slug, data) {
    return (dispatch) => {
        return api.delivery
            .editDelivery(slug, data)
            .then((res) => normalize(res, myDeliveriesSchema))
            .then((normalizedRes) => dispatch(editMyDelivery(normalizedRes)));
    };
}
