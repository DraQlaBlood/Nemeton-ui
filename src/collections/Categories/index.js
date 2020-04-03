import React from "react";
import { inject, observer } from "mobx-react";

import { Card } from "react-bootstrap";

@inject("categories")
@observer
class Categories extends React.Component {
  componentDidMount = async () => {
    await this.props.categories.findAll();
  };

  render() {
    const { categories } = this.props.categories;
    return (
      <div className="bg-white p-2 row">
        {categories.slice(0,6).map((category, index) => {
          return (
            <div key={index} className="p-2 col-sm-4 col-xs-4 col-md-2">
              <Card >
                <Card.Img
                  src="https://images.unsplash.com/photo-1492112007959-c35ae067c37b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=800&q=60"
                  alt="Card image"
                />
                <Card.ImgOverlay>
                  <Card.Title className="text-white">{category.category}</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Categories;
