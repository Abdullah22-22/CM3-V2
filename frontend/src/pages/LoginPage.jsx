import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/UseAuth";

const LoginPage = () => {
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate("/");
    } catch (err) {
      console.error("Login failed");
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          id="email" 
          placeholder="Email address"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading} type="submit">
          Login
        </button>
        
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;