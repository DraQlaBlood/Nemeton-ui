import React from "react";
import "./App.css";
import Routes from "./routes";
import Navigation from "./components/layouts/navigation/navigation";

function App() {
  return (
    <div className="d-flex flex-column">
      <Navigation />
      <Routes />
    </div>
  );
}

export default App;
