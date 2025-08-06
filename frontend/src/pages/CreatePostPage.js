import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import HomeButton from '../components/HomeButton';
import LogoutButton from '../components/LogoutButton';

const CreatePostPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await api.post(
        '/posts/create',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Post created successfully!');
      setTitle('');
      setContent('');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create post';
      setError(msg);
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <HomeButton />
        <LogoutButton />
      </div>

      <h2>Create a New Blog Post</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
          />
        </div>

        <div>
          <label>Content</label><br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            required
          ></textarea>
        </div>

        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
