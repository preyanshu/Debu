import { useState, useEffect } from "react";
import Card from "./cards"; // Ensure this path is correct based on your project structure

export const CardList = () => {
  const [buttons, setButtons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchButtons = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v2/buttons/bulk",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setButtons(data);
        }
      } catch (error) {
        console.error("Error fetching button properties:", error);
        if (isMounted) {
          setError(
            error.message ||
              "Network error. Please check your connection or try again later."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchButtons();

    return () => {
      isMounted = false; // Clean up if the component unmounts
    };
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {buttons.length > 0 ? (
        buttons.map((button) => <Card key={button._id} buttonProps={button} />)
      ) : (
        <p>No button properties available</p>
      )}
    </div>
  );
};
