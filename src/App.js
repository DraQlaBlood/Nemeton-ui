import React from "react";
import "./App.css";
import Routes from "./routes";
import Navigation from "./components/Navigation/navigation";
import Footer from "./components/Navigation/footer";
import ReactNotifications from "react-notifications-component";
import MessageAccordion from "./components/chatrooms/MessageAccordion";

function App() {
  return (
    <div className="App d-flex flex-column">
      <ReactNotifications />
      <Navigation />
      <Routes />
      <MessageAccordion/>
      <Footer />
    </div>
  );
}

export default App;
