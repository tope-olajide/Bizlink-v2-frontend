import React, { Component } from "react";
import { Link } from "react-router-dom";
import Image from "react-graceful-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class CataloguePage extends Component {
  render() {
    return (
      <>
        <div
          className={
            this.props.isProfilepage ? "card-item col-md-6" : "card-item"
          }
        ><div className=" card mb-5 ml-0 mr-0  ">
          <Link to={`/business-details/${this.props.id}`}>
            
              <Image
                className="card-img"
                src={this.props.image}
                alt={this.props.businessName}
              />
              <div className="card-body">
                <h6 className="biz-name">{this.props.businessName}</h6>
                <div className="cat-rewiew">
                  <p className="category ">{this.props.category}</p>{" "}
                  <p className="mx-1">
                    <b>•</b>
                  </p>
                  <p className="review">
                    {this.props.reviewCount}{" "}
                    {this.props.reviewCount > 1 ? "Reviews" : "Review"}
                  </p>
                </div>
                <ul>
                  <li>
                    <span>
                      <FontAwesomeIcon
                        className="card-icon"
                        icon="map-marker-alt"
                        size="1x"
                      />
                      <span className="space-text" />{" "}
                      <p className="biz-address ">
                        {this.props.businessAddress}
                      </p>
                    </span>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className="card-icon"
                      icon="mobile-alt"
                      size="1x"
                    />
                    <span className="space-text" />
                    <p> {this.props.phoneNumber}</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className="card-icon"
                      icon="link"
                      size="1x"
                    />
                    <span className="space-text" />
                    <p>{this.props.website}</p>
                  </li>
                </ul>
                <div className="card-bottom">
                  <div className=" view-icon">
                    <div className="mx-1 d-inline">
                      <FontAwesomeIcon icon={["far", "eye"]} />{" "}
                      {this.props.viewCount}
                    </div>
                    <div className="mx-1 d-inline">
                      <FontAwesomeIcon icon="thumbs-up" />{" "}
                      <b>{this.props.upvotes}</b>
                    </div>
                    <div className="mx-1 d-inline">
                      <FontAwesomeIcon icon="thumbs-down" />{" "}
                      <b>{this.props.downvotes}</b>
                    </div>
                  </div>
                  <p>View Business</p>
                </div>
              </div>
           </Link> </div>
          
        </div>
    </>
    );
  }
}
export default CataloguePage;
