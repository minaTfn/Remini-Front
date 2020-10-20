import api from "../utils/api";
import {
    countriesFetched
} from "../reducers/countrySlice";

export function fetchCountries() {
    return (dispatch) => {
        return api.delivery.countries()
            .then((res) =>{
                dispatch(countriesFetched(res.data))
            });
    };
}