import React, { createContext, useState, useContext } from "react";

const ButtonContext = createContext();

export const ButtonProvider = ({ children }) => {
  const [buttonProps, setButtonProps] = useState({
    id: "",
    width: 100,
    height: 50,
    color: "#000000",
    roundedness: 1,
    opacity: 1,
    strokeWidth: 0,
    strokeColor: "#000000",
    text: "Button",
    name: "Button",
    lastUpdated: Date.now(),
  });

  return (
    <ButtonContext.Provider value={{ buttonProps, setButtonProps }}>
      {children}
    </ButtonContext.Provider>
  );
};

export const useButtonContext = () => useContext(ButtonContext);
