import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api";
import HomeButton from "../components/HomeButton";
import LogoutButton from "../components/LogoutButton";

const ProfilePage = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Fetch profile on load
    useEffect(() => {
        if (!token) return navigate('/login');

        const fetchProfile = async () => {
            try {
                const res = await api.get('/profile/getProfile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(res.data);
                setEmail(res.data.email);
            } catch(err) {
                console.error(err);
                setError('Failed to load profile');
            }
        };

        fetchProfile();
    }, [token, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const res = await api.patch(
                '/profile/updateProfile',
                {
                    name,
                    email,
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(res.data.message || 'Profile updated successfully');
            setCurrentPassword('');
            setNewPassword('');
        } catch(err) {
            const msg = err.response?.data?.message || 'Update failed';
            setError(msg);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <HomeButton />
                <LogoutButton />
            </div>

            <h2>Your Profile</h2>
            {error && <p className="error">{error}</p>}
            {message && <p style={{ color: 'green'}}>{message}</p>}

            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

            <form onSubmit={handleUpdate}>
                <div>
                    <label>Update Name</label><br />
                    <input
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Update Email</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                        required
                    />
                </div>

                <div>
                    <label>Current Password</label><br />
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password</label><br />
                    <input
                        type="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfilePage;