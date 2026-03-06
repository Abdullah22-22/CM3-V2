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
        address: { ...prev.address, [field]: value },
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <div className="create">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone_number"
          placeholder="Phone number"
          required
          value={formData.phone_number}
          onChange={handleChange}
        />

        <label>License Number</label>
        <input
          type="text"
          name="licenseNumber"
          placeholder="License number"
          required
          value={formData.licenseNumber}
          onChange={handleChange}
        />

        <label>Date of Birth</label>
        <input
          type="date"
          name="date_of_birth"
          required
          value={formData.date_of_birth}
          onChange={handleChange}
        />

        <label>License Expiry Date</label>
        <input
          type="date"
          name="address.licenseExpiryDate"
          required
          value={formData.address.licenseExpiryDate}
          onChange={handleChange}
        />

        <label>City</label>
        <input
          type="text"
          name="address.city"
          placeholder="City"
          required
          value={formData.address.city}
          onChange={handleChange}
        />

        <label>Years Of Experience</label>
        <input
          type="number"
          name="address.yearsOfExperience"
          placeholder="Years of experience"
          required
          value={formData.address.yearsOfExperience}
          onChange={handleChange}
        />

        <button disabled={loading} type="submit">
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;