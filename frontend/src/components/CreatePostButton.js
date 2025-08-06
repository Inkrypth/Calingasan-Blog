import { useNavigate } from "react-router-dom";

const CreatePostButton = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate('/create')}>
            Create Post
        </button>
    );
};

export default CreatePostButton;