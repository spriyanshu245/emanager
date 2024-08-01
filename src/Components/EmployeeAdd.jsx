import React, { useState } from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import * as countriesList from 'https://esm.run/countries-list';
import { CosmoApi } from '../CosmoApi';

export const EmployeeAdd = ({ onAddEmployee }) => {
    const [useEmail, setUseEmail] = useState(true);
    const [name, setName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [error, setError] = useState(null);
    const countries = Object.values(countriesList.countries)
    const api = CosmoApi();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const address = {
            line1: addressLine1,
            city: city,
            Country: country,
            zip_code: zip
        };
        if (name.length === 0 || Object.values(address).every(val => val.length === 0)) {
            setError('Please fill in all required fields');
            return;
        }
        try {
            const employeeData = {
                "name": name,
                "address": address,
                "contact": {
                    "email": email,
                    "phone": phoneNumber
                }
            }
            const response = await api.addEmployee("employeelist", employeeData);
            onAddEmployee();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card className="bg-body-secondary p-3 my-2">
            <Card.Header>Add Employee Details</Card.Header>
            <Form onSubmit={handleSubmit}>
                {error && <div className='alert-err'>{error}</div>}
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control
                        placeholder="Address"
                        value={addressLine1}
                        onChange={(event) => setAddressLine1(event.target.value)}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Select
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                        >
                            <option>Choose...</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country.name}>{country.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                            value={zip}
                            onChange={(event) => setZip(event.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridContact">
                        <Form.Check
                            type="checkbox"
                            label="Use Email"
                            checked={useEmail}
                            onChange={() => setUseEmail(!useEmail)}
                        />
                    </Form.Group>
                </Row>

                {useEmail ? (
                    <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            required={true}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                ) : (
                    <Form.Group className="mb-3" controlId="formGridPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                        />
                    </Form.Group>
                )}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Card>
    )
};