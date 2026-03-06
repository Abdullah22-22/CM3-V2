import { useCallback, useState } from "react";
import {
  getcCars,
  getcCarById,
  createCar,
  updateCar,
  deleteCar,
} from "../api/api";

export default function useCars() {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCars = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getcCars(params);
      const result = data?.cars ?? data?.vehicleRentals ?? data ?? [];
      setCars(result);
      return result;
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to fetch cars");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCarById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getcCarById(id);
      const result = data?.car ?? data?.vehicleRental ?? data ?? null;
      setCar(result);
      return result;
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to fetch car");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const addCar = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createCar(payload);
      const createdCar = data?.car ?? data?.vehicleRental ?? data;
      setCars((prev) => [createdCar, ...prev]);
      return createdCar;
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to create car");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const editCar = useCallback(async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateCar(id, payload);
      const updatedCar = data?.car ?? data?.vehicleRental ?? data;

      setCar(updatedCar);
      setCars((prev) =>
        prev.map((item) => (item._id === id ? updatedCar : item))
      );

      return updatedCar;
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to update car");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeCar = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        await deleteCar(id);
        setCars((prev) => prev.filter((item) => item._id !== id));

        if (car?._id === id) {
          setCar(null);
        }

        return true;
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to delete car");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [car]
  );

  return {
    cars,
    car,
    loading,
    error,
    fetchCars,
    fetchCarById,
    addCar,
    editCar,
    removeCar,
  };
}