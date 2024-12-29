import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateUser } from './redux/userSlice';

function UpdateUserComponent() {
    const { id } = useParams();
    const users = useSelector((state) => state.users.users);
    const user = users.find((u) => u.id === id);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setAge(user.age || '');
        }
    }, [user]);

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!name || !email || !age) {
            alert('All fields are required');
            return;
        }

        axios
            .put(`http://localhost:3001/update/${id}`, { name, email, age })
            .then(() => {
                dispatch(UpdateUser({ id, name, email, age }));
                navigate('/');
            })
            .catch((err) => console.error('Error updating user:', err));
    };

    if (!user) {
        return <div className="text-center">User not found</div>;
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-4 shadow">
                <h2 className="mb-4 text-center">Update User</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">
                            Age
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUserComponent;
