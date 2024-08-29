import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./cards";

export const CardList = () => {
  const [propsList, setPropsList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v2/buttons/bulk"
        );
        setPropsList(response.data);
      } catch (error) {
        console.error("Error fetching button properties:", error);
        setError("Failed to fetch button properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {propsList.length > 0 ? (
        propsList.map((Props) => <Card key={Props._id} buttonProps={Props} />)
      ) : (
        <p>No button properties available</p>
      )}
    </div>
  );
};
