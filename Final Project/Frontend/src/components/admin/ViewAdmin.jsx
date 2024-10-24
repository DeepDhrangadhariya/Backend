import React, { useEffect, useState } from 'react';
import './ViewAdmin.css'; // Optional: Include your CSS for styling
import Header from './Header';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewAdmin = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch admin data from API (using mock data for this example)
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (token) {
          const response = await axios.get(`http://localhost:1024/admin/viewAdmin`, {
            headers: {
              Authorization: `Bearer ${token}`, // If using JWT for auth
            },
          });
          setAdmins(response.data);
        }
      } catch (error) {
        console.log(error)
      }
      
    };

    fetchAdmins();
  }, []);

  const handleDelete = (id) => {
    // Implement the delete functionality here (e.g., API call to delete admin)
    setAdmins(admins.filter(admin => admin.id !== id));
    console.log(`Admin with ID ${id} deleted.`);
  };

  const handleEdit = (id) => {
    // Implement the edit functionality here (e.g., redirect to edit page)
    
    console.log(`Edit admin with ID ${id}`);
    // Redirect to edit page or open an edit modal
  };

  return (
    <>
    <Header/>
    <Navbar/>

    <div className="view-admin-container">
      <h2>View Admins</h2>
      {admins.length === 0 ? (
        <p>No admins found.</p>
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
            {admins.map(admin => (
              <tr key={admin.id}>
                <td>
                  <img src={admin.image} alt={`${admin.username}'s profile`} className="profile-image" />
                </td>
                <td>{admin.username}</td>
                <td>{admin.email}</td>
                <td>{admin.phone}</td>
                <td>
                  <Link to='admin/editAdmin?id=${admin.id}'>
                    <button onClick={() => handleEdit(admin.id)}>Edit</button>
                  </Link>
                  <Link to='admin/deleteAdmin?id=${admin.id}'>
                    <button onClick={() => handleDelete(admin.id)}>Delete</button>
                  </Link>
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

export default ViewAdmin;
