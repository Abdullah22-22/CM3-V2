import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/UseAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    phone_number: "",
    licenseNumber: "",
    date_of_birth: "",
    address: {
      licenseExpiryDate: "",
      city: "",
      yearsOfExperience: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register({
        ...formData,
        address: {
          ...formData.address,
          yearsOfExperience: Number(formData.address.yearsOfExperience),
        },
      });

      navigate("/");
    } catch (err) {
      console.error("Register failed");
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-lg py-24">
        <div className="bg-white px-6 py-8 shadow-md rounded-md border">
          <form onSubmit={handleRegister}>
            <h2 className="text-3xl text-center font-semibold mb-6">Register</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full name"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                placeholder="Phone number"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">License Number</label>
              <input
                type="text"
                name="licenseNumber"
                placeholder="License number"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.licenseNumber}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">License Expiry Date</label>
              <input
                type="date"
                name="address.licenseExpiryDate"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.address.licenseExpiryDate}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">City</label>
              <input
                type="text"
                name="address.city"
                placeholder="City"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.address.city}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Years Of Experience</label>
              <input
                type="number"
                name="address.yearsOfExperience"
                placeholder="Years of experience"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.address.yearsOfExperience}
                onChange={handleChange}
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {error && (
              <p className="text-red-500 text-center mt-4">{error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;