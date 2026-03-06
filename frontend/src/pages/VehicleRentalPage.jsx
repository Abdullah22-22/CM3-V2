import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const VehicleRentalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`/api/vehicleRentals/${id}`);

        if (!res.ok) {
          throw new Error("Network response not ok");
        }

        const data = await res.json();
        setRental(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this vehicle rental?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/vehicleRentals/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rental-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>Vehicle Rental Details</h2>

          <h2>{rental.vehicleModel}</h2>
          <p>Category: {rental.category}</p>
          <p>Description: {rental.description}</p>
          <p>Daily Price: ${rental.dailyPrice}</p>
          <p>Status: {rental.availabilityStatus}</p>
          <p>Agency: {rental.agency?.name}</p>
          <p>Agency Email: {rental.agency?.contactEmail}</p>
          <p>
            Location: {rental.location?.city}, {rental.location?.state}
          </p>
          <p>Insurance: {rental.insurancePolicy}</p>

          {/* buttons */}
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            
            <Link to={`/edit/${id}`}>
              <button
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </Link>

            <button
              onClick={handleDelete}
              style={{
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default VehicleRentalPage;