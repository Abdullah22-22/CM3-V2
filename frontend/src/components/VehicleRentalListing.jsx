import { Link } from "react-router-dom";

const VehicleRentalListing = ({ car, onDelete }) => {

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await onDelete(car._id || car.id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="rental-preview">
      <Link to={`/${car._id || car.id}`} className="car-link">
        <h2>{car.vehicleModel}</h2>
        <p>Category: {car.category}</p>
        <p>Description: {car.description}</p>
        <p>Daily Price: ${car.dailyPrice}</p>
        <p>Status: {car.availabilityStatus}</p>
        <p>Agency: {car.agency?.name}</p>
        <p>Agency Email: {car.agency?.contactEmail}</p>
        <p>Location: {car.location?.city}, {car.location?.state}</p>
        <p>Insurance: {car.insurancePolicy}</p>



        <button
          onClick={handleDelete}
          style={{
            marginTop: '10px',
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </Link>
    </div>
  );
};

export default VehicleRentalListing;