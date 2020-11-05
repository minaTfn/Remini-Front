// import React from "react";
// import {Link} from "react-router-dom";
// import PropTypes from "prop-types";
// import EditIcon from "@material-ui/icons/Edit";
// // import {FormattedMessage} from "react-intl";
// import {Card, Col, Row} from "react-bootstrap";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faAngleDoubleRight, faShippingFast} from "@fortawesome/free-solid-svg-icons";
// import {FormattedMessage} from "react-intl";
//
// const MyDeliveriesList = (props) => {
//     const {deliveryItems, cities, paymentMethods} = props.deliveries;
//     const {lang} = localStorage;
//
//     const translatedTitle = lang === 'fa' ? `title_${lang}` : 'title';
//     const translated_date = (lang === 'fa') ? `${lang}_request_date` : 'request_date';
//     const iconDir = lang === 'fa' && `fa-flip-horizontal`;
//
//     const direction = (fromCity, toCity) => {
//         return <>
//             <b className="fonts-sm px-1">{cities[fromCity].country[translatedTitle]}</b>
//             <FontAwesomeIcon icon={faAngleDoubleRight} className={`fonts-sm ${iconDir}`}/>
//             <span className="text-primary fonts-sm mx-1">{cities[fromCity].title}</span>
//             <FontAwesomeIcon icon={faShippingFast} className={`mx-2 ${iconDir}`}/>
//             <b className="fonts-sm px-1">{cities[toCity].country[translatedTitle]} </b>
//             <FontAwesomeIcon icon={faAngleDoubleRight} className={`fonts-sm ${iconDir}`}/>
//             <span className="text-primary fonts-sm mx-1">{cities[toCity].title}</span>
//
//         </>
//     };
//
//     return (
//
//
//         <>
//             <Row>
//                 {deliveryItems &&
//                 Object.keys(deliveryItems).map((keyName, i) => (
//                     <Col xs="12" className="mb-2" key={deliveryItems[keyName].slug}>
//                         <Card border="success">
//                             <Card.Header>
//                                 {direction(
//                                     deliveryItems[keyName].origin,
//                                     deliveryItems[keyName].destination
//                                 )}
//                             </Card.Header>
//                             <Card.Body>
//                                 <Card.Title as="h6">{deliveryItems[keyName].title}</Card.Title>
//                                 <Card.Text style={{
//                                     lineHeight: "25px",
//                                     verticalAlign: "top",
//                                     overflow: "hidden",
//                                     textOverflow: "ellipsis",
//                                     whiteSpace: "nowrap"
//                                 }}>{deliveryItems[keyName].description}</Card.Text>
//
//                                 <Link style={{float:"left"}} to={`${deliveryItems[keyName].slug}/edit/`}>
//                                     <EditIcon fontSize="small"/>
//                                 </Link>
//
//                             </Card.Body>
//                             <Card.Footer className="px-3 py-2">
//                                 <small className="text-muted">
//                                     <FormattedMessage
//                                         id="delivery.requested"
//                                         defaultMessage="requested"
//                                         values={{
//                                             date: `${deliveryItems[keyName][translated_date]}`,
//                                             owner: 'you'
//                                         }}
//                                     />
//                                 </small>
//                             </Card.Footer>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </>
//     );
// };
//
// MyDeliveriesList.propTypes = {
//     deliveries: PropTypes.objectOf(
//         PropTypes.shape({
//             deliveryItems: PropTypes.objectOf(
//                 PropTypes.shape({
//                     key: PropTypes.objectOf(
//                         PropTypes.shape({
//                             slug: PropTypes.number.isRequired,
//                             title: PropTypes.string.isRequired,
//                         })
//                     ),
//                 })
//             ),
//             cities: PropTypes.objectOf(
//                 PropTypes.shape({
//                     key: PropTypes.objectOf(
//                         PropTypes.shape({
//                             id: PropTypes.number.isRequired,
//                             title: PropTypes.string.isRequired,
//                             title_fa: PropTypes.string.isRequired,
//                         })
//                     ),
//                 })
//             ),
//         })
//     ),
// };
//
// export default MyDeliveriesList;
