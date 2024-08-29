import React, { useState, useEffect } from "react";
import { useButtonContext } from "./ButtonContext";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
export const Properties = () => {
  const { buttonProps, setButtonProps } = useButtonContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(buttonProps.name || "");
  const resetForm = () => {
    setButtonProps({
      width: 100,
      height: 50,
      color: "#000000",
      roundedness: 1,
      opacity: 1,
      strokeColor: "#000000",
      strokeWidth: 1,
      lastUpdated: Date.now(),
      text: "Button",
    });
  };

  // Fetch button properties when the component mounts or buttonProps._id changes
  useEffect(() => {
    const fetchButtonProps = async () => {
      try {
        if (id) {
          const response = await fetch(
            `http://localhost:3000/api/v2/buttons/button/${id}`
          );
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch button properties: ${errorText}`);
          }
          const data = await response.json();
          setButtonProps(data);
        }
      } catch (error) {
        console.error("Error fetching button properties:", error);
      }
    };

    fetchButtonProps();
  }, [id, setButtonProps]);

  // Handle saving or updating button properties
  const handleSave = async () => {
    try {
      const method = id ? "PUT" : "POST"; // Use PUT if ID is present, otherwise POST
      const url = id
        ? `http://localhost:3000/api/v2/buttons/button/${id}`
        : "http://localhost:3000/api/v2/buttons/button";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buttonProps),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save button properties: ${errorText}`);
      }

      const result = await response.json();
      console.log("Button saved successfully:", result);
      console.log(id);
      console.log(buttonProps);
      resetForm();
      navigate("/"); // Navigate back to the listing page
    } catch (error) {
      console.error("Error saving button properties:", error);
    }
  };
  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameSave = () => {
    setButtonProps((prevProps) => ({
      ...prevProps,
      name: newName,
    }));
    setIsEditingName(false);
  };

  return (
    <div className="bg-white w-[22rem] h-[34rem] shadow-sm rounded-lg p-6 border-2 ml-[-3rem] mt-[-1rem]">
      <div className="font-medium text-2xl ml-20">Properties</div>
      <div className="grid grid-cols-2 mt-1 ">
        <div className="font-medium">Button Name:</div>

        {isEditingName ? (
          <div>
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              className="border-1 w-36 mt-2 p-1 rounded-lg"
            />
            <button
              onClick={handleNameSave}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg"
            >
              Save Name
            </button>
          </div>
        ) : (
          <div className="flex">
            <span>{buttonProps.name || "Button"}</span>
            <button
              onClick={handleEditName}
              className="ml-4 bg-gray-500 text-white px-2 py-1 rounded-lg"
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <div className="h-48">
        <div className="text-xl">Size</div>
        <hr />
        <div className="flex">
          <div>
            <div className="mt-1">Height</div>
            <input
              type="number"
              placeholder="Height"
              value={buttonProps.height || ""}
              onChange={(e) =>
                setButtonProps((prevProps) => ({
                  ...prevProps,
                  height: parseInt(e.target.value, 10) || 0,
                }))
              }
              className="border-2 w-24 mt-2 p-1 rounded-lg"
            />
          </div>
          <div className="mt-1 ml-24">
            <div>Width</div>
            <input
              type="number"
              placeholder="Width"
              value={buttonProps.width || ""}
              onChange={(e) =>
                setButtonProps((prevProps) => ({
                  ...prevProps,
                  width: e.target.value,
                }))
              }
              className="border-2 w-24 h-9 mt-2 p-1 rounded-lg"
            />
          </div>
          <div className="mt-20 ml-[-18rem]">
            <div>Roundedness</div>
            <input
              type="number"
              placeholder="Roundedness"
              value={buttonProps.roundedness}
              onChange={(e) =>
                setButtonProps((prevProps) => ({
                  ...prevProps,
                  roundedness: e.target.value,
                }))
              }
              className="border-2 w-48 h-9 p-1 rounded-lg"
            />
          </div>
        </div>
        <div className="text-xl mt-5">Appearance</div>
        <hr />
        <div className="mt-1">
          <div>Fill Color</div>
          <input
            type="color"
            value={buttonProps.color || "#000000"}
            onChange={(e) =>
              setButtonProps((prevProps) => ({
                ...prevProps,
                color: e.target.value,
              }))
            }
            className="border-2 w-24 h-9 mt-2 p-1 rounded-lg"
          />
        </div>
        <div className="mt-4">
          <div>Opacity</div>
          <input
            type="number"
            placeholder="Opacity"
            value={buttonProps.opacity || ""}
            step="0.01"
            onChange={(e) =>
              setButtonProps((prevProps) => ({
                ...prevProps,
                opacity: e.target.value,
              }))
            }
            className="border-2 w-24 h-9 mt-2 p-1 rounded-lg"
          />
        </div>
        <div className="mt-[-4rem] ml-48">
          <div>Stroke Color</div>
          <input
            type="color"
            value={buttonProps.strokeColor || "#000000"}
            onChange={(e) =>
              setButtonProps((prevProps) => ({
                ...prevProps,
                strokeColor: e.target.value,
              }))
            }
            className="border-2 w-24 h-9 mt-2 p-1 rounded-lg"
          />
        </div>
        <div className="mt-[-10rem] ml-48">
          <div>Stroke Width</div>
          <input
            type="number"
            placeholder="Stroke Width"
            value={buttonProps.strokeWidth || ""}
            onChange={(e) =>
              setButtonProps((prevProps) => ({
                ...prevProps,
                strokeWidth: parseInt(e.target.value, 10) || 0,
              }))
            }
            className="border-2 w-32 h-9 mt-2 p-1 rounded-lg"
          />
        </div>
      </div>
      <div className="mt-48">
        <button
          onClick={handleSave}
          className="bg-black text-white p-3 rounded-lg"
        >
          Save Component
        </button>
      </div>
    </div>
  );
};
