import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
// import {myDeliveriesSelector} from "./selectors";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import {useSelector} from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import {FormattedMessage} from "react-intl";
// import {myDeliveriesSelector} from "./selectors";
// import _ from "lodash";

const MyDeliveriesList = (props) => {
    const {deliveryItems, cities, countries, deliveryMethods, contactMethods,paymentMethods} = props.deliveries;


    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            <FormattedMessage id="global.title" defaultMessage="title"/>
                        </TableCell>
                        <TableCell align="center">
                            <FormattedMessage
                                id="delivery.origin_country"
                                defaultMessage="origin_country"
                            />
                        </TableCell>
                        <TableCell align="center">
                            <FormattedMessage
                                id="delivery.origin_city"
                                defaultMessage="origin_city"
                            />
                        </TableCell>
                        <TableCell align="center">
                            <FormattedMessage
                                id="delivery.destination_country"
                                defaultMessage="destination_country"
                            />
                        </TableCell>
                        <TableCell align="center">
                            <FormattedMessage
                                id="delivery.destination_city"
                                defaultMessage="destination_city"
                            />
                        </TableCell>
                        <TableCell align="center">
                            <FormattedMessage
                                id="delivery.payment_method"
                                defaultMessage="payment_method"
                            />
                        </TableCell>
                        <TableCell align="center">
                            <FormattedMessage
                                id="delivery.delivery_method"
                                defaultMessage="delivery_method"
                            />
                        </TableCell>
                        <TableCell align="center">
                            <FormattedMessage
                                id="delivery.contact_method"
                                defaultMessage="contact_method"
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {deliveryItems && Object.keys(deliveryItems).map((keyName, i) => (
                        <TableRow key={deliveryItems[keyName].slug}>
                            <TableCell align="center">{deliveryItems[keyName].title}</TableCell>
                            <TableCell align="center">
                                {countries[deliveryItems[keyName].origin_country].title_fa}
                            </TableCell>
                            <TableCell align="center">
                                {cities[deliveryItems[keyName].origin_city].title_fa}
                            </TableCell>
                            <TableCell align="center">
                                {countries[deliveryItems[keyName].destination_country].title_fa}
                            </TableCell>
                            <TableCell align="center">
                                {cities[deliveryItems[keyName].destination_city].title_fa}
                            </TableCell>
                            <TableCell align="center">
                                {paymentMethods[deliveryItems[keyName].payment_method].title}
                            </TableCell>
                            <TableCell align="center">
                                {deliveryMethods[deliveryItems[keyName].delivery_method].title}
                            </TableCell>
                            <TableCell align="center">
                                {deliveryItems[keyName].contact_methods.map(
                                    (currentContactMethod) => `${contactMethods[currentContactMethod].title} `
                                )}
                            </TableCell>
                            <TableCell align="center">
                                <Link to={`${deliveryItems[keyName].slug}/edit/`}>
                                    <EditIcon fontSize="small"/>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

MyDeliveriesList.propTypes = {
    deliveries: PropTypes.objectOf(
        PropTypes.shape({
            deliveryItems: PropTypes.objectOf(
                PropTypes.shape({
                    key: PropTypes.objectOf(
                        PropTypes.shape({
                            slug: PropTypes.number.isRequired,
                            title: PropTypes.string.isRequired,
                        }),
                    ),
                })
            ),
            cities: PropTypes.objectOf(
                PropTypes.shape({
                    key: PropTypes.objectOf(
                        PropTypes.shape({
                            id: PropTypes.number.isRequired,
                            title: PropTypes.string.isRequired,
                            title_fa: PropTypes.string.isRequired,
                        }),
                    ),
                })
            ),
        })
    ),

};

export default MyDeliveriesList;
