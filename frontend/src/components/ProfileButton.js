import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate('/profile')}>
            Profile
        </button>
    );
};

export default ProfileButton;