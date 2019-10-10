import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ReqCard = ({ data }) => {
  return (
    <Link className="card-index" to={"/request/" + data.id}>
      <Card className="mb-2">
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <small>{data.location}</small> | <small>Date</small>
          </Card.Subtitle>
          <Card.Text className="desc">{data.description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
export default ReqCard;
