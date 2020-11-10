import React, {Component} from 'react';
import SelectFieldGroup from "../common/SelectFieldGroup";
import {FormattedMessage, injectIntl} from "react-intl";
import TextFieldGroup from "../common/TextFieldGroup";
import api from "../../utils/api";
import {convertToSelect} from "../common/Functions";
import {connect} from "react-redux";

class SearchDeliveryForm extends Component {
    state = {
        countriesList: [],
    }

    componentDidMount() {
        const {lang} = localStorage;
    }

    render() {
        const {onOriginChange, origin, onDestinationChange, destination, onQueryChange, searchTitle, intl} = this.props;
        return (
            <div className="row d-flex flex-row justify-content-between pt-2">
                <b className="w-100 p-2 mb-2 border-bottom">
                    <FormattedMessage
                        id="delivery.search.title"
                        defaultMessage="delivery.search.title"
                    />:
                </b>
                <div className="flex-grow-1 px-2 text-muted">
                    <SelectFieldGroup
                        label={
                            <FormattedMessage
                                id="origin"
                                defaultMessage="origin"
                            />
                        }
                        onChange={onOriginChange}
                        options={Object.values(this.props.countries)}
                        isSearchable
                        classType="inRow"
                        isClearable
                        placeholder={intl.formatMessage({id: 'select.placeholder'}, {name: 'origin', nameFa: 'مبدا'})}
                        field="origin"
                        defaultValue={origin}
                    />
                </div>
                <div className="flex-grow-1 px-lg-3 px-2 text-muted">
                    <SelectFieldGroup
                        label={
                            <FormattedMessage
                                id="destination"
                                defaultMessage="destination"
                            />
                        }
                        onChange={onDestinationChange}
                        options={Object.values(this.props.countries)}
                        isSearchable
                        isClearable
                        classType="inRow"
                        placeholder={intl.formatMessage({id: 'select.placeholder'}, {
                            name: 'destination',
                            nameFa: 'مقصد'
                        })}
                        field="destination"
                        defaultValue={destination}
                    />
                </div>
                <div className="flex-grow-1 px-2 text-muted">
                    <TextFieldGroup
                        label={
                            <FormattedMessage id="title" defaultMessage="title"/>
                        }
                        onChange={onQueryChange}
                        placeholder={intl.formatMessage({id: 'search.placeholder'}, {name: 'title', nameFa: 'عنوان'})}
                        field="search"
                        labelFixedWidth={false}
                        autoComplete="off"
                        classType="inRow"
                        value={searchTitle}
                    />
                </div>

            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        countries: state.delivery.countries,
    }
}
export default connect(mapStateToProps, {})(injectIntl(SearchDeliveryForm));