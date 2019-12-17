import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { NavLink as Link } from 'react-router-dom';
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      modal: false,
      businessName: " ",
      businessLocation: " ",
      isloading: false,
      isError: false
    };
    this.onClick = this.onClick.bind(this);
  }
 
  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  toggleSearch = e => {
    e.preventDefault();
    this.setState({
      modal: !this.state.modal
    });
  };
  saveToState(key, value) {
    this.setState({ [key]: value });
  }
  handleBusinessSearch = () => {
    window.location = `/businesses/search/name=${
      this.state.businessName
    }/location=${this.state.businessLocation}`;
  };
  toggle = e => {
    this.setState({
      modal: !this.state.modal
    });
  };


  render() {
    return (
      <div>
        <MDBContainer>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalHeader toggle={this.toggle}>
              <FontAwesomeIcon icon="search" /> Business Search
            </MDBModalHeader>
            <MDBModalBody>
              <div className="col-md-12 search-input-wrapper">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Business name"
                  onChange={event => {
                    this.saveToState("businessName", event.target.value);
                  }}
                />
              </div>
              <div className="col-md-12 search-input-wrapper my-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  onChange={event => {
                    this.saveToState("businessLocation", event.target.value);
                  }}
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="unique" onClick={this.toggle}>
                Cancel
              </MDBBtn>
              <MDBBtn onClick={this.handleBusinessSearch} color="unique">
                Search
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
        <Navbar color="black" dark className="zindex" expand="lg" scrolling>
          <NavbarBrand> <Link to="/">
            
              <FontAwesomeIcon icon="" size="1x" />
              <h4 className="white-text" >BISLINK</h4></Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.onClick} />
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              
                <Link activeClassName="activeRoute" className="nav-menu" to="/">
                  <h6><FontAwesomeIcon icon="home" /> HOME</h6>
                </Link>
                <Link activeClassName="activeRoute" className="nav-menu" to="/#" onClick={this.toggleSearch}>
                  <h6> <FontAwesomeIcon icon="search" /> SEARCH</h6>  
                </Link>
            </NavbarNav>
            <NavbarNav right>
              
                <Link activeClassName="activeRoute" className="nav-menu" to="/register-business">
                <h6><FontAwesomeIcon icon="folder-plus" /> ADD BUSINESS </h6>   
                </Link>
                <Link activeClassName="activeRoute" className="nav-menu" to="/view-profile">
                <h6><FontAwesomeIcon icon="user-alt" /> MY PROFILE </h6>   
                </Link>
            </NavbarNav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
