import { useEffect, useState, useContext } from "react";
import api from '../api';
import { AuthContext } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";
import LoginButton from "../components/LoginButton";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext);

    const fetchPosts = async () => {
        try {
            const res = await api.get('/posts');
            setPosts(res.data);
        } catch(err) {
            setError('Failed to load posts');
            console.error(err);
        }
    };
    
    useEffect(() => {
        fetchPosts();
    }, []);

    const handleReaction = async (postId, type) => {
        try {
            await api.post(`/reactions/${type}/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchPosts();
        } catch(err) {
            console.error(`Failed to ${type}`, err);
        }
    };

    return (
        <div className="container">
            {token && <LogoutButton />}
            {!token && <LoginButton />}
            
            <h2>All Blog Posts</h2>
            {error && <p className="error">{error}</p>}

            {posts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="blog-post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p><strong>By:</strong> {post.author?.name || 'Unknown'}</p>
                        <p><em>Posted on {new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}</em></p>

                        <div className="reactions">
                            <button onClick={() => handleReaction(post._id, 'like')} disabled={!token}>👍🏻</button>
                            <span>{post.likes?.length || 0}</span>
                            <button onClick={() => handleReaction(post._id, 'dislike')} disabled={!token}>👎🏻</button>
                            <span>{post.dislikes?.length || 0}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default HomePage;