import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { CardList } from "./components/cardList";
import { Builder } from "./pages/builder";
import { Appbar } from "./components/Appbar";
import { Listing } from "./pages/listing";

function App() {
  return (
    <>
      <Appbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
