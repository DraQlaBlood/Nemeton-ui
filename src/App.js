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
      <Routes className="Component"/>
      <div className="d-none d-sm-none d-md-none d-lg-block">
      <MessageAccordion/>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
