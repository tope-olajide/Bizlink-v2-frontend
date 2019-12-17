import React, { Component } from "react";
import { Input, Button } from "mdbreact";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      businessName: " ",
      businessLocation: " "
    };
  }
  saveToState(key, value) {
    this.setState({ [key]: value });
  }
  handleBusinessSearch = () => {
    window.location = `/businesses/search/name=${
      this.state.businessName
    }/location=${this.state.businessLocation}`;
  };

  render() {
    return (
      <div ref={this.props.myRef} id="footer">
        <nav class=" footer bottom navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="row mt-5">
              <div className="col-md-4  footer-search-form">
                <form>
                  <p className="h5 text-center mb-4">Search for Businesses</p>
                  <div className="grey-text">
                    <Input
                      label="Business Name"
                      icon="briefcase"
                      group
                      type="text"
                      onChange={event => {
                        this.saveToState("businessName", event.target.value);
                      }}
                    />
                    <Input
                      label="Locaton"
                      icon="map-marker"
                      group
                      type="text"
                      onChange={event => {
                        this.saveToState(
                          "businessLocation",
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className="text-center mb-4">
                    <Button color="primary" onClick={this.handleBusinessSearch}>
                      Search
                    </Button>
                  </div>
                </form>
              </div>
              <div className="col-md-7">
                <div className=" copyright-content">
                  <p className=" d-inline font-weight-bold">
                    {" "}
                    <a href="/">Home</a>{" "}
                  </p>
                  <p className="dot-seperator d-inline">•</p>
                  <p className=" d-inline font-weight-bold">
                    {" "}
                    <a href="/register-business">Add Business </a>
                  </p>
                  <p className="dot-seperator d-inline">•</p>
                  <p className=" d-inline font-weight-bold">
                    {" "}
                    <a href="/view-profile">My Profile </a>
                  </p>
                  <p className="dot-seperator d-inline">•</p>
                  <p className=" d-inline font-weight-bold">
                    <a href="/notifications">Notifications</a>{" "}
                  </p>
                  <p className="dot-seperator d-inline">•</p>
                  <p className=" d-inline font-weight-bold">
                    {" "}
                  </p>
                  <p class="mt-5">
                    Designed and developed with <FontAwesomeIcon icon="heart" />{" "}
                    by{" "}
                    <a href="https://github.com/tope-olajide/BisLink">
                      Temitope
                    </a>{" "}
                    <br />
                    Copyright © 2019 BisLink. All rights reserved{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default connect()(Footer);
