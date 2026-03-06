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
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-md py-24">
        <div className="bg-white px-6 py-8 shadow-md rounded-md border">
          <form onSubmit={handleLogin}>
            <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" >
                Username
              </label>
              <input
                type="text"
                id="email"
                placeholder="Email address"
                className="border rounded w-full py-2 px-3"
                required
                value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="border rounded w-full py-2 px-3"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            {error && (
              <p className="text-red-500 text-center mb-4">{error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
