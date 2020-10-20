import React, {Component} from 'react';
import SelectFieldGroup from "../common/SelectFieldGroup";
import {FormattedMessage} from "react-intl";
import TextFieldGroup from "../common/TextFieldGroup";
import api from "../../utils/api";
import {convertToSelect} from "../common/Functions";

class SearchDeliveryForm extends Component {
    state = {
        countriesList: [],
    }

    componentDidMount() {
        const {lang} = localStorage;
        api.delivery
            .countries()
            .then((items) => {
                const countries = convertToSelect(items.data, lang);
                this.setState({countriesList: countries});
            })
    }

    render() {
        const {onOriginChange, origin, onDestinationChange, destination, onQueryChange, searchTitle} = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <SelectFieldGroup
                            label={
                                <FormattedMessage
                                    id="origin"
                                    defaultMessage="origin"
                                />
                            }
                            onChange={onOriginChange}
                            options={this.state.countriesList}
                            isSearchable
                            field="origin"
                            defaultValue={origin}
                        />
                    </div>
                    <div className="col-sm-6">
                        <SelectFieldGroup
                            label={
                                <FormattedMessage
                                    id="destination"
                                    defaultMessage="destination"
                                />
                            }
                            onChange={onDestinationChange}
                            options={this.state.countriesList}
                            isSearchable
                            field="destination"
                            defaultValue={destination}
                        />
                    </div>
                </div>
                <TextFieldGroup
                    label={
                        <FormattedMessage id="search" defaultMessage="search"/>
                    }
                    onChange={onQueryChange}
                    field="search"
                    value={searchTitle}
                />

            </div>
        );
    }
}

export default SearchDeliveryForm;