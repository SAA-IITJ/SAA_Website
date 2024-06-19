import React from "react";
import ReactDOM from "react-dom/client";
import Events from "./events/Events";
import Footer from "./events/Footer";
import Navbar from "./events/NavBar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Navbar />
      <Events />
      <Footer />
    </>
  </React.StrictMode>
);
