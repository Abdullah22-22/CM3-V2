import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCars from "../hooks/UseCar";

function EditVehicleRentalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { car, fetchCarById, editCar, loading, error } = useCars();

  const [vehicleModel, setVehicleModel] = useState("");
  const [category, setCategory] = useState("Economy");
  const [description, setDescription] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [agencyEmail, setAgencyEmail] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("available");
  const [bookingDeadline, setBookingDeadline] = useState("");
  const [insurancePolicy, setInsurancePolicy] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCarById(id);
  }, [id, fetchCarById]);

  useEffect(() => {
    if (car) {
      setVehicleModel(car.vehicleModel || "");
      setCategory(car.category || "Economy");
      setDescription(car.description || "");
      setAgencyName(car.agency?.name || "");
      setAgencyEmail(car.agency?.contactEmail || "");
      setFleetSize(car.agency?.fleetSize ?? "");
      setCity(car.location?.city || "");
      setState(car.location?.state || "");
      setDailyPrice(car.dailyPrice ?? "");
      setAvailabilityStatus(car.availabilityStatus || "available");
      setInsurancePolicy(car.insurancePolicy || "");

      if (car.bookingDeadline) {
        setBookingDeadline(new Date(car.bookingDeadline).toISOString().split("T")[0]);
      } else {
        setBookingDeadline("");
      }
    }
  }, [car]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRentalData = {
      vehicleModel,
      category,
      description,
      agency: {
        name: agencyName,
        contactEmail: agencyEmail,
        fleetSize: fleetSize === "" ? undefined : parseInt(fleetSize, 10),
      },
      location: {
        city,
        state,
      },
      dailyPrice: parseFloat(dailyPrice),
      availabilityStatus,
      bookingDeadline: bookingDeadline || null,
      insurancePolicy,
    };

    try {
      await editCar(id, updatedRentalData);
      setMessage("Vehicle rental updated successfully");
      navigate(`/${id}`);
    } catch (err) {
      setMessage("Failed to update vehicle rental");
    }
  };

  if (loading && !car) return <p>Loading vehicle rental...</p>;

  return (
    <div className="create">
      <h2>Edit Vehicle Rental</h2>

      <form onSubmit={handleSubmit}>
        <label>Vehicle Model:</label>
        <input
          type="text"
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
          required
        />

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Economy">Economy</option>
          <option value="Luxury">Luxury</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
          <option value="Truck">Truck</option>
        </select>

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Agency Name:</label>
        <input
          type="text"
          value={agencyName}
          onChange={(e) => setAgencyName(e.target.value)}
          required
        />

        <label>Agency Email:</label>
        <input
          type="email"
          value={agencyEmail}
          onChange={(e) => setAgencyEmail(e.target.value)}
          required
        />

        <label>Fleet Size:</label>
        <input
          type="number"
          min="0"
          value={fleetSize}
          onChange={(e) => setFleetSize(e.target.value)}
        />

        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />

        <label>Daily Price:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={dailyPrice}
          onChange={(e) => setDailyPrice(e.target.value)}
          required
        />

        <label>Availability Status:</label>
        <select
          value={availabilityStatus}
          onChange={(e) => setAvailabilityStatus(e.target.value)}
        >
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <label>Booking Deadline:</label>
        <input
          type="date"
          value={bookingDeadline}
          onChange={(e) => setBookingDeadline(e.target.value)}
        />

        <label>Insurance Policy:</label>
        <input
          type="text"
          value={insurancePolicy}
          onChange={(e) => setInsurancePolicy(e.target.value)}
          required
        />

        <button disabled={loading} type="submit">
          {loading ? "Updating..." : "Update Vehicle Rental"}
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default EditVehicleRentalPage;