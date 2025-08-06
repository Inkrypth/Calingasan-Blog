import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from '../api'
import HomeButton from "../components/HomeButton";

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post('/auth/signup', { 
                name, 
                email: email.toLowerCase(), 
                password 
            });

            login(res.data.token);
            navigate('/');
        } catch(err) {
            const msg = err.response?.data?.message || 'Signup failed';
            setError(msg);
        }
    };

    return (
        <div className="container">
            <HomeButton />
            <h2>Signup</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label><br />
                    <input 
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label><br />
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        required
                    />
                </div>
                <div>
                    <label>Password</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupPage;