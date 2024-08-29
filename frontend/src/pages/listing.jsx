import { Appbar } from "../components/Appbar";
import { Button } from "../components/Button";
import { CardList } from "../components/cardList";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// import { ButtonList } from "../components/cardList";

export const Listing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        label={"+ Create New Button"}
        onClick={() => {
          navigate("/builder");
        }}
      />
      <CardList />

      {/* <ButtonList /> */}
    </div>
  );
};
