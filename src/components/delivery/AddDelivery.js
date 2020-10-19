import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {Link} from "react-router-dom";

const AddDelivery = () => {
  return (
    <Container>
      <Row className="text-center">
        <Col xs={{ span: 4, offset: 4 }}>
          <Card className="text-center p-3">
            <Card.Body>
              <Card.Header>Add New Delivery</Card.Header>
              <Link to="/request/new" ><AddCircleOutlineIcon style={{ fontSize: 150 }} /></Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddDelivery;
