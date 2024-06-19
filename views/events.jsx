import React from "react";
import ReactDOM from "react-dom/client";
import Events from "./events/Events";
import Footer from "./events/Footer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Events />
      <Footer />
    </>
  </React.StrictMode>
);
