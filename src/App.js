import React from "react";
import "./App.css";
import Routes from "./routes";
import Navigation from "./components/navigation/navigation";
import Footer from "./components/navigation/footer";

function App() {
  return (
    <div className="App d-flex flex-column">
      <Navigation />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
