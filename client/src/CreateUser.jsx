import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { addUser } from './redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';




function CreateUser() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !age) {
          alert('All fields are required');
          return;
        }
        axios
          .post('http://localhost:3001/create', { name, email, age })
          .then((res) => {
            dispatch(addUser(res.data));
            navigate('/');
          })
          .catch((err) => console.error(err));
      };
      

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-4 shadow">
        <h2 className="mb-4 text-center">Add User</h2>
        <form  onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button  type="submit" className="btn btn-success w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
