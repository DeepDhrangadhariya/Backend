import React, { useEffect, useState } from 'react';
import './ViewManager.css';
import Header from './Header';
import Navbar from './Navbar';

function ViewManager() {
    const [managers, setManagers] = useState([]);
  
    useEffect(() => {
      // Fetch manager data from API (using mock data for this example)
      const fetchManagers = async () => {
        // Simulating an API call
        const mockManagers = [
          {
            id: 1,
            username: 'manager1',
            email: 'manager1@example.com',
            phone: '123-456-7890',
            image: 'https://via.placeholder.com/50', // Placeholder image
          },
          {
            id: 2,
            username: 'manager2',
            email: 'manager2@example.com',
            phone: '987-654-3210',
            image: 'https://via.placeholder.com/50', // Placeholder image
          },
        ];
        setManagers(mockManagers);
      };
  
      fetchManagers();
    }, []);
  
    const handleDelete = (id) => {
      // Implement the delete functionality here (e.g., API call to delete manager)
      setManagers(managers.filter(manager => manager.id !== id));
      console.log(`Admin with ID ${id} deleted.`);
    };
  
    const handleEdit = (id) => {
      // Implement the edit functionality here (e.g., redirect to edit page)
      console.log(`Edit manager with ID ${id}`);
      // Redirect to edit page or open an edit modal
    };
  
    return (
      <>
      <Header/>
      <Navbar/>

      <div className="view-admin-container">
        <h2>View Managers</h2>
        {managers.length === 0 ? (
          <p>No managers found.</p>
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
              {managers.map(manager => (
                <tr key={manager.id}>
                  <td>
                    <img src={manager.image} alt={`${manager.username}'s profile`} className="profile-image" />
                  </td>
                  <td>{manager.username}</td>
                  <td>{manager.email}</td>
                  <td>{manager.phone}</td>
                  <td>
                    <button onClick={() => handleEdit(manager.id)}>Edit</button>
                    <button onClick={() => handleDelete(manager.id)}>Delete</button>
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

export default ViewManager
