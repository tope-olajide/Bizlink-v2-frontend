import React, { Component } from "react";
import { Input, Button } from "mdbreact";
import Image from "react-graceful-image";
import BusinessReview from "./BusinessReview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class BusinessDetailsPage extends Component {
  render() {
    return (
      <div>
        <main role="main" className="container">
          <div className="row">
            <div className="col-md-7 blog-main">
              <div className="card shadow-sm mt-3 p-4 biz-desciption">
                <h4 className="text-center"> Business Details</h4>
                <p>{this.props.businessDescription}</p>
              </div>
              <div className="card shadow-sm  p-3 my-3">
                <strong>
                  <h4 className="text-center">
                    {" "}
                    {this.props.reviewLength} {(this.props.reviewLength>=1)?"Reviews":"Review"}
                  </h4>
                </strong>
                {this.props.reviews.map(review => {
                  return (
                    <BusinessReview
                      commenterImageUrl={review.User.ImageUrl}
                      commenterUsername={review.User.username}
                      reviewTitle={review.title}
                      reviewContent={review.content}
                    />
                  );
                })}
                <div className="mt-5" />
              </div>
              <div
                className="card shadow-sm p-5 mt-3 mb-2"
                
              >
                <h4 className=" light-color light-text text-center px-3 mb-5">
                  <strong>Write a Review</strong>
                </h4>
                <form>
                  <div ref={this.props.reviewRef} className="grey-text">
                    <Input
                      label="Title"
                      icon="pencil"
                      default={this.props.title}
                      onChange={event => {
                        this.props.saveToState("title", event.target.value);
                      }}
                      value={this.props.title}
                    />
                    <Input
                      type="textarea"
                      label="Review"
                      icon="pencil"
                      rows="3"
                      default={this.props.content}
                      onChange={event => {
                        this.props.saveToState("content", event.target.value);
                      }}
                      value={this.props.content}
                    />
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={this.props.handleReviewSubmit}
                      disabled={this.props.disableReviewButton}
                      className={"submit-review-button"}
                    >
  {this.props.disableReviewButton?'Submitting...':'Submit Review'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <aside className="col-md-5 blog-sidebar">
              <div className="card mt-3 shadow-sm">
                <Image
                  className="card-img-top"
                  src={this.props.defaultImage}
                  alt="Card image cap"
                />
                <div className="card-body card-contents">
                  <ul>
                    <li>
                      <span>
                        <FontAwesomeIcon
                          className="card-icon mr-3"
                          icon="map-marker-alt"
                          size="1x"
                        />
                        <p className="d-inline">
                          {" "}
                          <strong>{this.props.businessAddress}</strong>
                        </p>
                      </span>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className="card-icon mr-3"
                        icon="mobile-alt"
                        size="1x"
                      />{" "}
                      <p>
                        <strong>{this.props.phoneNumber}</strong>
                      </p>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className="card-icon mr-3"
                        icon="link"
                        size="1x"
                      />
                      <p>
                        <strong> {this.props.website}</strong>
                      </p>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        className="card-icon mr-3"
                        icon="tag"
                        size="1x"
                      />
                      <p>
                        <strong> {this.props.category}</strong>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card shadow-sm mt-3 p-3">
                <div className="profile-section-biz-details">
                  <Image
                    src={this.props.ImageUrl}
                    alt={this.props.ImageUrl}
                    className="mx-auto  d-block profile-image"
                    height="150"
                  />
                  <div className=" profile-text">
                    <h5 className="py-1">{this.props.username}</h5>
                    <p>{this.props.location}</p>
                  </div>
                  <div className="table-responsive-lg text-center">
                    <table className="table table-bordered mt-3">
                      <tbody>
                        <tr>
                          <th scope="col">
                            <h4>{this.props.businessCount}</h4>
                            <p>Business</p>
                          </th>
                          <th scope="col">
                            <h4>{this.props.followersCount}</h4>
                            <p>Followers</p>
                          </th>
                          <th scope="col">
                            <h4>{this.props.followeesCount}</h4>
                            <p>Following</p>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <h5 className="profile-text my-5">{this.props.about}</h5>
                  <div className="text-center mt-3">
                    <Button
                      disabled={this.props.isBusinessOwner}
                      onClick={this.props.setFollow}
                      className={'follow-button'}
                    >
                      {this.props.isFollowing ? "Unfollow" : "follow"}
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  }
}
export default BusinessDetailsPage;
