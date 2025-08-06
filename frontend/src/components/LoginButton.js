import { useNavigate } from "react-router-dom";

const LoginButton = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate('/login')}>
            Login
        </button>
    );
};

export default LoginButton;