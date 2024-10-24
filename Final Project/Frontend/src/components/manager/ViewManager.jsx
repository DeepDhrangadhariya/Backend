import React, { useEffect, useState } from 'react';
import './ViewEmployee.css';
import Header from './Header';
import Navbar from './Navbar';

function ViewEmployee() {
    const [Employees, setEmployees] = useState([]);
  
    useEffect(() => {
      // Fetch employee data from API (using mock data for this example)
      const fetchEmployees = async () => {
        // Simulating an API call
        const mockEmployees = [
          {
            id: 1,
            username: 'employee1',
            email: 'employee1@example.com',
            phone: '123-456-7890',
            image: 'https://via.placeholder.com/50', // Placeholder image
          },
          {
            id: 2,
            username: 'employee2',
            email: 'employee2@example.com',
            phone: '987-654-3210',
            image: 'https://via.placeholder.com/50', // Placeholder image
          },
        ];
        setEmployees(mockEmployees);
      };
  
      fetchEmployees();
    }, []);
  
    const handleDelete = (id) => {
      // Implement the delete functionality here (e.g., API call to delete employee)
      setEmployees(Employees.filter(employee => employee.id !== id));
      console.log(`Admin with ID ${id} deleted.`);
    };
  
    const handleEdit = (id) => {
      // Implement the edit functionality here (e.g., redirect to edit page)
      console.log(`Edit employee with ID ${id}`);
      // Redirect to edit page or open an edit modal
    };
  
    return (
      <>
      <Header/>
      <Navbar/>

      <div className="view-admin-container">
        <h2>View Employees</h2>
        {Employees.length === 0 ? (
          <p>No Employees found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Profile Image</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Employees.map(employee => (
                <tr key={employee.id}>
                  <td>
                    <img src={employee.image} alt={`${employee.username}'s profile`} className="profile-image" />
                  </td>
                  <td>{employee.username}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <button onClick={() => handleEdit(employee.id)}>Edit</button>
                    <button onClick={() => handleDelete(employee.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      </>
    );
  };

export default ViewEmployee
