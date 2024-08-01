import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Modal, Spinner } from 'react-bootstrap';
import { CosmoApi } from "../CosmoApi";
import { EmployeeAdd } from "../Components/EmployeeAdd";

export const Dashboard = () => {
  const api = CosmoApi();
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const fetchEmployees = async (limit, offset) => {
    try {
      const response = await api.getEmployees("employeelist", { limit: limit, offset: 0 });
      setEmployees(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(employees.length === 0 ? 10 : employees.page.total);
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await api.deleteEmployee("employeelist", id);
      alert(response?.message)
      setEmployees((prevEmployees) => {
        const filteredEmployees = { ...prevEmployees };
        filteredEmployees.data = filteredEmployees.data.filter((item) => item._id !== id);
        return filteredEmployees;
      });
    } catch (error) {
      setError(error);
    }
  };

  const handleAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAddEmployee = async () => {
    var limit = employees?.page.total
    limit += 1
    await fetchEmployees(limit)
    handleCloseAdd();
  };

  if (loading) {
    return <Spinner animation="grow" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Row>
        <Col md={10}>
          <h3>Employee List</h3>
        </Col>
        <Col md={2}>
          <Button
            className="add-btn mb-2"
            variant="secondary"
            size="m"
            onClick={handleAdd}>
            + Add Employee
          </Button>
        </Col>
      </Row>
      <div className='table-emp'>
        {employees && employees.length === 0 ? (
          <div className='empty-tbl'>
            <h4>No Employees in the system</h4>
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th className="action-col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees?.data.map((item, index) => (
                <tr key={index}>
                  <td><Link to={`/emanager/details/${item._id}`} state={item}>
                    {item._id}
                  </Link>
                  </td>
                  <td>{item.name}</td>
                  <td className="action-col">
                    <Button
                      className="delete-btn"
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item._id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <EmployeeAdd onAddEmployee={handleAddEmployee} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};