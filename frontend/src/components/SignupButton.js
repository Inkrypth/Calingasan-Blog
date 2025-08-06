import { useNavigate } from "react-router-dom";

const SignupButton = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate('/signup')}>
            Signup
        </button>
    );
};

export default SignupButton;