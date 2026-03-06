import { useEffect } from "react";
import useCars from "../hooks/UseCar";
import VehicleRentalListing from "./VehicleRentalListing";

const VehicleRentalListings = () => {
  const { cars, fetchCars, removeCar } = useCars();

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <div className="rental-list">
      {cars.map((car) => (
        <VehicleRentalListing 
          key={car._id || car.id} 
          car={car} 
          onDelete={removeCar} 
        />
      ))}
    </div>
  );
};

export default VehicleRentalListings;