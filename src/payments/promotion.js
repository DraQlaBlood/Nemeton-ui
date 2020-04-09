import React from "react";
import "./payment.css";
import { Link } from "react-router-dom";

const Ads = ({ data }) => {
  return (
    <div className="my-2 p-3 bg-blue">
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center">
          <i className="fas fa-grin-alt fa-8x pr-2 text-white"></i>
          <div className=" flex-fill d-flex flex-column">
            <h6 className="blue-color font-weight-bold mb-3">
              Start your own organization
            </h6>
            <span className="text-white">50% OFF today</span>
          </div>
        </div>
        <div className="flex-fill d-flex justify-content-center mt-3">
          <Link to="#"  className="showLinks p-2 border rounded btn-premium">
            Get Premium
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Ads;
