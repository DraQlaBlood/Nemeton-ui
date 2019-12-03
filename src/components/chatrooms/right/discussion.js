import React from "react";

import { Form, Row, Col, Button } from "react-bootstrap";

class Discussion extends React.Component {
  render() {
    return (
      <div className="bg-white">
        <div className="p-2 d-flex flex-column border">
          <div>
            <span>User name</span>
          </div>
          <div>
            <span>roles</span>
          </div>
        </div>
        <div className="p-2 d-flex border border-top-0 messages">
          <div>
            <span>
              On sait depuis longtemps que travailler avec du texte lisible et
              contenant du sens est source de distractions, et empêche de se
              concentrer sur la mise en page elle-même. L'avantage du Lorem
              Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.'
              est qu'il possède une distribution de lettres plus ou moins
              normale, et en tout cas comparable avec celle du français
              standard. De nombreuses suites logicielles de mise en page ou
              éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par
              défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de
              nombreux sites qui n'en sont encore qu'à leur phase de
              construction. Plusieurs versions sont apparues avec le temps,
              parfois par accident, souvent intentionnellement (histoire d'y
              rajouter de petits clins d'oeil, voire des phrases embarassantes).
            </span>
          </div>
        </div>
        <div className="p-2 border border-top-0">
          <Form>
            <Form.Group as={Row}>
              <Col sm="12">
                <Form.Control as="textarea" className="border-0" rows="3" />
              </Col>
            </Form.Group>
          </Form>
        </div>
        <div className="p-2 d-flex bg-light border border-top-0">
          <div className="flex-grow-1">
            <i className="fas fa-image "></i>
            <i className="fas fa-paperclip pl-2"></i>
          </div>
          <div>
            <Button className="btn-global-orange">Send</Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Discussion;
