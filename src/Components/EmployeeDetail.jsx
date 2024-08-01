import React from 'react'
import { Card, Row, Col, CloseButton } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export const EmployeeDetail = (props) => {

  return (
    <Card className="bg-body-secondary p-3 my-2">
      <Card.Header className="bg-ternary display-flex"
        style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Employee Details </span>
        <span><Link to={`/emanager/`}><CloseButton /></Link></span>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={4}>
            <img src="https://picsum.photos/100/" alt="Employee Image" className="img-fluid rounded-circle" />
          </Col>
          <Col md={8}>
            <h5 className="card-title">{props.data?.name}</h5>
            <p>Employee ID: {props.data?._id}</p>
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={8}>
            <h5 className="text-muted">Contact</h5>
            <p >Email: {props.data?.contact.email}</p>
            <p >Phone: {props.data?.contact.phone}</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <h5 className="text-muted">Address</h5>
          <Col md={7}>
            <span className="mx-2">{props.data?.address.line1}</span>
            <span className="mx-2">  -{props.data?.address.zip_code}</span>
          </Col>
          <Col md={5} >
            <span className="mx-2">{props.data?.address.city}</span>
            <span className="mx-2">{props.data?.address.Country}</span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
